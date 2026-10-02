"use client";

import React, { useState, useRef, useEffect } from "react";
import { Palette, ChevronDown, Check, RotateCcw } from "lucide-react";

interface ColorPickerDropdownProps {
  onSelectColor: (hexColor: string | null) => void;
}

const PALETTE = [
  { name: "Slate Charcoal", hex: "#0f172a" },
  { name: "Slate Gray", hex: "#435575" },
  { name: "Royal Blue", hex: "#0675FA" },
  { name: "Deep Blue", hex: "#0943F4" },
  { name: "Cyan Highlight", hex: "#05B0FC" },
  { name: "Junoo Purple", hex: "#A80FF5" },
  { name: "Violet", hex: "#6D15F2" },
  { name: "Emerald", hex: "#059669" },
  { name: "Amber", hex: "#d97706" },
  { name: "Rose", hex: "#e11d48" },
  { name: "Crimson", hex: "#dc2626" },
];

export default function ColorPickerDropdown({ onSelectColor }: ColorPickerDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selectedHex, setSelectedHex] = useState<string | null>(null);
  const [customHex, setCustomHex] = useState("#0675FA");
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
    setSelectedHex(hex);
    onSelectColor(hex);
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-sm"
        title="Change Text Color"
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block shadow-xs"
          style={{ backgroundColor: selectedHex || "#0675FA" }}
        />
        <span className="hidden sm:inline">Color</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-60 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in duration-150 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Text Color Palette
            </span>
            <button
              type="button"
              onClick={() => handlePick(null)}
              className="text-[10px] text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Color Grid */}
          <div className="grid grid-cols-4 gap-2">
            {PALETTE.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => handlePick(c.hex)}
                className="group relative flex flex-col items-center gap-1 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title={c.name}
              >
                <span
                  className="w-6 h-6 rounded-full border border-slate-200/90 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: c.hex }}
                >
                  {selectedHex === c.hex && (
                    <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                  )}
                </span>
                <span className="text-[9px] text-slate-500 truncate w-full text-center">
                  {c.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Custom Hex Input */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <input
              type="color"
              value={customHex}
              onChange={(e) => setCustomHex(e.target.value)}
              className="w-7 h-7 rounded border border-slate-200 cursor-pointer p-0.5"
            />
            <input
              type="text"
              value={customHex}
              onChange={(e) => setCustomHex(e.target.value)}
              className="flex-1 px-2 py-1 text-xs font-mono rounded-lg border border-slate-200 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handlePick(customHex)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-royal-blue text-white cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
