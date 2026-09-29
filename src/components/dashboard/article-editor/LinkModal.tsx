"use client";

import React, { useState } from "react";
import { X, Link as LinkIcon, Check, ExternalLink } from "lucide-react";

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertLink: (markdownLink: string) => void;
  defaultText?: string;
}

export default function LinkModal({
  isOpen,
  onClose,
  onInsertLink,
  defaultText = "",
}: LinkModalProps) {
  const [url, setUrl] = useState("");
  const [displayText, setDisplayText] = useState(defaultText);

  // Sync default text when opened
  React.useEffect(() => {
    if (isOpen) {
      setDisplayText(defaultText || "");
      setUrl("");
    }
  }, [isOpen, defaultText]);

  if (!isOpen) return null;

  const handleInsert = () => {
    if (!url.trim()) {
      alert("Please enter a destination URL.");
      return;
    }
    const text = displayText.trim() || url.trim();
    onInsertLink(`[${text}](${url.trim()})`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-royal-blue/10 text-royal-blue">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-slate-900">
                Insert Hyperlink
              </h3>
              <p className="text-[11px] text-slate-500">
                Link to documentation, GitHub repositories, or live demos.
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
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Link Destination (URL)
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://nextjs.org/docs or https://github.com/..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Display Text
            </label>
            <input
              type="text"
              value={displayText}
              onChange={(e) => setDisplayText(e.target.value)}
              placeholder="e.g. Next.js 16 Documentation"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
            />
          </div>
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
            disabled={!url.trim()}
            onClick={handleInsert}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-royal-blue hover:bg-royal-blue/90 text-white font-bold text-xs shadow transition-all disabled:opacity-50"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Insert Link</span>
          </button>
        </div>
      </div>
    </div>
  );
}
