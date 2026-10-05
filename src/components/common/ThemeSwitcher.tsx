"use client";

import React from "react";
import { SunMedium, MoonStar } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";
  const tooltipText = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";

  if (variant === "pill") {
    return (
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={tooltipText}
              className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer select-none active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue/40 dark:focus-visible:ring-cyan-blue/40 ${
                isDark
                  ? "bg-slate-900/90 border-slate-700/80 text-slate-200 hover:border-cyan-blue/50 hover:text-white hover:shadow-[0_0_12px_rgba(0,168,217,0.25)]"
                  : "bg-white/90 border-slate-200 text-slate-700 hover:border-brand-azure/40 hover:text-navy-900 hover:shadow-[0_0_12px_rgba(0,100,218,0.15)] shadow-xs"
              } ${className}`}
            >
              <span className="relative flex items-center justify-center w-4 h-4">
                {isDark ? (
                  <SunMedium className="w-4 h-4 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]" />
                ) : (
                  <MoonStar className="w-4 h-4 text-royal-blue drop-shadow-[0_0_6px_rgba(0,100,218,0.25)]" />
                )}
              </span>
              <span className="font-medium">{isDark ? "Dark" : "Light"}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={6}>
            {tooltipText}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggleTheme}
            type="button"
            aria-label={tooltipText}
            className={`group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-200 border cursor-pointer select-none active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue/40 dark:focus-visible:ring-cyan-blue/40 ${
              isDark
                ? "bg-slate-900/80 hover:bg-slate-800/90 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-amber-300 shadow-sm hover:shadow-[0_0_16px_rgba(251,191,36,0.15)] backdrop-blur-md"
                : "bg-white/90 hover:bg-slate-50 border-slate-200/90 hover:border-royal-blue/30 text-slate-600 hover:text-royal-blue shadow-2xs hover:shadow-xs backdrop-blur-md"
            } ${className}`}
          >
            <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
              {/* SunMedium (Active in dark mode to switch to light) */}
              <SunMedium
                className={`w-4 h-4 sm:w-[18px] sm:h-[18px] text-amber-400 transition-all duration-300 ease-out transform absolute ${
                  isDark
                    ? "rotate-0 scale-100 opacity-100 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
                    : "-rotate-90 scale-0 opacity-0"
                }`}
              />
              {/* MoonStar (Active in light mode to switch to dark) */}
              <MoonStar
                className={`w-4 h-4 sm:w-[18px] sm:h-[18px] text-royal-blue transition-all duration-300 ease-out transform absolute ${
                  isDark
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100 drop-shadow-[0_0_6px_rgba(0,100,218,0.25)]"
                }`}
              />
            </div>

            {showLabel && (
              <span className="ml-2 text-xs font-semibold">
                {isDark ? "Light" : "Dark"}
              </span>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
