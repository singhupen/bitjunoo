"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default theme is strictly "light"
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bitjunoo-theme") as Theme | null;
      if (stored === "dark" || stored === "light") {
        setThemeState(stored);
        applyThemeToDOM(stored);
      } else {
        // Strict default: Light mode
        setThemeState("light");
        applyThemeToDOM("light");
      }
    } catch {
      // Fallback in case localStorage is blocked
      setThemeState("light");
      applyThemeToDOM("light");
    }
    setMounted(true);
  }, []);

  const applyThemeToDOM = (t: Theme) => {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      root.style.colorScheme = "light";
    }
  };

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    applyThemeToDOM(nextTheme);
    try {
      localStorage.setItem("bitjunoo-theme", nextTheme);
    } catch (e) {
      console.error("Failed to persist theme to localStorage", e);
    }
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
