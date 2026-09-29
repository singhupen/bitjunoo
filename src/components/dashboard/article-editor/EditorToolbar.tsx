"use client";

import React from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Image as ImageIcon,
  Link as LinkIcon,
  Table as TableIcon,
  Sparkles,
  Undo,
  Redo,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Minimize2,
  Columns,
  Eye,
  Edit3,
} from "lucide-react";
import HeadingDropdown from "./HeadingDropdown";
import ColorPickerDropdown from "./ColorPickerDropdown";
import HighlightPickerDropdown from "./HighlightPickerDropdown";

export type ViewMode = "split" | "write" | "preview";

interface EditorToolbarProps {
  onFormat: (prefix: string, suffix?: string, defaultText?: string) => void;
  onApplyHeading: (level: number) => void;
  onApplyColor: (hex: string | null) => void;
  onApplyHighlight: (hex: string | null) => void;
  onApplyAlignment: (align: "left" | "center" | "right") => void;
  onOpenImageModal: () => void;
  onOpenLinkModal: () => void;
  onOpenTableModal: () => void;
  onOpenSnippetsModal: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export default function EditorToolbar({
  onFormat,
  onApplyHeading,
  onApplyColor,
  onApplyHighlight,
  onApplyAlignment,
  onOpenImageModal,
  onOpenLinkModal,
  onOpenTableModal,
  onOpenSnippetsModal,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  viewMode,
  onChangeViewMode,
  isFullscreen,
  onToggleFullscreen,
}: EditorToolbarProps) {
  return (
    <div className="p-2 sm:p-2.5 bg-slate-50/90 border-b border-slate-200/90 flex flex-wrap items-center justify-between gap-1.5 backdrop-blur-md sticky top-0 z-30 select-none">
      {/* Left Formatting Tools */}
      <div className="flex flex-wrap items-center gap-1">
        {/* History Group */}
        <div className="flex items-center gap-0.5 pr-1 border-r border-slate-200">
          <button
            type="button"
            disabled={!canUndo}
            onClick={onUndo}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={!canRedo}
            onClick={onRedo}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Headings Dropdown */}
        <HeadingDropdown onSelectHeading={onApplyHeading} />

        {/* Text Style: Bold, Italic, Underline, Strikethrough, Code */}
        <div className="flex items-center gap-0.5 px-1 border-r border-slate-200">
          <button
            type="button"
            onClick={() => onFormat("**", "**", "bold text")}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onFormat("*", "*", "italic text")}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onFormat("<u>", "</u>", "underlined text")}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Underline (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onFormat("~~", "~~", "strikethrough text")}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onFormat("`", "`", "inline_code()")}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Inline Code"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        {/* Color and Highlight Pickers */}
        <div className="flex items-center gap-1 px-1 border-r border-slate-200">
          <ColorPickerDropdown onSelectColor={onApplyColor} />
          <HighlightPickerDropdown onSelectHighlight={onApplyHighlight} />
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5 px-1 border-r border-slate-200">
          <button
            type="button"
            onClick={() => onApplyAlignment("left")}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onApplyAlignment("center")}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onApplyAlignment("right")}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center gap-0.5 px-1 border-r border-slate-200">
          <button
            type="button"
            onClick={() => onFormat("\n- ", "", "Bulleted item")}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Bulleted List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onFormat("\n1. ", "", "Numbered item")}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onFormat("\n- [ ] ", "", "Task checklist item")}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Interactive Checklist"
          >
            <CheckSquare className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onFormat("\n> ", "", "Architectural quote or note")}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Quote Block"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onFormat("\n---\n")}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Horizontal Divider"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Media & Insertables */}
        <div className="flex items-center gap-1 pl-1">
          {/* Add Image with alignment/resizing */}
          <button
            type="button"
            onClick={onOpenImageModal}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-royal-blue/10 hover:bg-royal-blue text-royal-blue hover:text-white transition-all text-xs font-bold cursor-pointer"
            title="Insert Image (Upload, Align & Resize)"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Add Image</span>
          </button>

          {/* Link Modal */}
          <button
            type="button"
            onClick={onOpenLinkModal}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>

          {/* Table Modal */}
          <button
            type="button"
            onClick={onOpenTableModal}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200/80 hover:text-royal-blue transition-colors cursor-pointer"
            title="Insert Table"
          >
            <TableIcon className="w-4 h-4" />
          </button>

          {/* HTML & Code Snippets Drawer */}
          <button
            type="button"
            onClick={onOpenSnippetsModal}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple/10 hover:bg-purple text-purple hover:text-white transition-all text-xs font-bold cursor-pointer"
            title="HTML & Code Suggestions"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Code & HTML Snippets</span>
          </button>
        </div>
      </div>

      {/* Right Controls: View Modes & Fullscreen */}
      <div className="flex items-center gap-1.5 mt-1 sm:mt-0">
        <div className="flex items-center p-0.5 rounded-xl bg-slate-200/80 border border-slate-300/80 text-xs font-semibold">
          <button
            type="button"
            onClick={() => onChangeViewMode("write")}
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "write"
                ? "bg-white text-royal-blue shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Write Focus Mode"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Write</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeViewMode("split")}
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "split"
                ? "bg-white text-royal-blue shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Split Screen (Editor + Live Preview)"
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Split</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeViewMode("preview")}
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "preview"
                ? "bg-white text-royal-blue shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Live Preview"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Preview</span>
          </button>
        </div>

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 transition-colors cursor-pointer"
          title={isFullscreen ? "Exit Fullscreen" : "Distraction-Free Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-purple" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
