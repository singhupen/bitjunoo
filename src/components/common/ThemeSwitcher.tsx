"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeSwitcherProps {
  className?: string;
  variant?: "icon" | "pill" | "minimal";
  showLabel?: boolean;
}

export default function ThemeSwitcher({
  className = "",
  variant = "icon",
  showLabel = false,
}: ThemeSwitcherProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Skeleton / placeholder before hydration to prevent mismatch
  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  if (variant === "pill") {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
          isDark
            ? "bg-slate-900/90 border-slate-700 text-slate-200 hover:border-cyan-blue/50 hover:text-white hover:shadow-[0_0_12px_rgba(0,168,217,0.25)]"
            : "bg-white/90 border-slate-200 text-slate-700 hover:border-brand-azure/40 hover:text-navy-900 hover:shadow-[0_0_12px_rgba(0,100,218,0.15)] shadow-xs"
        } ${className}`}
      >
        <span className="relative flex items-center justify-center w-5 h-5">
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 scale-100" />
          ) : (
            <Moon className="w-4 h-4 text-brand-azure transition-transform duration-300 rotate-0 scale-100" />
          )}
        </span>
        <span className="font-medium">
          {isDark ? "Dark" : "Light"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 ${
        isDark
          ? "bg-slate-900/90 border-slate-700/80 text-amber-400 hover:bg-slate-800 hover:border-amber-400/50 hover:shadow-[0_0_15px_rgba(251,191,36,0.25)]"
          : "bg-white/95 border-slate-200 text-brand-azure hover:bg-slate-100/90 hover:border-brand-azure/40 hover:text-brand-blue shadow-sm hover:shadow-[0_0_15px_rgba(0,100,218,0.18)]"
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon (Visible in Dark Mode to switch to Light) */}
        <Sun
          className={`w-4 h-4 sm:w-[18px] sm:h-[18px] transition-all duration-300 absolute ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
        {/* Moon Icon (Visible in Light Mode to switch to Dark) */}
        <Moon
          className={`w-4 h-4 sm:w-[18px] sm:h-[18px] transition-all duration-300 absolute ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-semibold">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}
