"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  User,
  ShieldAlert,
} from "lucide-react";
import { authFetch } from "@/lib/api/apiClient";

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
  setAuthor?: (author: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  onPublish: (status: "Published" | "Draft" | "Scheduled" | "In_Review", scheduledAt?: string) => void;
  isSaving: boolean;
  canPublish?: boolean;
  isAdmin?: boolean;
  articleStatus?: string;
  reviewNote?: string;
  categoriesList?: string[];
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
  tags,
  setTags,
  onPublish,
  isSaving,
  canPublish = false,
  isAdmin = false,
  articleStatus = "draft",
  reviewNote,
  categoriesList: propCategories,
  className = "",
}: ArticleEditorSidebarProps) {
  const [newTag, setNewTag] = useState("");
  const [publishStatus, setPublishStatus] = useState<"Published" | "Draft" | "Scheduled">("Published");
  const [scheduleDate, setScheduleDate] = useState("");
  const [seoTab, setSeoTab] = useState<"google" | "social">("google");
  const [categories, setCategories] = useState<string[]>(
    propCategories && propCategories.length > 0
      ? propCategories
      : [
          "Backend & Systems",
          "Frontend Architecture",
          "AI & Agents",
          "Cloud & DevOps",
          "Mobile Systems",
          "Security & SRE",
        ]
  );

  // Fetch real categories from backend taxonomy
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await authFetch("/api/categories");
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            setCategories(json.data.map((c: any) => c.name));
            if (!category || category === "Uncategorized") {
              setCategory(json.data[0].name);
            }
          }
        }
      } catch {
        // use default fallback
      }
    }
    loadCategories();
  }, []);

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
      { id: "content", label: "Substantive technical content (> 150 words)", met: stats.wordCount >= 150 },
      { id: "tags", label: "At least 2 topic tags tagged", met: tags.length >= 2 },
      { id: "category", label: "Domain category selected", met: !!category && category !== "Uncategorized" },
    ];
    const completedCount = items.filter((i) => i.met).length;
    const score = Math.round((completedCount / items.length) * 100);
    return { items, completedCount, score };
  }, [title, coverUrl, excerpt, stats.wordCount, tags, category]);

  const handleAddTag = (tagToAdd: string) => {
    const clean = tagToAdd.trim().replace(/^#/, "");
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
    }
    setNewTag("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const isLive = articleStatus === "published";
  const isInReview = articleStatus === "in_review";

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Editorial Rejection Notice (if author has feedback to address) */}
      {reviewNote && (
        <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 shadow-xs">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs mb-1">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Editorial Feedback Note</span>
          </div>
          <p className="text-xs text-rose-700 dark:text-rose-300/90 leading-relaxed">
            {reviewNote}
          </p>
        </div>
      )}

      {/* 1. Publication Lifecycle Card */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-royal-blue dark:text-cyan-blue" />
            <span>Publication Action</span>
          </h3>

          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isLive
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400"
                : isInReview
                ? "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-400"
                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {articleStatus}
          </span>
        </div>

        {/* Release mode toggle (Direct Publish vs Scheduled Release) */}
        {(canPublish || isAdmin) && !isLive && (
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setPublishStatus("Published")}
              className={`py-1 rounded-lg transition-colors cursor-pointer ${
                publishStatus === "Published"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Publish Now
            </button>
            <button
              type="button"
              onClick={() => setPublishStatus("Scheduled")}
              className={`py-1 rounded-lg transition-colors cursor-pointer ${
                publishStatus === "Scheduled"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Schedule
            </button>
          </div>
        )}

        {/* Schedule date picker if scheduled */}
        {publishStatus === "Scheduled" && (
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Target Release Timestamp
            </label>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="w-full px-2.5 py-1 text-xs rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950"
            />
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="space-y-1.5 pt-0.5">
          {/* Main Action based on user permissions & article status */}
          {!canPublish && !isAdmin ? (
            // Author without direct publish rights -> Submit for Review
            <button
              type="button"
              disabled={isSaving}
              onClick={() => onPublish("In_Review")}
              className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan hover:opacity-95 text-white font-bold text-xs shadow-sm shadow-royal-blue/25 hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {isSaving
                  ? "Submitting..."
                  : isInReview
                  ? "Update In-Review Submission"
                  : "Submit for Editorial Review"}
              </span>
            </button>
          ) : isLive ? (
            // Live article update
            <button
              type="button"
              disabled={isSaving}
              onClick={() => onPublish("Published")}
              className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:opacity-95 text-white font-bold text-xs shadow-sm shadow-emerald-600/25 hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isSaving ? "Updating Live..." : "Update Live Article"}</span>
            </button>
          ) : (
            // Direct Publish for Admin or authorized publishers
            <button
              type="button"
              disabled={isSaving}
              onClick={() => onPublish(publishStatus, publishStatus === "Scheduled" ? scheduleDate : undefined)}
              className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan hover:opacity-95 text-white font-bold text-xs shadow-sm shadow-royal-blue/25 hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {isSaving
                  ? "Publishing..."
                  : publishStatus === "Scheduled"
                  ? "Schedule Publication"
                  : "Publish to Live Blog"}
              </span>
            </button>
          )}

          {/* Working Copy Draft Button (Never changes published status to draft) */}
          <button
            type="button"
            disabled={isSaving}
            onClick={() => onPublish("Draft", undefined)}
            className="w-full py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3 h-3 text-slate-400" />
            <span>Save Working Draft</span>
          </button>
        </div>

        {/* Real-time Document Stats */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-1.5 text-center text-xs">
          <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
            <span className="block font-bold text-slate-900 dark:text-white text-xs">{stats.wordCount}</span>
            <span className="text-[9px] text-slate-500 uppercase tracking-wider">Words</span>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
            <span className="block font-bold text-slate-900 dark:text-white text-xs">{stats.charCount}</span>
            <span className="text-[9px] text-slate-500 uppercase tracking-wider">Chars</span>
          </div>
        </div>
      </div>

      {/* 2. Article Readiness Checklist & Meter */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Publication Readiness</span>
          </h3>
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              checklist.score === 100
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400"
                : checklist.score >= 60
                ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400"
                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {checklist.score}% Ready
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
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
              <span
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.met
                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                    : "bg-slate-100 text-slate-300 dark:bg-slate-800 dark:text-slate-600"
                }`}
              >
                {item.met ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                )}
              </span>
              <span
                className={`text-[11px] ${
                  item.met ? "text-slate-800 dark:text-slate-200 font-medium" : "text-slate-400"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Taxonomy & Properties */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
        <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-brand-azure" />
          <span>Taxonomy & Meta</span>
        </h3>

        {/* Category (Dynamic from DB) */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Primary Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 focus:bg-white text-slate-900 dark:text-slate-100 font-medium cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Author Byline & Level */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Author
            </label>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-medium">
              <User className="w-3 h-3 text-royal-blue shrink-0" />
              <span className="line-clamp-1">{author || "Current Account"}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-2 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 bg-slate-50/70 dark:bg-slate-950"
            >
              <option value="All Engineers">All Engineers</option>
              <option value="Senior / Architect">Senior / Architect</option>
              <option value="Principal / Staff">Principal / Staff</option>
              <option value="Core Engineering">Core Engineering</option>
            </select>
          </div>
        </div>

        {/* Topic Tags */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              Topic Tags ({tags.length})
            </label>
            <span className="text-[9px] text-slate-400">Press Enter</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-royal-blue/10 text-royal-blue dark:text-cyan-400 border border-royal-blue/20"
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag(newTag);
              }
            }}
            placeholder="Add custom keyword..."
            className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 focus:bg-white text-slate-800 dark:text-slate-200"
          />

          {/* Quick Suggestions */}
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Suggested Keywords
            </span>
            <div className="flex flex-wrap gap-1">
              {POPULAR_TAGS.filter((pt) => !tags.includes(pt))
                .slice(0, 6)
                .map((pt) => (
                  <button
                    key={pt}
                    type="button"
                    onClick={() => handleAddTag(pt)}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-royal-blue/10 hover:text-royal-blue transition-colors cursor-pointer"
                  >
                    + {pt}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
