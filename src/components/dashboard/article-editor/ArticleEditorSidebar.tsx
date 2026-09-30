"use client";

import React, { useState, useMemo } from "react";
import {
  Send,
  Save,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  Tag,
  Search,
  Share2,
  BookOpen,
  List,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

interface ArticleEditorSidebarProps {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl: string;
  category: string;
  setCategory: (cat: string) => void;
  readTime: string;
  setReadTime: (time: string) => void;
  level: string;
  setLevel: (lvl: string) => void;
  author: string;
  setAuthor: (author: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  onPublish: (status: "Published" | "Draft" | "Scheduled") => void;
  isSaving: boolean;
  className?: string;
}

const POPULAR_TAGS = [
  "Next.js 16",
  "React 19",
  ".NET 9",
  "Distributed Systems",
  "Cloud Microservices",
  "Kubernetes",
  "TypeScript",
  "AI Agents",
  "PostgreSQL",
  "gRPC",
  "System Architecture",
];

export default function ArticleEditorSidebar({
  title,
  slug,
  excerpt,
  content,
  coverUrl,
  category,
  setCategory,
  readTime,
  setReadTime,
  level,
  setLevel,
  author,
  setAuthor,
  tags,
  setTags,
  onPublish,
  isSaving,
  className,
}: ArticleEditorSidebarProps) {
  const [newTag, setNewTag] = useState("");
  const [publishStatus, setPublishStatus] = useState<"Published" | "Draft" | "Scheduled">("Published");
  const [scheduleDate, setScheduleDate] = useState("");
  const [seoTab, setSeoTab] = useState<"google" | "social">("google");

  // Word count & reading time calculation
  const stats = useMemo(() => {
    const textOnly = content.replace(/<[^>]*>/g, " ").replace(/[#*`_~[\]()]/g, " ");
    const words = textOnly.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const charCount = content.length;
    const calculatedMinutes = Math.max(1, Math.ceil(wordCount / 200));
    return {
      wordCount,
      charCount,
      readingMinutes: `${calculatedMinutes} min read`,
    };
  }, [content]);

  // Readiness checklist computation
  const checklist = useMemo(() => {
    const items = [
      { id: "headline", label: "Headline defined (> 10 chars)", met: title.trim().length >= 10 },
      { id: "cover", label: "Featured cover image attached", met: !!coverUrl.trim() },
      { id: "excerpt", label: "SEO summary & excerpt written", met: excerpt.trim().length >= 25 },
      { id: "content", label: "Substantial content (> 80 words)", met: stats.wordCount >= 80 },
      { id: "category", label: "Category assigned", met: !!category },
      { id: "tags", label: "At least 2 topic tags added", met: tags.length >= 2 },
    ];
    const metCount = items.filter((i) => i.met).length;
    const score = Math.round((metCount / items.length) * 100);
    return { items, score, metCount, total: items.length };
  }, [title, coverUrl, excerpt, stats.wordCount, category, tags]);

  // Dynamic Table of Contents (parsed from headings in content)
  const headings = useMemo(() => {
    const lines = content.split("\n");
    const list: { level: number; text: string }[] = [];
    lines.forEach((l) => {
      const match = l.match(/^(#{1,3})\s+(.*)$/);
      if (match) {
        list.push({
          level: match[1].length,
          text: match[2].replace(/[*_`]/g, ""),
        });
      }
    });
    return list;
  }, [content]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      const clean = newTag.trim();
      if (!tags.includes(clean)) {
        setTags([...tags, clean]);
      }
      setNewTag("");
    }
  };

  const handleQuickAddTag = (tagToAdd: string) => {
    if (!tags.includes(tagToAdd)) {
      setTags([...tags, tagToAdd]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <aside className={`space-y-2.5 ${className || ""}`}>
      {/* 1. Publishing Action Card */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-royal-blue" />
            <span>Publishing Hub</span>
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
            {stats.readingMinutes}
          </span>
        </div>

        {/* Publication Status Selector */}
        <div>
          <label className="block text-[10px] font-semibold text-slate-600 mb-1">
            Publication Intent
          </label>
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200/80 text-xs font-semibold">
            {(["Published", "Draft", "Scheduled"] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setPublishStatus(status)}
                className={`py-1 rounded-lg transition-all text-center cursor-pointer text-xs ${
                  publishStatus === status
                    ? "bg-white text-royal-blue shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Scheduled date if selected */}
        {publishStatus === "Scheduled" && (
          <div className="animate-in fade-in duration-200">
            <label className="block text-[10px] font-semibold text-slate-600 mb-1">
              Select Schedule Date & Time
            </label>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="w-full px-2.5 py-1 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-800"
            />
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="space-y-1.5 pt-0.5">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => onPublish(publishStatus)}
            className="w-full py-2 px-3.5 rounded-xl bg-gradient-to-r from-royal-blue via-indigo to-purple hover:opacity-95 text-white font-bold text-xs shadow-sm shadow-royal-blue/25 hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            <Send className="w-3.5 h-3.5" />
            <span>
              {isSaving
                ? "Processing..."
                : publishStatus === "Published"
                ? "Publish to Live Blog"
                : publishStatus === "Scheduled"
                ? "Schedule Publication"
                : "Save as Draft"}
            </span>
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={() => onPublish("Draft")}
            className="w-full py-1.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3 h-3 text-slate-400" />
            <span>Save Working Copy</span>
          </button>
        </div>

        {/* Real-time Document Stats */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-1.5 text-center text-xs">
          <div className="p-1.5 rounded-lg bg-slate-50">
            <span className="block font-bold text-slate-900 text-xs">{stats.wordCount}</span>
            <span className="text-[9px] text-slate-500 uppercase tracking-wider">Words</span>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-50">
            <span className="block font-bold text-slate-900 text-xs">{stats.charCount}</span>
            <span className="text-[9px] text-slate-500 uppercase tracking-wider">Chars</span>
          </div>
        </div>
      </div>

      {/* 2. Article Readiness Checklist & Meter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Publication Readiness</span>
          </h3>
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
            checklist.score === 100
              ? "bg-emerald-100 text-emerald-800"
              : checklist.score >= 60
              ? "bg-amber-100 text-amber-800"
              : "bg-slate-100 text-slate-700"
          }`}>
            {checklist.score}% Ready
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              checklist.score === 100
                ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                : checklist.score >= 60
                ? "bg-gradient-to-r from-royal-blue to-cyan-blue"
                : "bg-gradient-to-r from-amber-400 to-amber-500"
            }`}
            style={{ width: `${checklist.score}%` }}
          />
        </div>

        {/* Checklist items */}
        <div className="space-y-1.5 pt-0.5">
          {checklist.items.map((item) => (
            <div key={item.id} className="flex items-center gap-2 text-xs">
              <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                item.met ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-300"
              }`}>
                {item.met ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                )}
              </span>
              <span className={`text-[11px] ${item.met ? "text-slate-800 font-medium" : "text-slate-400"}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Taxonomy & Properties */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-purple" />
          <span>Taxonomy & Meta</span>
        </h3>

        {/* Category */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Primary Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900 font-medium cursor-pointer"
          >
            <option value="Backend & Systems">Backend & Systems</option>
            <option value="Frontend Architecture">Frontend Architecture</option>
            <option value="AI & Agents">AI & Agents</option>
            <option value="Cloud & DevOps">Cloud & DevOps</option>
            <option value="Mobile Systems">Mobile Systems</option>
            <option value="Security & SRE">Security & SRE</option>
          </select>
        </div>

        {/* Author & Read Time */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Author
            </label>
            <select
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-2 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-800 bg-slate-50/70 focus:bg-white"
            >
              <option value="Alex Vance">Alex Vance</option>
              <option value="Elena Rostova">Elena Rostova</option>
              <option value="Sarah Mitchell">Sarah Mitchell</option>
              <option value="BitJunoo Team">BitJunoo Team</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Target Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-2 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-800 bg-slate-50/70 focus:bg-white"
            >
              <option value="All Engineers">All Engineers</option>
              <option value="Senior / Architect">Senior / Architect</option>
              <option value="Principal / Staff">Principal / Staff</option>
              <option value="Core Engineering">Core Engineering</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-semibold text-slate-700">
              Topic Tags ({tags.length})
            </label>
            <span className="text-[9px] text-slate-400">Press Enter</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-royal-blue/10 text-royal-blue border border-royal-blue/20"
              >
                <span>{t}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(t)}
                  className="hover:text-rose-600 transition-colors cursor-pointer text-xs"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Type tag name and hit Enter..."
            className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
          />

          {/* Quick Suggestions */}
          <div className="mt-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Popular Tags
            </span>
            <div className="flex flex-wrap gap-1">
              {POPULAR_TAGS.filter((pt) => !tags.includes(pt))
                .slice(0, 6)
                .map((pt) => (
                  <button
                    key={pt}
                    type="button"
                    onClick={() => handleQuickAddTag(pt)}
                    className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                  >
                    + {pt}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. SEO & Social Snippet Preview */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-cyan-blue" />
            <span>Search & Social</span>
          </h3>

          <div className="flex p-0.5 rounded-lg bg-slate-100 text-[9px] font-semibold">
            <button
              type="button"
              onClick={() => setSeoTab("google")}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                seoTab === "google" ? "bg-white text-royal-blue shadow-2xs font-bold" : "text-slate-500"
              }`}
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => setSeoTab("social")}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                seoTab === "social" ? "bg-white text-royal-blue shadow-2xs font-bold" : "text-slate-500"
              }`}
            >
              Social
            </button>
          </div>
        </div>

        {seoTab === "google" ? (
          <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <span className="font-medium text-slate-700">BitJunoo</span>
              <span>›</span>
              <span className="truncate">blog › {slug || "new-publication"}</span>
            </div>
            <h4 className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer truncate leading-tight">
              {title || "Architecting High-Throughput Distributed Microservices"}
            </h4>
            <p className="text-[10px] text-slate-600 line-clamp-2 leading-relaxed">
              {excerpt || "Comprehensive architectural deep dive covering sub-second consensus, zero-downtime failover, and production benchmarks..."}
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50">
            {coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverUrl} alt="Social card" className="w-full h-24 object-cover" />
            ) : (
              <div className="w-full h-20 bg-gradient-to-r from-royal-blue to-purple flex items-center justify-center text-white text-xs font-bold">
                BitJunoo Editorial
              </div>
            )}
            <div className="p-2.5 space-y-0.5">
              <p className="text-[9px] uppercase font-bold text-slate-400">bitjunoo.com</p>
              <p className="text-[11px] font-bold text-slate-900 truncate">
                {title || "Article Headline"}
              </p>
              <p className="text-[9px] text-slate-500 line-clamp-1">
                {excerpt || "Editorial article summary"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 5. Document Outline / Table of Contents */}
      {headings.length > 0 && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2.5">
          <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <List className="w-3.5 h-3.5 text-slate-600" />
            <span>Document Outline ({headings.length})</span>
          </h3>
          <div className="space-y-1 text-xs max-h-40 overflow-y-auto pr-1">
            {headings.map((h, i) => (
              <div
                key={i}
                className={`truncate py-1 px-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 ${
                  h.level === 1
                    ? "font-bold text-slate-900"
                    : h.level === 2
                    ? "pl-3.5 font-semibold text-slate-800"
                    : "pl-6 text-slate-600 text-[10px]"
                }`}
              >
                {h.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
