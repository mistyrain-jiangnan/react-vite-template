import { useTemplateStore } from "./store";
import MarkdownRenderer from "./components/MarkdownRenderer";
import readmeContent from "../README.md?raw";

const App = () => {
  const code = useTemplateStore((state) => state.code);
  const increasePopulation = useTemplateStore(
    (state) => state.increasePopulation
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">{code}</h1>
        <button
          className="bg-emerald border-none w-20 color-#fff font-size-4 px-4 py-2 rounded cursor-pointer"
          onClick={() => {
            increasePopulation("React Vite");
          }}
        >
          点击
        </button>
      </div>

      <MarkdownRenderer content={readmeContent} />
    </div>
  );
};

export default App;
