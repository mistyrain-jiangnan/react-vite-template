import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const tocRef = useRef<TocItem[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingElementsRef = useRef<Map<string, HTMLElement>>(new Map());

  // 生成唯一 ID 的函数
  const generateId = (text: string, index?: number): string => {
    const baseId = text
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
      .replace(/^-|-$/g, "");

    // 如果提供了索引，添加到 ID 中以确保唯一性
    return index !== undefined ? `${baseId}-${index}` : baseId;
  };

  // 提取标题并生成目录
  const extractTocFromMarkdown = (markdown: string): TocItem[] => {
    const lines = markdown.split("\n");
    const tocItems: TocItem[] = [];
    const idCounts = new Map<string, number>();

    lines.forEach((line, lineIndex) => {
      const trimmedLine = line.trim();
      const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);

      if (headingMatch) {
        const level = headingMatch[1].length;
        const title = headingMatch[2].trim();
        const baseId = generateId(title);

        // 检查是否已存在相同的 baseId，如果存在则添加计数
        const count = idCounts.get(baseId) || 0;
        idCounts.set(baseId, count + 1);

        const id = count > 0 ? `${baseId}-${count}` : baseId;

        tocItems.push({ id, title, level });
      }
    });

    return tocItems;
  };

  useEffect(() => {
    const tocItems = extractTocFromMarkdown(content);
    setToc(tocItems);
    tocRef.current = tocItems;
  }, [content]);

  // 使用 Intersection Observer 监听标题元素
  useEffect(() => {
    if (tocRef.current.length === 0) return;

    // 清理之前的 observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 收集所有标题元素
    const headingElements = new Map<string, HTMLElement>();
    tocRef.current.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        headingElements.set(item.id, element);
      }
    });
    headingElementsRef.current = headingElements;

    if (headingElements.size === 0) return;

    // 检查页面是否接近底部的函数
    const isNearPageBottom = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      return scrollTop + windowHeight >= documentHeight - 100;
    };

    // 创建 Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        // 检查是否接近页面底部
        if (isNearPageBottom()) {
          // 如果接近底部，激活最后一个标题
          const lastTocItem = tocRef.current[tocRef.current.length - 1];
          if (lastTocItem && lastTocItem.id !== activeId) {
            setActiveId(lastTocItem.id);
          }
          return;
        }

        if (visibleEntries.length > 0) {
          // 如果有多个可见标题，选择最接近顶部的
          const sortedEntries = visibleEntries.sort((a, b) => {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });

          const targetEntry = sortedEntries[0];
          const newActiveId = targetEntry.target.id;

          if (newActiveId !== activeId) {
            setActiveId(newActiveId);
          }
        } else {
          // 如果没有标题可见，找到最接近顶部的标题
          let closestId = "";
          let closestDistance = Infinity;

          entries.forEach((entry) => {
            const rect = entry.boundingClientRect;
            // 优先考虑在视口上方的标题
            const distance =
              rect.top < 0 ? Math.abs(rect.top) : rect.top + 1000;

            if (distance < closestDistance) {
              closestDistance = distance;
              closestId = entry.target.id;
            }
          });

          if (closestId && closestId !== activeId) {
            setActiveId(closestId);
          }
        }
      },
      {
        rootMargin: "-80px 0px -20% 0px", // 调整底部边距为 20%
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    // 添加滚动监听以处理底部情况
    const handleScroll = () => {
      if (isNearPageBottom()) {
        const lastTocItem = tocRef.current[tocRef.current.length - 1];
        if (lastTocItem && lastTocItem.id !== activeId) {
          setActiveId(lastTocItem.id);
        }
      }
    };

    // 观察所有标题元素
    headingElements.forEach((element) => {
      observer.observe(element);
    });

    // 添加滚动监听
    window.addEventListener("scroll", handleScroll, { passive: true });

    observerRef.current = observer;

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toc, activeId]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 计算精确的滚动位置
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const scrollToPosition = absoluteElementTop - 100; // 留出 100px 的顶部空间

      window.scrollTo({
        top: Math.max(0, scrollToPosition), // 确保不会滚动到负数位置
        behavior: "smooth",
      });
    }
  };

  // 清理 observer
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const components: Components = {
    code: ({ className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");

      if (match) {
        return (
          <SyntaxHighlighter
            style={tomorrow}
            language={match[1]}
            PreTag="div"
            className="rounded-lg shadow-sm !my-4"
            {...(props as any)}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        );
      }

      return (
        <code
          className={`${
            className || ""
          } bg-gray-100 px-1 py-0.5 rounded text-sm font-mono`}
          {...(props as any)}
        >
          {children}
        </code>
      );
    },
    h1: ({ children, ...props }) => {
      const title = String(children);
      const existingItem = tocRef.current.find(
        (item) => item.title === title && item.level === 1
      );
      const id = existingItem?.id || generateId(title);
      return (
        <h1
          id={id}
          className="text-3xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200"
          {...props}
        >
          {children}
        </h1>
      );
    },
    h2: ({ children, ...props }) => {
      const title = String(children);
      const existingItem = tocRef.current.find(
        (item) => item.title === title && item.level === 2
      );
      const id = existingItem?.id || generateId(title);
      return (
        <h2 id={id} className="text-2xl font-semibold mt-6 mb-3" {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const title = String(children);
      const existingItem = tocRef.current.find(
        (item) => item.title === title && item.level === 3
      );
      const id = existingItem?.id || generateId(title);
      return (
        <h3 id={id} className="text-xl font-medium mt-5 mb-2" {...props}>
          {children}
        </h3>
      );
    },
    h4: ({ children, ...props }) => {
      const title = String(children);
      const existingItem = tocRef.current.find(
        (item) => item.title === title && item.level === 4
      );
      const id = existingItem?.id || generateId(title);
      return (
        <h4 id={id} className="text-lg font-medium mt-4 mb-2" {...props}>
          {children}
        </h4>
      );
    },
    h5: ({ children, ...props }) => {
      const title = String(children);
      const existingItem = tocRef.current.find(
        (item) => item.title === title && item.level === 5
      );
      const id = existingItem?.id || generateId(title);
      return (
        <h5 id={id} className="text-base font-medium mt-3 mb-2" {...props}>
          {children}
        </h5>
      );
    },
    h6: ({ children, ...props }) => {
      const title = String(children);
      const existingItem = tocRef.current.find(
        (item) => item.title === title && item.level === 6
      );
      const id = existingItem?.id || generateId(title);
      return (
        <h6 id={id} className="text-sm font-medium mt-3 mb-2" {...props}>
          {children}
        </h6>
      );
    },
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-blue-50 text-gray-700 italic"
        {...props}
      >
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-4">
        <table
          className="min-w-full border border-gray-200 rounded-lg"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-left font-semibold"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-2 border-b border-gray-100" {...props}>
        {children}
      </td>
    ),
  };

  return (
    <div className="flex gap-8 relative">
      {/* 目录侧边栏 */}
      <div className="w-72 flex-shrink-0">
        <div className="sticky top-6 max-h-[calc(100vh-3rem)]">
          <div className="bg-gray-50/50 rounded-lg p-6 h-full flex flex-col">
            <div className="flex-1 min-h-0">
              <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">
                目录
              </h3>

              {toc.length === 0 ? (
                <div className="py-4">
                  <p className="text-gray-400 text-sm">正在生成目录...</p>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[calc(100vh-8rem)] pr-2 -mr-2">
                  <div className="space-y-1">
                    {toc.map((item, index) => (
                      <p
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`
                          block w-full text-left py-2 px-3 rounded-md text-sm transition-all duration-200 cursor-pointer
                          ${
                            activeId === item.id
                              ? "text-blue-600 bg-blue-50 font-medium"
                              : "text-gray-600 hover:text-gray-800 hover:bg-white/60"
                          }
                          ${item.level === 1 ? "ml-0 font-medium" : ""}
                          ${item.level === 2 ? "ml-3" : ""}
                          ${item.level === 3 ? "ml-6 text-gray-500" : ""}
                          ${
                            item.level === 4 ? "ml-9 text-xs text-gray-400" : ""
                          }
                          ${
                            item.level >= 5 ? "ml-12 text-xs text-gray-400" : ""
                          }
                        `}
                      >
                        <span className="block truncate" title={item.title}>
                          {item.title}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Markdown 内容 */}
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-strong:text-gray-800 prose-a:text-blue-600 hover:prose-a:text-blue-800">
            <ReactMarkdown components={components}>{content}</ReactMarkdown>
          </div>
          {/* 添加底部间距以确保最后的标题可以被正确检测 */}
          <div className="h-[50vh]"></div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownRenderer;
