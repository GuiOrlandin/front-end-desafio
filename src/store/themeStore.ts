import { create } from "zustand";
import { persist } from "zustand/middleware";

const THEME_STORAGE = "@theme:theme-1.0.0";

interface ThemeStore {
  theme: string;
  handleToggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      handleToggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: THEME_STORAGE,
    }
  )
);
