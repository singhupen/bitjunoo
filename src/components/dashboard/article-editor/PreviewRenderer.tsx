"use client";

import React, { useMemo } from "react";
import { Check, Copy, AlertTriangle, Info, Lightbulb, ShieldAlert, ChevronRight } from "lucide-react";

interface PreviewRendererProps {
  content: string;
  title?: string;
  coverUrl?: string;
  category?: string;
  readTime?: string;
  authorName?: string;
}

export default function PreviewRenderer({
  content,
  title,
  coverUrl,
  category,
  readTime,
  authorName,
}: PreviewRendererProps) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopyCode = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Parse custom and markdown structures into renderable components
  const renderedElements = useMemo(() => {
    if (!content.trim()) {
      return (
        <div className="text-center py-16 text-slate-400">
          <p className="text-sm font-medium">Your live article preview will render here...</p>
          <p className="text-xs text-slate-400 mt-1">Start drafting in the editor to see formatted headings, images, code, and callouts.</p>
        </div>
      );
    }

    // Split content by blocks
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;
    let codeBlockIndex = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code blocks ```lang ... ```
      if (line.trim().startsWith("```")) {
        const lang = line.trim().replace(/^```/, "").trim() || "code";
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        const fullCode = codeLines.join("\n");
        const currentIndex = codeBlockIndex++;

        elements.push(
          <div key={`code-${currentIndex}-${i}`} className="my-5 rounded-2xl overflow-hidden border border-slate-800 bg-[#0c1222] shadow-xl group">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#141d33] border-b border-slate-800/80 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  {lang}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode(fullCode, currentIndex)}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-[11px] font-medium cursor-pointer"
                title="Copy code"
              >
                {copiedIndex === currentIndex ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 sm:p-5 text-xs sm:text-[13px] font-mono leading-relaxed text-slate-200 overflow-x-auto whitespace-pre">
              <code>{fullCode}</code>
            </pre>
          </div>
        );
        i++;
        continue;
      }

      // Figure / HTML Image blocks (e.g. <figure class="align-center" style="max-width: 75%...">)
      if (line.trim().startsWith("<figure") || (line.includes("<img") && line.includes("figure"))) {
        const figureLines: string[] = [];
        while (i < lines.length && !lines[i].includes("</figure>")) {
          figureLines.push(lines[i]);
          i++;
        }
        if (i < lines.length) figureLines.push(lines[i]);
        const fullFigure = figureLines.join("\n");

        elements.push(
          <div
            key={`figure-${i}`}
            className="my-6 clear-both"
            dangerouslySetInnerHTML={{ __html: fullFigure }}
          />
        );
        i++;
        continue;
      }

      // Markdown Images: ![alt](url "caption")
      const mdImgMatch = line.match(/^!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)$/);
      if (mdImgMatch) {
        const [, alt, url, caption] = mdImgMatch;
        elements.push(
          <figure key={`md-img-${i}`} className="my-6 text-center clear-both">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={alt || "Article diagram"}
              className="rounded-2xl max-w-full h-auto mx-auto shadow-md border border-slate-200/80 transition-transform duration-300 hover:scale-[1.01]"
            />
            {(caption || alt) && (
              <figcaption className="text-center text-xs text-slate-500 mt-2.5 font-medium italic">
                {caption || alt}
              </figcaption>
            )}
          </figure>
        );
        i++;
        continue;
      }

      // Callout alerts: > [!TIP], > [!NOTE], > [!WARNING], > [!CAUTION]
      const calloutMatch = line.match(/^>\s*\[!(NOTE|TIP|WARNING|CAUTION|INFO)\]\s*(.*)$/i);
      if (calloutMatch) {
        const type = calloutMatch[1].toUpperCase();
        const calloutLines: string[] = [];
        if (calloutMatch[2]) calloutLines.push(calloutMatch[2]);
        i++;
        while (i < lines.length && lines[i].trim().startsWith(">")) {
          calloutLines.push(lines[i].replace(/^>\s?/, ""));
          i++;
        }

        const calloutStyles: Record<string, { bg: string; border: string; text: string; icon: React.ReactNode; label: string }> = {
          TIP: {
            bg: "bg-emerald-50/80",
            border: "border-emerald-300",
            text: "text-emerald-900",
            icon: <Lightbulb className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />,
            label: "Pro Tip",
          },
          NOTE: {
            bg: "bg-sky-50/80",
            border: "border-sky-300",
            text: "text-sky-900",
            icon: <Info className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />,
            label: "Note",
          },
          INFO: {
            bg: "bg-royal-blue/5",
            border: "border-royal-blue/30",
            text: "text-slate-900",
            icon: <Info className="w-4 h-4 text-royal-blue mt-0.5 flex-shrink-0" />,
            label: "Information",
          },
          WARNING: {
            bg: "bg-amber-50/80",
            border: "border-amber-300",
            text: "text-amber-900",
            icon: <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />,
            label: "Warning",
          },
          CAUTION: {
            bg: "bg-rose-50/80",
            border: "border-rose-300",
            text: "text-rose-900",
            icon: <ShieldAlert className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />,
            label: "Caution",
          },
        };

        const config = calloutStyles[type] || calloutStyles.NOTE;

        elements.push(
          <div key={`callout-${i}`} className={`my-5 p-4 rounded-2xl border ${config.bg} ${config.border} flex items-start gap-3`}>
            {config.icon}
            <div className="flex-1 text-xs sm:text-sm">
              <span className="font-bold uppercase tracking-wider text-[11px] block mb-1 opacity-90">
                {config.label}
              </span>
              <div className={`${config.text} space-y-1`}>
                {calloutLines.map((cl, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: formatInline(cl) }} />
                ))}
              </div>
            </div>
          </div>
        );
        continue;
      }

      // Standard Blockquote: > text
      if (line.trim().startsWith(">")) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith(">")) {
          quoteLines.push(lines[i].replace(/^>\s?/, ""));
          i++;
        }
        elements.push(
          <blockquote
            key={`quote-${i}`}
            className="my-5 pl-4 sm:pl-5 border-l-4 border-royal-blue bg-royal-blue/[0.03] py-2.5 pr-4 rounded-r-xl italic text-slate-700 text-sm sm:text-base leading-relaxed"
          >
            {quoteLines.map((ql, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: formatInline(ql) }} />
            ))}
          </blockquote>
        );
        continue;
      }

      // Tables | col 1 | col 2 |
      if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
          tableLines.push(lines[i]);
          i++;
        }

        const parseCells = (row: string) =>
          row
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim());

        const headerCells = parseCells(tableLines[0]);
        const bodyRows = tableLines.slice(2).map(parseCells); // skip separator row

        elements.push(
          <div key={`table-${i}`} className="my-6 overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm text-slate-800">
              <thead className="bg-slate-100/80 text-slate-900 font-bold border-b border-slate-200">
                <tr>
                  {headerCells.map((h, hIdx) => (
                    <th key={hIdx} className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px] text-slate-700">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3" dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // Details / Accordion <details><summary>
      if (line.trim().startsWith("<details")) {
        const detailLines: string[] = [];
        while (i < lines.length && !lines[i].includes("</details>")) {
          detailLines.push(lines[i]);
          i++;
        }
        if (i < lines.length) detailLines.push(lines[i]);
        elements.push(
          <div
            key={`details-${i}`}
            className="my-4 clear-both"
            dangerouslySetInnerHTML={{ __html: detailLines.join("\n") }}
          />
        );
        i++;
        continue;
      }

      // Heading 1: # Title
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={`h1-${i}`} className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950 mt-8 mb-4 tracking-tight pb-2 border-b border-slate-200/70">
            <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^#\s+/, "")) }} />
          </h1>
        );
        i++;
        continue;
      }

      // Heading 2: ## Section
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={`h2-${i}`} className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mt-7 mb-3 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-royal-blue to-brand-azure inline-block" />
            <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^##\s+/, "")) }} />
          </h2>
        );
        i++;
        continue;
      }

      // Heading 3: ### Sub-section
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={`h3-${i}`} className="font-heading text-lg sm:text-xl font-bold text-slate-800 mt-6 mb-2.5 tracking-tight">
            <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^###\s+/, "")) }} />
          </h3>
        );
        i++;
        continue;
      }

      // Heading 4: #### Sub-sub-section
      if (line.startsWith("#### ")) {
        elements.push(
          <h4 key={`h4-${i}`} className="font-heading text-base font-semibold text-slate-800 mt-5 mb-2">
            <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^####\s+/, "")) }} />
          </h4>
        );
        i++;
        continue;
      }

      // Horizontal Divider ---
      if (/^(\*\*\*|---|___)$/.test(line.trim())) {
        elements.push(<hr key={`hr-${i}`} className="my-8 border-t border-slate-200" />);
        i++;
        continue;
      }

      // Checklists: - [ ] or - [x]
      if (/^-\s+\[([ xX])\]\s+(.*)$/.test(line.trim())) {
        const checkItems: { checked: boolean; text: string }[] = [];
        while (i < lines.length && /^-\s+\[([ xX])\]\s+(.*)$/.test(lines[i].trim())) {
          const m = lines[i].trim().match(/^-\s+\[([ xX])\]\s+(.*)$/);
          if (m) {
            checkItems.push({ checked: m[1].toLowerCase() === "x", text: m[2] });
          }
          i++;
        }
        elements.push(
          <ul key={`checklist-${i}`} className="my-4 space-y-2">
            {checkItems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800">
                <input
                  type="checkbox"
                  checked={item.checked}
                  readOnly
                  className="w-4 h-4 rounded text-royal-blue focus:ring-royal-blue border-slate-300"
                />
                <span className={item.checked ? "line-through text-slate-400" : ""}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Bullet lists: - item or * item
      if (/^[-*]\s+(.*)$/.test(line.trim())) {
        const bulletItems: string[] = [];
        while (i < lines.length && /^[-*]\s+(.*)$/.test(lines[i].trim())) {
          bulletItems.push(lines[i].trim().replace(/^[-*]\s+/, ""));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="my-4 space-y-2 list-none pl-1">
            {bulletItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-royal-blue mt-2 flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Numbered lists: 1. item
      if (/^\d+\.\s+(.*)$/.test(line.trim())) {
        const numItems: string[] = [];
        while (i < lines.length && /^\d+\.\s+(.*)$/.test(lines[i].trim())) {
          numItems.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
          i++;
        }
        elements.push(
          <ol key={`ol-${i}`} className="my-4 space-y-2 list-none pl-1 counter-reset-item">
            {numItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-royal-blue/10 text-royal-blue text-[11px] font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // Raw HTML check
      if (line.trim().startsWith("<") && (line.trim().endsWith(">") || line.includes("</"))) {
        elements.push(
          <div key={`html-${i}`} className="my-3 clear-both" dangerouslySetInnerHTML={{ __html: line }} />
        );
        i++;
        continue;
      }

      // Empty blank lines
      if (!line.trim()) {
        i++;
        continue;
      }

      // Normal paragraph
      elements.push(
        <p
          key={`p-${i}`}
          className="my-3 text-xs sm:text-sm text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
      i++;
    }

    return elements;
  }, [content, copiedIndex]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden p-6 sm:p-10 max-w-4xl mx-auto">
      {/* Header Meta Badge */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {category && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-[11px] font-bold uppercase tracking-wider">
            {category}
          </span>
        )}
        {readTime && (
          <span className="text-xs text-slate-400 font-medium">
            • {readTime}
          </span>
        )}
      </div>

      {/* Article Title */}
      {title ? (
        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4 leading-tight">
          {title}
        </h1>
      ) : (
        <div className="h-10 bg-slate-100 rounded-xl mb-4 w-3/4 animate-pulse" />
      )}

      {/* Author and Date Mockup */}
      <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-200/80">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-royal-blue to-brand-azure flex items-center justify-center text-white font-bold text-xs shadow-sm">
          {authorName ? authorName[0].toUpperCase() : "A"}
        </div>
        <div>
          <p className="text-xs sm:text-sm font-semibold text-slate-900">
            {authorName || "Editorial Staff"}
          </p>
          <p className="text-[11px] text-slate-400">
            Published today • BitJunoo Engineering Journal
          </p>
        </div>
      </div>

      {/* Featured Cover Image if present */}
      {coverUrl && (
        <div className="mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverUrl}
            alt={title || "Cover banner"}
            className="w-full max-h-[420px] object-cover"
          />
        </div>
      )}

      {/* Body Content */}
      <article className="prose prose-slate max-w-none text-slate-800">
        {renderedElements}
      </article>
    </div>
  );
}

/** Helper function to parse markdown inline styles: bold, italic, code, links, tags */
function formatInline(str: string): string {
  let res = str;

  // Preserve existing HTML spans / marks
  // Bold **text** or __text__
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-950">$1</strong>');
  res = res.replace(/__(.*?)__/g, '<strong class="font-bold text-slate-950">$1</strong>');

  // Italic *text* or _text_
  res = res.replace(/\*(.*?)\*/g, '<em class="italic text-slate-800">$1</em>');
  res = res.replace(/_(.*?)_/g, '<em class="italic text-slate-800">$1</em>');

  // Strikethrough ~~text~~
  res = res.replace(/~~(.*?)~~/g, '<del class="line-through text-slate-400">$1</del>');

  // Inline code `code`
  res = res.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 text-xs font-mono font-medium rounded-md bg-slate-100 text-royal-blue border border-slate-200/80">$1</code>'
  );

  // Links [text](url)
  res = res.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-royal-blue font-medium underline decoration-royal-blue/30 hover:decoration-royal-blue transition-colors">$1</a>'
  );

  // Kbd tags <kbd>Key</kbd>
  res = res.replace(
    /<kbd>(.*?)<\/kbd>/g,
    '<kbd class="px-2 py-0.5 text-[11px] font-mono font-semibold rounded bg-slate-100 border border-slate-300 text-slate-800 shadow-sm">$1</kbd>'
  );

  return res;
}
