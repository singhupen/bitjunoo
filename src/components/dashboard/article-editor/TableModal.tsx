"use client";

import React, { useState } from "react";
import { X, Table as TableIcon, Check } from "lucide-react";

interface TableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertTable: (tableMarkup: string) => void;
}

export default function TableModal({
  isOpen,
  onClose,
  onInsertTable,
}: TableModalProps) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [hasHeader, setHasHeader] = useState(true);

  if (!isOpen) return null;

  const handleGenerate = () => {
    const validRows = Math.max(1, Math.min(rows, 12));
    const validCols = Math.max(1, Math.min(cols, 8));

    let markdown = "\n";

    if (hasHeader) {
      // Header row
      const headers = Array.from({ length: validCols }, (_, i) => `Header ${i + 1}`);
      markdown += `| ${headers.join(" | ")} |\n`;
      // Separator row
      const seps = Array.from({ length: validCols }, () => "---");
      markdown += `| ${seps.join(" | ")} |\n`;
    }

    // Body rows
    for (let r = 0; r < validRows; r++) {
      const cells = Array.from({ length: validCols }, (_, c) => `Data ${r + 1},${c + 1}`);
      markdown += `| ${cells.join(" | ")} |\n`;
    }

    markdown += "\n";
    onInsertTable(markdown);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-royal-blue/10 text-royal-blue">
              <TableIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-slate-900">
                Insert Markdown Table
              </h3>
              <p className="text-[11px] text-slate-500">
                Choose grid dimensions to generate structured table columns.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Columns (1 to 8)
              </label>
              <input
                type="number"
                min={1}
                max={8}
                value={cols}
                onChange={(e) => setCols(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Data Rows (1 to 12)
              </label>
              <input
                type="number"
                min={1}
                max={12}
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={hasHeader}
              onChange={(e) => setHasHeader(e.target.checked)}
              className="rounded text-royal-blue focus:ring-royal-blue border-slate-300"
            />
            <span>Include header row in table</span>
          </label>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/70 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-royal-blue hover:bg-royal-blue/90 text-white font-bold text-xs shadow transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Generate Table</span>
          </button>
        </div>
      </div>
    </div>
  );
}
