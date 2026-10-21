"use client";

import React, { useMemo, useState } from "react";
import {
  Check,
  Copy,
  AlertTriangle,
  Info,
  Lightbulb,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface ArticleContentRendererProps {
  content: string;
}

export default function ArticleContentRenderer({
  content,
}: ArticleContentRendererProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderedElements = useMemo(() => {
    if (!content) return null;

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
          <div
            key={`code-${currentIndex}-${i}`}
            className="my-6 rounded-2xl overflow-hidden border border-slate-800 bg-[#0c1222] shadow-xl group"
          >
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
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
                title="Copy code"
              >
                {copiedIndex === currentIndex ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed selection:bg-royal-blue/40">
              <code>{fullCode}</code>
            </pre>
          </div>
        );
        i++;
        continue;
      }

      // Callout Blocks > [!NOTE], > [!TIP], > [!WARNING], > [!IMPORTANT], > [!CAUTION]
      if (line.trim().startsWith("> [!")) {
        const match = line.trim().match(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
        if (match) {
          const calloutType = match[1].toUpperCase();
          const calloutLines: string[] = [];
          i++;
          while (i < lines.length && lines[i].trim().startsWith(">")) {
            calloutLines.push(lines[i].replace(/^>\s?/, ""));
            i++;
          }
          const calloutBody = calloutLines.join("\n").trim();

          const styleMap: Record<
            string,
            { bg: string; border: string; text: string; icon: any; title: string }
          > = {
            NOTE: {
              bg: "bg-blue-50/70 dark:bg-blue-950/30",
              border: "border-blue-200 dark:border-blue-900",
              text: "text-blue-900 dark:text-blue-200",
              icon: Info,
              title: "Note",
            },
            TIP: {
              bg: "bg-emerald-50/70 dark:bg-emerald-950/30",
              border: "border-emerald-200 dark:border-emerald-900",
              text: "text-emerald-900 dark:text-emerald-200",
              icon: Lightbulb,
              title: "Engineering Tip",
            },
            IMPORTANT: {
              bg: "bg-purple-50/70 dark:bg-purple-950/30",
              border: "border-purple-200 dark:border-purple-900",
              text: "text-purple-900 dark:text-purple-200",
              icon: ShieldAlert,
              title: "Critical Principle",
            },
            WARNING: {
              bg: "bg-amber-50/70 dark:bg-amber-950/30",
              border: "border-amber-200 dark:border-amber-900",
              text: "text-amber-900 dark:text-amber-200",
              icon: AlertTriangle,
              title: "Production Warning",
            },
            CAUTION: {
              bg: "bg-rose-50/70 dark:bg-rose-950/30",
              border: "border-rose-200 dark:border-rose-900",
              text: "text-rose-900 dark:text-rose-200",
              icon: ShieldAlert,
              title: "System Risk Caution",
            },
          };

          const config = styleMap[calloutType] || styleMap.NOTE;
          const CalloutIcon = config.icon;

          elements.push(
            <div
              key={`callout-${i}`}
              className={`my-5 p-4 sm:p-5 rounded-2xl border ${config.bg} ${config.border} ${config.text} transition-colors`}
            >
              <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wider">
                <CalloutIcon className="w-4 h-4 shrink-0" />
                <span>{config.title}</span>
              </div>
              <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line opacity-95">
                {calloutBody}
              </div>
            </div>
          );
          continue;
        }
      }

      // Headings
      if (line.startsWith("### ")) {
        const text = line.replace(/^###\s+/, "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h3
            key={`h3-${i}`}
            id={id}
            className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3 scroll-mt-24"
          >
            {text}
          </h3>
        );
        i++;
        continue;
      }
      if (line.startsWith("## ")) {
        const text = line.replace(/^##\s+/, "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h2
            key={`h2-${i}`}
            id={id}
            className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-10 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800 scroll-mt-24"
          >
            {text}
          </h2>
        );
        i++;
        continue;
      }
      if (line.startsWith("# ")) {
        const text = line.replace(/^#\s+/, "");
        elements.push(
          <h1
            key={`h1-${i}`}
            className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-8 mb-4"
          >
            {text}
          </h1>
        );
        i++;
        continue;
      }

      // Blockquote
      if (line.startsWith("> ")) {
        const quoteText = line.replace(/^>\s+/, "");
        elements.push(
          <blockquote
            key={`quote-${i}`}
            className="my-5 pl-4 border-l-4 border-royal-blue italic text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-50/50 dark:bg-slate-900/40 py-2 rounded-r-xl"
          >
            {quoteText}
          </blockquote>
        );
        i++;
        continue;
      }

      // Bullet lists
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const listItems: string[] = [];
        while (
          i < lines.length &&
          (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
        ) {
          listItems.push(lines[i].trim().replace(/^[-*]\s+/, ""));
          i++;
        }
        elements.push(
          <ul
            key={`list-${i}`}
            className="my-4 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-2"
          >
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-royal-blue dark:bg-cyan-blue mt-2 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Empty line spacer
      if (!line.trim()) {
        i++;
        continue;
      }

      // Standard Paragraph
      elements.push(
        <p
          key={`p-${i}`}
          className="my-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );

      i++;
    }

    return elements;
  }, [content, copiedIndex]);

  return <div className="article-body font-sans">{renderedElements}</div>;
}

/** Helper for bold, italic, code, and link markdown */
function formatInline(str: string): string {
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-royal-blue dark:text-cyan-400 font-mono text-[11px]">$1</code>'
    )
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-royal-blue dark:text-cyan-blue hover:underline font-semibold">$1</a>'
    );
}
