"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface ArticleReadingToolsProps {
  category: string;
  title: string;
  slug: string;
}

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setProgress(Math.min(100, Math.max(0, scrollPercent)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200/40 dark:bg-slate-800/40 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan transition-all duration-100 ease-out shadow-xs"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function ArticleTopNav({ category, title, slug }: ArticleReadingToolsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`"${title}" on BitJunoo Engineering:`);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/70 dark:border-slate-800/70">
      {/* Left: Sleek Back Pill */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 hover:border-royal-blue/40 dark:hover:border-cyan-blue/40 text-xs font-semibold shadow-2xs backdrop-blur-md transition-all group"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-royal-blue dark:text-cyan-blue group-hover:-translate-x-1 transition-transform" />
        <span>All Publications</span>
      </Link>

      {/* Right: Category Capsule & Social Share */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-blue/10 dark:bg-cyan-blue/10 border border-royal-blue/20 dark:border-cyan-blue/30 text-royal-blue dark:text-cyan-blue text-xs font-bold tracking-wide uppercase shadow-2xs">
          <Sparkles className="w-3 h-3" />
          <span>{category}</span>
        </span>

        {/* Quick Social Share Pills */}
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
          <button
            type="button"
            onClick={handleCopyLink}
            title={copied ? "Link Copied!" : "Copy Article Link"}
            className="p-1.5 rounded-full hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={handleShareTwitter}
            title="Share on X"
            className="p-1.5 rounded-full hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleShareLinkedIn}
            title="Share on LinkedIn"
            className="p-1.5 rounded-full hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

interface TableOfContentsProps {
  headings: { id: string; text: string; level: number }[];
}

export function InteractiveTableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-2xs backdrop-blur-md">
      <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 mb-3.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
        <BookOpen className="w-4 h-4 text-royal-blue dark:text-cyan-blue" />
        <span>Table of Contents</span>
      </h3>
      <nav className="space-y-1 text-xs">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`block rounded-lg px-2 py-1.5 transition-all line-clamp-1 ${
                isActive
                  ? "bg-royal-blue/10 dark:bg-cyan-blue/10 text-royal-blue dark:text-cyan-blue font-bold translate-x-1"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium"
              } ${h.level === 3 ? "ml-3 text-[11px] opacity-85" : ""}`}
            >
              {h.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
