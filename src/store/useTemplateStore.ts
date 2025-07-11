import { create } from "zustand";

interface TemplateState {
  code: string;
  increasePopulation: (newCode: string) => void;
}

export const useTemplateStore = create<TemplateState>((set) => ({
  code: "React",
  increasePopulation: (newCode: string) =>
    set(() => ({ code: newCode || "React" })),
}));
