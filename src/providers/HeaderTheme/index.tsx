"use client";

import { createContext, useCallback, useContext, useState } from "react";

import canUseDOM from "@/utilities/canUseDOM";

import type { Theme } from "@/providers/Theme/types";

export type ContextType = {
  headerTheme?: Theme | null;
  setHeaderTheme: (theme: Theme | null) => void;
};

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
};

const HeaderThemeContext = createContext(initialContext);

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerTheme, setThemeState] = useState<Theme | undefined | null>(
    canUseDOM ? (document.documentElement.getAttribute("data-theme") as Theme) : undefined,
  );

  const setHeaderTheme = useCallback((themeToSet: Theme | null) => {
    setThemeState(themeToSet);
  }, []);

  return (
    <HeaderThemeContext.Provider value={{ headerTheme, setHeaderTheme }}>
      {children}
    </HeaderThemeContext.Provider>
  );
};

export const useHeaderTheme = (): ContextType => useContext(HeaderThemeContext);
