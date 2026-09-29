"use client";

import React, { useState, useRef, useEffect } from "react";
import { Highlighter, ChevronDown, RotateCcw } from "lucide-react";

interface HighlightPickerDropdownProps {
  onSelectHighlight: (colorHex: string | null) => void;
}

const HIGHLIGHT_COLORS = [
  { name: "Radiant Yellow", hex: "#fef08a", border: "#fde047" },
  { name: "Mint Green", hex: "#bbf7d0", border: "#86efac" },
  { name: "Sky Cyan", hex: "#bae6fd", border: "#7dd3fc" },
  { name: "Lavender Purple", hex: "#e9d5ff", border: "#d8b4fe" },
  { name: "Pastel Rose", hex: "#fecdd3", border: "#fda4af" },
  { name: "Sunset Orange", hex: "#fed7aa", border: "#fdba74" },
];

export default function HighlightPickerDropdown({
  onSelectHighlight,
}: HighlightPickerDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePick = (hex: string | null) => {
    onSelectHighlight(hex);
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-sm"
        title="Highlight Text Marker"
      >
        <Highlighter className="w-3.5 h-3.5 text-amber-500" />
        <span className="hidden sm:inline">Highlight</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-52 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in duration-150 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Highlighter Marker
            </span>
            <button
              type="button"
              onClick={() => handlePick(null)}
              className="text-[10px] text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Clear</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {HIGHLIGHT_COLORS.map((h) => (
              <button
                key={h.name}
                type="button"
                onClick={() => handlePick(h.hex)}
                className="group flex flex-col items-center gap-1 p-1 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                title={h.name}
              >
                <span
                  className="w-7 h-7 rounded-lg border shadow-xs transition-transform group-hover:scale-105"
                  style={{ backgroundColor: h.hex, borderColor: h.border }}
                />
                <span className="text-[9px] text-slate-600 truncate w-full text-center">
                  {h.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
