"use client";

import React, { useState, useRef, useEffect } from "react";
import { Heading, ChevronDown, Check } from "lucide-react";

interface HeadingDropdownProps {
  onSelectHeading: (level: number) => void;
}

const HEADINGS = [
  { level: 0, label: "Normal Paragraph", desc: "Standard body text", prefix: "" },
  { level: 1, label: "Heading 1", desc: "Main title or major section (#)", prefix: "# " },
  { level: 2, label: "Heading 2", desc: "Key section heading (##)", prefix: "## " },
  { level: 3, label: "Heading 3", desc: "Subsection heading (###)", prefix: "### " },
  { level: 4, label: "Heading 4", desc: "Minor subsection (####)", prefix: "#### " },
];

export default function HeadingDropdown({ onSelectHeading }: HeadingDropdownProps) {
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

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-sm"
        title="Heading Levels"
      >
        <Heading className="w-3.5 h-3.5 text-royal-blue" />
        <span className="hidden sm:inline">Headings</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-60 rounded-2xl bg-white border border-slate-200 shadow-xl p-1.5 z-50 animate-in fade-in duration-150">
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
            Hierarchy Level
          </div>
          {HEADINGS.map((h) => (
            <button
              key={h.level}
              type="button"
              onClick={() => {
                onSelectHeading(h.level);
                setOpen(false);
              }}
              className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-royal-blue/5 hover:text-royal-blue transition-colors flex flex-col group cursor-pointer"
            >
              <span className={`font-semibold ${
                h.level === 1
                  ? "text-base text-slate-900 font-heading font-extrabold"
                  : h.level === 2
                  ? "text-sm text-slate-900 font-heading font-bold"
                  : h.level === 3
                  ? "text-xs text-slate-800 font-bold"
                  : "text-xs text-slate-700"
              }`}>
                {h.label}
              </span>
              <span className="text-[10px] text-slate-400 group-hover:text-royal-blue/70">
                {h.desc}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
