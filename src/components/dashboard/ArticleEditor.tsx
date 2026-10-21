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
  Sparkles,
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

  // User permission & identity state
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [canPublish, setCanPublish] = useState(false);

  // Document state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugCustom, setIsSlugCustom] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [coverPublicId, setCoverPublicId] = useState("");
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [category, setCategory] = useState("Uncategorized");
  const [readTime, setReadTime] = useState("5 min read");
  const [level, setLevel] = useState("All Engineers");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [articleStatus, setArticleStatus] = useState<string>("draft");
  const [reviewNote, setReviewNote] = useState<string | undefined>(undefined);

  // Dirty flag to ensure autosave only runs when user makes actual modifications
  const [isDirty, setIsDirty] = useState(false);

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

  // Current saved article ID
  const [savedArticleId, setSavedArticleId] = useState<string | null>(articleId ?? null);

  // Modals state
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isSnippetsModalOpen, setIsSnippetsModalOpen] = useState(false);
  const [selectedTextForLink, setSelectedTextForLink] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── 1. Fetch current user session & permissions ──────────────────────────────
  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await authFetch("/api/auth/me");
        if (res.ok) {
          const json = await res.json();
          const u = json.data;
          setCurrentUser(u);
          setIsAdmin(u.role === "admin");
          setCanPublish(u.role === "admin" || Boolean(u.permissions?.canPublish));
          if (!author) setAuthor(u.name || "You");
        }
      } catch {
        // ignore
      }
    }
    fetchMe();
  }, []);

  // ── 2. Load article if in edit mode ──────────────────────────────────────────
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
          setLevel(a.level ?? "All Engineers");
          setArticleStatus(a.status ?? "draft");
          setReviewNote(a.reviewNote);

          if (a.author?.name) setAuthor(a.author.name);
          if (a.coverImage?.url) setCoverUrl(a.coverImage.url);
          if (a.coverImage?.publicId) setCoverPublicId(a.coverImage.publicId);

          setIsSlugCustom(true);
          setHistory([a.content ?? ""]);
          setHistoryIndex(0);
          setIsDirty(false); // Clean initial load
        } else {
          setStatusMessage({
            type: "error",
            text: "Failed to load article. It may not exist or you lack permission.",
          });
        }
      } catch {
        setStatusMessage({ type: "error", text: "Network error while loading article." });
      } finally {
        setIsLoadingArticle(false);
      }
    }
    loadArticle();
  }, [articleId]);

  // Handle title edit
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setIsDirty(true);
    if (!isSlugCustom) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  };

  // Push new state into history stack
  const updateContentWithHistory = useCallback(
    (newContent: string) => {
      setContent(newContent);
      setIsDirty(true);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newContent);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex]
  );

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
      setIsDirty(true);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
      setIsDirty(true);
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

  // Keyboard shortcut handler
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

  // ── 3. Autosave Engine (C3 Fix) ──────────────────────────────────────────────
  // Only runs if isDirty=true, title is populated, and loading is finished.
  // PRESERVES live article status (does not revert published articles to draft).
  useEffect(() => {
    if (!isDirty || !title.trim() || isLoadingArticle) return;

    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    autoSaveTimerRef.current = setTimeout(async () => {
      if (!title.trim()) return;
      try {
        setAutoSaveStatus("saving");
        // Maintain current status during silent autosave
        const saveStatus =
          articleStatus === "published"
            ? "published"
            : articleStatus === "in_review"
            ? "in_review"
            : "draft";

        await performSave(saveStatus, undefined, true); // true = isAutosave
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
  }, [title, content, excerpt, category, tags, level]);

  // Copy article link
  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/blog/${slug || "new-article"}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  // ── 4. Cover Image Cloudinary Upload (H6 Fix) ────────────────────────────────
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WEBP, GIF).");
      return;
    }

    setIsUploadingCover(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      try {
        const res = await authFetch("/api/upload", {
          method: "POST",
          body: JSON.stringify({ source: dataUrl, folder: "bitjunoo/covers" }),
        });
        const json = await res.json();
        if (json.success && json.data?.url) {
          setCoverUrl(json.data.url);
          setCoverPublicId(json.data.publicId || "");
        } else {
          setCoverUrl(dataUrl);
        }
      } catch {
        setCoverUrl(dataUrl);
      } finally {
        setIsUploadingCover(false);
        setIsDirty(true);
      }
    };
    reader.readAsDataURL(file);
  };

  // ── 5. Core Save & Action API Call ──────────────────────────────────────────
  const performSave = async (
    status: "draft" | "in_review" | "published" | "scheduled",
    scheduledAt?: string,
    isAutosave: boolean = false
  ): Promise<void> => {
    const payload: Record<string, unknown> = {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      readTime: parseInt(readTime) || 5,
      level,
      status,
      isAutosave,
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
      const json = await res.json();
      if (json.data?.status) setArticleStatus(json.data.status);
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
      if (json.data?._id) {
        setSavedArticleId(json.data._id);
        if (json.data.status) setArticleStatus(json.data.status);
      }
    }
  };

  // ── 6. Explicit User Save / Publish / Submit Handler ────────────────────────
  const handleSave = async (
    status: "draft" | "in_review" | "published" | "scheduled",
    scheduledAt?: string
  ) => {
    if (!title.trim()) {
      setStatusMessage({ type: "error", text: "Please enter an article headline before saving." });
      return;
    }

    // Cancel any pending debounced autosave timer immediately
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    setIsSaving(true);
    setStatusMessage(null);

    try {
      await performSave(status, scheduledAt, false);

      setLastSavedAt(new Date());
      setAutoSaveStatus("saved");
      setIsDirty(false);

      let successMsg = "Article saved as draft!";
      if (status === "published") successMsg = "Article published live to BitJunoo blog!";
      else if (status === "in_review") successMsg = "Article submitted for editorial review!";
      else if (status === "scheduled") successMsg = "Article scheduled for release!";

      setStatusMessage({ type: "success", text: successMsg });

      if (status === "published" || status === "scheduled" || status === "in_review") {
        setTimeout(() => router.push("/articles"), 1200);
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

  const handlePublish = (
    status: "Published" | "Draft" | "Scheduled" | "In_Review",
    scheduledAt?: string
  ) => {
    const map: Record<string, "draft" | "in_review" | "published" | "scheduled"> = {
      Published: "published",
      Draft: "draft",
      Scheduled: "scheduled",
      In_Review: "in_review",
    };
    handleSave(map[status], scheduledAt);
  };

  if (isLoadingArticle) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-royal-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500">Loading publication composer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-slate-950 p-4 overflow-y-auto" : ""}`}>
      {/* Save Status Notification Banner */}
      {statusMessage && (
        <div
          className={`mb-3 p-3 rounded-xl flex items-center justify-between text-xs font-semibold ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-slate-400 hover:text-slate-700 cursor-pointer font-bold"
          >
            &times;
          </button>
        </div>
      )}

      {/* Top Composer Control Bar */}
      <div className="bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                articleStatus === "published"
                  ? "bg-emerald-500"
                  : articleStatus === "in_review"
                  ? "bg-purple-500 animate-pulse"
                  : "bg-amber-500"
              }`}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {articleStatus.replace("_", " ")}
            </span>
          </div>

          {/* Autosave feedback */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-3">
            {autoSaveStatus === "saving" && (
              <>
                <Cloud className="w-3.5 h-3.5 text-royal-blue animate-pulse" />
                <span>Syncing draft...</span>
              </>
            )}
            {autoSaveStatus === "saved" && (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  Saved {lastSavedAt ? `at ${lastSavedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : ""}
                </span>
              </>
            )}
            {autoSaveStatus === "error" && (
              <>
                <CloudOff className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-rose-500">Draft sync failed</span>
              </>
            )}
          </div>
        </div>

        {/* Slug link & quick copy */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 font-mono">
            <span>/blog/{slug || "slug-preview"}</span>
            <button
              onClick={handleCopyLink}
              title="Copy URL"
              className="text-slate-400 hover:text-royal-blue cursor-pointer"
            >
              {copiedSlug ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>

      {/* Editor Grid: Main Column (Composer) + Right Column (Taxonomy & Actions) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
        {/* Left Column: Form & Content Canvas */}
        <div className="xl:col-span-8 space-y-3">
          {/* Article Title & Cover Image Box */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Article Headline (e.g. Architecting High-Throughput .NET 9 Microservices...)"
                className="w-full text-base sm:text-xl font-heading font-extrabold text-slate-950 dark:text-white placeholder:text-slate-400 focus:outline-none border-b border-transparent focus:border-royal-blue/30 pb-1 transition-colors"
              />
            </div>

            <div>
              <textarea
                value={excerpt}
                onChange={(e) => {
                  setExcerpt(e.target.value);
                  setIsDirty(true);
                }}
                rows={2}
                placeholder="Executive summary & SEO description (1-2 crisp sentences describing the technical problem and architectural solution)..."
                className="w-full text-xs sm:text-sm text-slate-600 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Cover Image Upload Area */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {coverUrl ? (
                  <div className="relative group w-16 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={coverUrl} alt="Cover preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => {
                        setCoverUrl("");
                        setCoverPublicId("");
                        setIsDirty(true);
                      }}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-10 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                )}

                <div>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-royal-blue/40 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer transition-colors shadow-2xs">
                    <Upload className="w-3.5 h-3.5 text-royal-blue" />
                    <span>{isUploadingCover ? "Uploading to Cloudinary..." : coverUrl ? "Change Cover Image" : "Upload Cloudinary Cover"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      disabled={isUploadingCover}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[10px] text-slate-400 mt-0.5">High-resolution Cloudinary CDN asset (1200x630px recommended)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Markdown Content Canvas */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
            {/* Toolbar */}
            <EditorToolbar
              viewMode={viewMode}
              onChangeViewMode={setViewMode}
              onFormat={formatSelection}
              onApplyHeading={handleApplyHeading}
              onApplyColor={handleApplyColor}
              onApplyHighlight={handleApplyHighlight}
              onApplyAlignment={handleApplyAlignment}
              onOpenLinkModal={() => {
                const textarea = textareaRef.current;
                if (textarea) {
                  setSelectedTextForLink(textarea.value.substring(textarea.selectionStart, textarea.selectionEnd));
                }
                setIsLinkModalOpen(true);
              }}
              onOpenImageModal={() => setIsImageModalOpen(true)}
              onOpenTableModal={() => setIsTableModalOpen(true)}
              onOpenSnippetsModal={() => setIsSnippetsModalOpen(true)}
              onUndo={handleUndo}
              onRedo={handleRedo}
              canUndo={historyIndex > 0}
              canRedo={historyIndex < history.length - 1}
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            />

            {/* Split / Edit / Preview Workspace */}
            <div className="min-h-[500px]">
              {viewMode === "split" && (
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
                  <div className="p-4 sm:p-5">
                    <textarea
                      ref={textareaRef}
                      value={content}
                      onChange={(e) => updateContentWithHistory(e.target.value)}
                      placeholder="Write your technical dispatch using Markdown, code blocks, and architecture callouts..."
                      className="w-full h-[620px] resize-none font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-transparent focus:outline-none leading-relaxed"
                    />
                  </div>
                  <div className="p-4 sm:p-5 h-[620px] overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50">
                    <PreviewRenderer
                      content={content}
                      title={title}
                      coverUrl={coverUrl}
                      category={category}
                      readTime={readTime}
                      authorName={author}
                    />
                  </div>
                </div>
              )}

              {viewMode === "write" && (
                <div className="p-4 sm:p-5">
                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => updateContentWithHistory(e.target.value)}
                    placeholder="Write your technical dispatch using Markdown..."
                    className="w-full h-[620px] resize-none font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-transparent focus:outline-none leading-relaxed"
                  />
                </div>
              )}

              {viewMode === "preview" && (
                <div className="p-5 sm:p-7 min-h-[620px] bg-slate-50/50 dark:bg-slate-950/50 overflow-y-auto">
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
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar (Lifecycle, Readiness Checklist, Taxonomy, Metadata) */}
        <div className="xl:col-span-4">
          <ArticleEditorSidebar
            title={title}
            slug={slug}
            excerpt={excerpt}
            content={content}
            coverUrl={coverUrl}
            category={category}
            setCategory={(c) => {
              setCategory(c);
              setIsDirty(true);
            }}
            readTime={readTime}
            setReadTime={(r) => {
              setReadTime(r);
              setIsDirty(true);
            }}
            level={level}
            setLevel={(lvl) => {
              setLevel(lvl);
              setIsDirty(true);
            }}
            author={author}
            tags={tags}
            setTags={(t) => {
              setTags(t);
              setIsDirty(true);
            }}
            onPublish={handlePublish}
            isSaving={isSaving}
            canPublish={canPublish}
            isAdmin={isAdmin}
            articleStatus={articleStatus}
            reviewNote={reviewNote}
          />
        </div>
      </div>

      {/* Formatting Modals */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onInsertImage={(imgTag) => formatSelection(`\n${imgTag}\n`, "")}
      />

      <LinkModal
        isOpen={isLinkModalOpen}
        defaultText={selectedTextForLink}
        onClose={() => setIsLinkModalOpen(false)}
        onInsertLink={(linkMarkdown) => formatSelection(linkMarkdown, "")}
      />

      <TableModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        onInsertTable={(tableMarkdown) => formatSelection(`\n${tableMarkdown}\n`, "")}
      />

      <CodeSnippetsModal
        isOpen={isSnippetsModalOpen}
        onClose={() => setIsSnippetsModalOpen(false)}
        onInsertSnippet={(snippet) => formatSelection(`\n${snippet}\n`, "")}
      />
    </div>
  );
}
