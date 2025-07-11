# React Vite Template

一个现代化的 React + Vite 项目模板，集成了 TypeScript、UnoCSS 和 Zustand 状态管理。

## 🚀 特性

- ⚡️ **Vite** - 极速的构建工具和开发服务器
- ⚛️ **React 19** - 最新版本的 React
- 🎯 **TypeScript** - 类型安全的 JavaScript
- 🎨 **UnoCSS** - 原子化 CSS 引擎，按需生成样式
- 🐻 **Zustand** - 轻量级状态管理库
- 📦 **ESLint** - 代码质量检查

## 📁 项目结构

```
react-vite-template/
├── src/
│   ├── store/           # Zustand 状态管理
│   │   ├── index.ts     # 导出文件
│   │   └── useTemplateStore.ts  # 模板状态
│   ├── App.tsx          # 主应用组件
│   └── main.tsx         # 应用入口
├── package.json         # 项目配置
└── README.md           # 项目文档
```

## 🛠️ 技术栈

### 核心依赖
- **React**: 用户界面构建库
- **React DOM**: React 的 DOM 渲染器
- **Zustand**: 简单而强大的状态管理

### 样式方案
- **UnoCSS**: 原子化 CSS 引擎，提供即时的按需样式生成
- **UnoCSS Reset**: CSS 重置样式

### 开发工具
- **Vite**: 下一代前端构建工具
- **TypeScript**: JavaScript 的超集，提供静态类型检查
- **ESLint**: 代码质量和风格检查工具

## 🎯 开始使用

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm run dev
```

### 构建项目
```bash
pnpm run build
```

### 代码检查
```bash
pnpm run lint
```

### 预览构建结果
```bash
pnpm run preview
```

## 💡 状态管理

项目使用 Zustand 进行状态管理，提供了简洁的 API：

```typescript
// 使用状态
const code = useTemplateStore((state) => state.code);

// 更新状态
const increasePopulation = useTemplateStore(
  (state) => state.increasePopulation
);
```

当前代码状态: **{{code}}**

## 🎨 样式方案

使用 UnoCSS 原子化 CSS，可以直接在 className 中使用原子类：

```tsx
<button className="bg-emerald border-none w-20 color-#fff font-size-4">
  点击
</button>
```

## 📝 许可证

MIT License
