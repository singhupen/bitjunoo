"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/api/apiClient";
import {
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Edit2,
  Upload,
  Image as ImageIcon,
  Trash2,
  Cloud,
  CloudOff,
} from "lucide-react";
import EditorToolbar, { ViewMode } from "./article-editor/EditorToolbar";
import PreviewRenderer from "./article-editor/PreviewRenderer";
import ArticleEditorSidebar from "./article-editor/ArticleEditorSidebar";
import ImageModal from "./article-editor/ImageModal";
import LinkModal from "./article-editor/LinkModal";
import TableModal from "./article-editor/TableModal";
import CodeSnippetsModal from "./article-editor/CodeSnippetsModal";

interface ArticleEditorProps {
  /** If provided, the editor will load and edit this article */
  articleId?: string;
}

export default function ArticleEditor({ articleId }: ArticleEditorProps) {
  const router = useRouter();
  const isEditMode = Boolean(articleId);

  // Document state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugCustom, setIsSlugCustom] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [coverPublicId, setCoverPublicId] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [readTime, setReadTime] = useState("5 min read");
  const [level, setLevel] = useState("Beginner");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Editor Content & Undo/Redo stack
  const [content, setContent] = useState("");
  const [history, setHistory] = useState<string[]>([""]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // UI state
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copiedSlug, setCopiedSlug] = useState(false);
  const [isLoadingArticle, setIsLoadingArticle] = useState(isEditMode);

  // Current saved article ID (used when editing after first save)
  const [savedArticleId, setSavedArticleId] = useState<string | null>(articleId ?? null);

  // Modals state
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isSnippetsModalOpen, setIsSnippetsModalOpen] = useState(false);
  const [selectedTextForLink, setSelectedTextForLink] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Load article if in edit mode ───────────────────────────────────────────
  useEffect(() => {
    if (!articleId) return;
    async function loadArticle() {
      setIsLoadingArticle(true);
      try {
        const res = await authFetch(`/api/articles/${articleId}`);
        if (res.ok) {
          const json = await res.json();
          const a = json.data;
          setTitle(a.title ?? "");
          setSlug(a.slug ?? "");
          setExcerpt(a.excerpt ?? "");
          setContent(a.content ?? "");
          setCategory(a.category ?? "Uncategorized");
          setTags(a.tags ?? []);
          setReadTime(a.readTime ? `${a.readTime} min read` : "5 min read");
          if (a.coverImage?.url) setCoverUrl(a.coverImage.url);
          if (a.coverImage?.publicId) setCoverPublicId(a.coverImage.publicId);
          setIsSlugCustom(true); // lock slug for existing articles
          setHistory([a.content ?? ""]);
          setHistoryIndex(0);
        } else {
          setStatusMessage({ type: "error", text: "Failed to load article. It may not exist or you don't have access." });
        }
      } catch {
        setStatusMessage({ type: "error", text: "Network error while loading article." });
      } finally {
        setIsLoadingArticle(false);
      }
    }
    loadArticle();
  }, [articleId]);

  // Auto-generate slug when title changes unless manually customized
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugCustom) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  };

  // Push new state to undo/redo history
  const updateContentWithHistory = useCallback((newContent: string) => {
    setContent(newContent);
    setHistory((prev) => {
      const nextHistory = prev.slice(0, historyIndex + 1);
      nextHistory.push(newContent);
      return nextHistory.slice(-40); // keep up to 40 steps
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
    }
  };

  // Helper to insert or wrap text in textarea
  const formatSelection = useCallback(
    (prefix: string, suffix: string = "", defaultText: string = "formatted text") => {
      const textarea = textareaRef.current;
      if (!textarea) {
        updateContentWithHistory(content + prefix + defaultText + suffix);
        return;
      }

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = textarea.value.substring(start, end);
      const textToWrap = selected || defaultText;

      const replacement = `${prefix}${textToWrap}${suffix}`;
      const newContent =
        textarea.value.substring(0, start) + replacement + textarea.value.substring(end);

      updateContentWithHistory(newContent);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + prefix.length,
          start + prefix.length + textToWrap.length
        );
      }, 10);
    },
    [content, updateContentWithHistory]
  );

  // Formatting Action Handlers
  const handleApplyHeading = (lvl: number) => {
    if (lvl === 0) {
      formatSelection("", "", "Standard paragraph text");
    } else {
      const prefix = "#".repeat(lvl) + " ";
      formatSelection(`\n${prefix}`, "\n", `Heading ${lvl} Title`);
    }
  };

  const handleApplyColor = (hex: string | null) => {
    if (!hex) {
      formatSelection("", "", "clean text");
      return;
    }
    formatSelection(`<span style="color: ${hex}; font-weight: 600;">`, "</span>", "colored text");
  };

  const handleApplyHighlight = (hex: string | null) => {
    if (!hex) {
      formatSelection("", "", "unhighlighted text");
      return;
    }
    formatSelection(
      `<mark style="background-color: ${hex}; padding: 2px 6px; border-radius: 4px; font-weight: 500;">`,
      "</mark>",
      "highlighted text"
    );
  };

  const handleApplyAlignment = (align: "left" | "center" | "right") => {
    formatSelection(
      `<div style="text-align: ${align};">`,
      "</div>",
      `Text aligned to the ${align}`
    );
  };

  const handleOpenLinkModal = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const selected = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
      setSelectedTextForLink(selected);
    }
    setIsLinkModalOpen(true);
  };

  // Keyboard shortcut handler (Ctrl+B, Ctrl+I, Ctrl+Z, etc.)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
        if (e.key.toLowerCase() === "b") {
          e.preventDefault();
          formatSelection("**", "**", "bold text");
        } else if (e.key.toLowerCase() === "i") {
          e.preventDefault();
          formatSelection("*", "*", "italic text");
        } else if (e.key.toLowerCase() === "u") {
          e.preventDefault();
          formatSelection("<u>", "</u>", "underlined text");
        } else if (e.key.toLowerCase() === "z") {
          e.preventDefault();
          handleUndo();
        } else if (e.key.toLowerCase() === "y") {
          e.preventDefault();
          handleRedo();
        } else if (e.key.toLowerCase() === "s") {
          e.preventDefault();
          handleSave("draft");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Auto-save to backend as draft when content changes (debounced 3s)
  useEffect(() => {
    if (!title.trim() || isLoadingArticle) return;

    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    autoSaveTimerRef.current = setTimeout(async () => {
      if (!title.trim()) return;
      try {
        setAutoSaveStatus("saving");
        await performSave("draft", false); // silent auto-save
        setAutoSaveStatus("saved");
        setLastSavedAt(new Date());
      } catch {
        setAutoSaveStatus("error");
      }
    }, 3000);

    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content, excerpt, category, tags]);

  // Copy article link
  const handleCopyLink = () => {
    const fullUrl = `https://bitjunoo.com/blog/${slug || "new-article"}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  // Cover image local file handler — converts to base64 for preview
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setCoverUrl(event.target?.result as string);
      setCoverPublicId(""); // local preview, no publicId yet
    };
    reader.readAsDataURL(file);
  };

  // Core save/publish API call
  const performSave = async (
    status: "draft" | "published" | "scheduled",
    scheduledAt?: string | false
  ): Promise<void> => {
    const payload: Record<string, unknown> = {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      readTime: parseInt(readTime) || 5,
      status,
      coverImage: coverUrl
        ? { url: coverUrl, publicId: coverPublicId || "", alt: title }
        : undefined,
    };

    if (status === "scheduled" && scheduledAt) {
      payload.scheduledAt = scheduledAt;
    }

    if (savedArticleId) {
      // UPDATE existing article
      const res = await authFetch(`/api/articles/${savedArticleId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message ?? "Failed to update article.");
      }
    } else {
      // CREATE new article
      const res = await authFetch("/api/articles", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message ?? "Failed to create article.");
      }
      const json = await res.json();
      // Store the ID so subsequent saves use PATCH
      if (json.data?._id) setSavedArticleId(json.data._id);
    }
  };

  // Main user-triggered save/publish handler
  const handleSave = async (
    status: "draft" | "published" | "scheduled",
    scheduledAt?: string
  ) => {
    if (!title.trim()) {
      setStatusMessage({ type: "error", text: "Please provide an article headline before saving." });
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    try {
      await performSave(status, scheduledAt);

      setLastSavedAt(new Date());
      setAutoSaveStatus("saved");

      const successMsg =
        status === "published"
          ? "Article published live to BitJunoo blog!"
          : status === "scheduled"
          ? "Article scheduled successfully!"
          : "Article saved as draft!";

      setStatusMessage({ type: "success", text: successMsg });

      // Navigate to articles list after publish / schedule
      if (status === "published" || status === "scheduled") {
        setTimeout(() => router.push("/articles"), 1400);
      }
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "An error occurred while saving.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Adapter for ArticleEditorSidebar's onPublish callback signature
  const handlePublish = (
    status: "Published" | "Draft" | "Scheduled",
    scheduledAt?: string
  ) => {
    const map: Record<string, "draft" | "published" | "scheduled"> = {
      Published: "published",
      Draft: "draft",
      Scheduled: "scheduled",
    };
    handleSave(map[status], scheduledAt);
  };

  if (isLoadingArticle) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-royal-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${isFullscreen ? "fixed inset-0 z-50 bg-slate-100 p-3 sm:p-4 overflow-y-auto" : ""}`}>
      {/* Toast Feedback */}
      {statusMessage && (
        <div
          className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300 shadow-md ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : "bg-rose-50 border-rose-300 text-rose-900"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          )}
          <span className="font-semibold">{statusMessage.text}</span>
        </div>
      )}

      {/* Main Grid: Left Editor + Right Meta Sidebar */}
      <div className="grid lg:grid-cols-12 gap-3 items-start">
        {/* Left Column: Title, Cover & Editor */}
        <div className={`${isFullscreen ? "lg:col-span-12" : "lg:col-span-8"} space-y-2.5`}>
          {/* Unified Article Metadata Card */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
            {/* Headline */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Article Headline
                </label>
                <span className="text-[10px] font-mono text-slate-400">
                  {title.length} / 120 chars
                </span>
              </div>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Architecting Sub-Second Distributed Consensus in Next.js 16 & .NET 9"
                className="w-full px-3 py-2 sm:py-2.5 text-base sm:text-lg font-extrabold font-heading rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue text-slate-900 placeholder:text-slate-300 placeholder:font-normal transition-all"
              />
            </div>

            {/* Permalink / Slug bar */}
            <div className="flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
              <span className="font-mono text-slate-400 font-medium text-[11px]">
                bitjunoo.com/blog/
              </span>
              <input
                type="text"
                value={slug}
                readOnly={!isSlugCustom}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setIsSlugCustom(true);
                }}
                className={`flex-1 font-mono text-xs font-semibold px-2 py-0.5 rounded border transition-all ${
                  isSlugCustom
                    ? "bg-white text-royal-blue border-royal-blue/30 focus:outline-none focus:ring-1 focus:ring-royal-blue"
                    : "bg-slate-100 text-slate-700 border-transparent cursor-default"
                }`}
              />
              <button
                type="button"
                onClick={() => setIsSlugCustom(!isSlugCustom)}
                className="p-1 rounded text-slate-500 hover:text-royal-blue hover:bg-slate-200/70 transition-colors cursor-pointer"
                title={isSlugCustom ? "Lock Slug" : "Edit Custom Slug"}
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 text-[10px] font-semibold transition-colors cursor-pointer"
                title="Copy Article URL"
              >
                {copiedSlug ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Excerpt + Cover Banner Side-by-Side */}
            <div className="grid md:grid-cols-12 gap-2.5 pt-0.5 items-start">
              {/* Subtitle / Excerpt Input */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Summary &amp; SEO Excerpt
                </label>
                <textarea
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Write a concise, engaging summary for article cards and Google search results..."
                  className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-800 placeholder:text-slate-400 resize-none min-h-[84px]"
                />
              </div>

              {/* Featured Cover Banner */}
              <div className="md:col-span-5 flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5 text-royal-blue" />
                    Cover Banner
                  </span>
                  {coverUrl && (
                    <button
                      type="button"
                      onClick={() => { setCoverUrl(""); setCoverPublicId(""); }}
                      className="inline-flex items-center gap-1 text-[10px] text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                {coverUrl ? (
                  <div className="relative group rounded-lg overflow-hidden border border-slate-200 h-[84px] shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverUrl}
                      alt="Cover preview"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white text-slate-900 text-[11px] font-bold shadow-md hover:bg-slate-100 cursor-pointer">
                        <Upload className="w-3 h-3 text-royal-blue" />
                        <span>Replace</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleCoverUpload}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-2 p-2 rounded-lg border-2 border-dashed border-slate-200 hover:border-royal-blue/40 bg-slate-50/50 transition-all h-[84px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-royal-blue/10 text-royal-blue flex items-center justify-center shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-slate-800 truncate">
                          Upload banner
                        </p>
                        <p className="text-[9px] text-slate-400 truncate">
                          1920x1080 (16:9)
                        </p>
                      </div>
                    </div>
                    <label className="px-2.5 py-1 rounded-md bg-royal-blue hover:bg-royal-blue/90 text-white font-bold text-[10px] shadow-2xs cursor-pointer shrink-0 transition-all">
                      <span>Browse</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverUpload}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Complete Editorial Editor Canvas */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
            {/* Rich Toolbar */}
            <EditorToolbar
              onFormat={formatSelection}
              onApplyHeading={handleApplyHeading}
              onApplyColor={handleApplyColor}
              onApplyHighlight={handleApplyHighlight}
              onApplyAlignment={handleApplyAlignment}
              onOpenImageModal={() => setIsImageModalOpen(true)}
              onOpenLinkModal={handleOpenLinkModal}
              onOpenTableModal={() => setIsTableModalOpen(true)}
              onOpenSnippetsModal={() => setIsSnippetsModalOpen(true)}
              onUndo={handleUndo}
              onRedo={handleRedo}
              canUndo={historyIndex > 0}
              canRedo={historyIndex < history.length - 1}
              viewMode={viewMode}
              onChangeViewMode={setViewMode}
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            />

            {/* Split View: Dual Pane */}
            {viewMode === "split" && (
              <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 min-h-[500px]">
                <div className="p-3.5 sm:p-4 flex flex-col bg-white">
                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => updateContentWithHistory(e.target.value)}
                    placeholder="Write your article content using Markdown or HTML..."
                    className="w-full h-full min-h-[460px] font-mono text-xs sm:text-sm text-slate-800 leading-relaxed focus:outline-none resize-none bg-transparent"
                  />
                </div>
                <div className="p-3.5 sm:p-5 bg-slate-50/50 overflow-y-auto max-h-[700px]">
                  <PreviewRenderer
                    content={content}
                    title={title}
                    category={category}
                    readTime={readTime}
                    authorName={author}
                  />
                </div>
              </div>
            )}

            {/* Write Focus View */}
            {viewMode === "write" && (
              <div className="p-4 sm:p-6 min-h-[500px] bg-white">
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => updateContentWithHistory(e.target.value)}
                  placeholder="Draft your in-depth publication here..."
                  className="w-full h-full min-h-[460px] font-mono text-sm sm:text-base text-slate-800 leading-relaxed focus:outline-none resize-y bg-transparent"
                />
              </div>
            )}

            {/* Preview Only View */}
            {viewMode === "preview" && (
              <div className="p-4 sm:p-6 bg-slate-50/70 min-h-[500px]">
                <PreviewRenderer
                  content={content}
                  title={title}
                  coverUrl={coverUrl}
                  category={category}
                  readTime={readTime}
                  authorName={author}
                />
              </div>
            )}

            {/* Bottom Status Ribbon */}
            <div className="px-4 py-2 bg-slate-50/90 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                {autoSaveStatus === "saving" && (
                  <span className="flex items-center gap-1.5 font-medium text-amber-600">
                    <Cloud className="w-3.5 h-3.5 animate-pulse" />
                    Saving...
                  </span>
                )}
                {autoSaveStatus === "saved" && lastSavedAt && (
                  <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                    <Cloud className="w-3.5 h-3.5" />
                    Saved {lastSavedAt.toLocaleTimeString()}
                  </span>
                )}
                {autoSaveStatus === "error" && (
                  <span className="flex items-center gap-1.5 font-medium text-rose-600">
                    <CloudOff className="w-3.5 h-3.5" />
                    Auto-save failed
                  </span>
                )}
                {autoSaveStatus === "idle" && (
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Cloud className="w-3.5 h-3.5" />
                    Cloud draft
                  </span>
                )}
                <span className="text-slate-300">•</span>
                <span className="font-mono text-[11px]">
                  {content.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span>Markdown + HTML enabled</span>
                <span>•</span>
                <span>UTF-8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial & Publishing Sidebar */}
        {!isFullscreen && (
          <ArticleEditorSidebar
            className="lg:col-span-4"
            title={title}
            slug={slug}
            excerpt={excerpt}
            content={content}
            coverUrl={coverUrl}
            category={category}
            setCategory={setCategory}
            readTime={readTime}
            setReadTime={setReadTime}
            level={level}
            setLevel={setLevel}
            author={author}
            setAuthor={setAuthor}
            tags={tags}
            setTags={setTags}
            onPublish={handlePublish}
            isSaving={isSaving}
          />
        )}
      </div>

      {/* Media & Formatting Modals */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onInsertImage={(markup) => updateContentWithHistory(content + markup)}
      />

      <LinkModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        onInsertLink={(markup) => updateContentWithHistory(content + markup)}
        defaultText={selectedTextForLink}
      />

      <TableModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        onInsertTable={(markup) => updateContentWithHistory(content + markup)}
      />

      <CodeSnippetsModal
        isOpen={isSnippetsModalOpen}
        onClose={() => setIsSnippetsModalOpen(false)}
        onInsertSnippet={(markup) => updateContentWithHistory(content + markup)}
      />
    </div>
  );
}
