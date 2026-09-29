"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Save,
  Send,
  Calendar,
  Image as ImageIcon,
  Tag,
  Eye,
  CheckCircle2,
  Sparkles,
  Bold,
  Italic,
  Code,
  Link as LinkIcon,
  List,
  Heading,
  Quote,
  ArrowLeft,
} from "lucide-react";

export default function ArticleEditor() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Backend & Systems");
  const [readTime, setReadTime] = useState("8 min read");
  const [level, setLevel] = useState("Senior / Architect");
  const [coverUrl, setCoverUrl] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState(
    "## Architectural Overview\n\nModern high-concurrency systems demand deterministic latencies and automated failover guarantees...\n\n```csharp\n// Sample High-Throughput gRPC Channel Configuration\nvar channel = GrpcChannel.ForAddress(\"https://cluster-01.bitjunoo.internal\", new GrpcChannelOptions {\n    HttpHandler = new SocketsHttpHandler {\n        EnableMultipleHttp2Connections = true,\n        KeepAlivePingDelay = TimeSpan.FromSeconds(60)\n    }\n});\n```\n\n### Key Performance Benchmarks\n\n- Sub-second P99 latencies under 50k req/sec\n- Zero cold-start container spin-up"
  );
  const [tags, setTags] = useState<string[]>(["Next.js 16", ".NET 9", "Cloud Microservices"]);
  const [newTag, setNewTag] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag("");
    }
  };

  const handlePublish = (status: "Draft" | "Published") => {
    if (!title.trim()) {
      alert("Please provide an article headline before proceeding.");
      return;
    }
    setStatusMessage(status === "Published" ? "Article successfully published to live blog!" : "Draft successfully saved!");
    setTimeout(() => {
      router.push("/articles");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {statusMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2.5 animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Main Grid: Left Editor + Right Meta Sidebar */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Title & Content Area */}
        <div className="lg:col-span-8 space-y-5">
          {/* Title and Slug */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Article Headline
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Architecting Sub-Second Distributed Consensus in Next.js 16 & .NET 9"
                className="w-full px-4 py-2.5 text-base sm:text-lg font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue text-slate-900 placeholder:text-slate-400 placeholder:font-normal"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono">bitjunoo.com/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="article-slug-preview"
                className="flex-1 font-mono text-xs text-royal-blue px-2 py-1 rounded bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Editor Card with Formatting Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="p-3 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setContent(content + " **bold text**")}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setContent(content + " *italic text*")}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setContent(content + "\n## Section Heading\n")}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Heading"
                >
                  <Heading className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-slate-300 mx-1" />
                <button
                  type="button"
                  onClick={() => setContent(content + " `inline code`")}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Inline Code"
                >
                  <Code className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setContent(content + "\n- Bullet item\n- Bullet item")}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setContent(content + "\n> Architectural quote note\n")}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Quote"
                >
                  <Quote className="w-4 h-4" />
                </button>
              </div>

              {/* Mode Toggle */}
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  previewMode
                    ? "bg-royal-blue text-white"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{previewMode ? "Edit Raw" : "Live Preview"}</span>
              </button>
            </div>

            {/* Content Area */}
            {previewMode ? (
              <div className="p-6 prose prose-slate max-w-none min-h-[380px] bg-slate-50/50">
                <div className="whitespace-pre-wrap font-sans text-sm text-slate-800 leading-relaxed">
                  {content}
                </div>
              </div>
            ) : (
              <textarea
                rows={16}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Draft your in-depth technical analysis, architecture diagrams, and benchmark data here using Markdown..."
                className="w-full p-5 text-sm font-mono text-slate-800 focus:outline-none focus:bg-slate-50/30 transition-all resize-y"
              />
            )}
          </div>
        </div>

        {/* Right Column: Publishing Controls & SEO Metadata */}
        <div className="lg:col-span-4 space-y-5">
          {/* Action Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-royal-blue" />
              <span>Publishing Controls</span>
            </h3>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handlePublish("Published")}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-royal-blue to-purple hover:from-royal-blue/90 hover:to-purple/90 text-white font-bold text-xs sm:text-sm shadow-md shadow-royal-blue/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Publish to Live Blog</span>
              </button>

              <button
                type="button"
                onClick={() => handlePublish("Draft")}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4 text-slate-400" />
                <span>Save Draft</span>
              </button>
            </div>
          </div>

          {/* Taxonomy & Properties */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-slate-900">
              Taxonomy & Categorization
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Primary Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900 cursor-pointer"
              >
                <option value="Backend & Systems">Backend & Systems</option>
                <option value="Frontend Architecture">Frontend Architecture</option>
                <option value="AI & Agents">AI & Agents</option>
                <option value="Cloud & DevOps">Cloud & DevOps</option>
                <option value="Mobile Systems">Mobile Systems</option>
                <option value="Data & AI">Data & AI</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Read Time
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Level
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-800"
                >
                  <option value="Architect">Architect</option>
                  <option value="Senior Staff">Senior Staff</option>
                  <option value="All Engineers">All Engineers</option>
                </select>
              </div>
            </div>

            {/* Tags Cloud Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Topic Tags (Press Enter)
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-royal-blue/10 text-royal-blue border border-royal-blue/20"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => setTags(tags.filter((item) => item !== t))}
                      className="hover:text-red-500 cursor-pointer"
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
                placeholder="Type tag and hit Enter..."
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
              />
            </div>
          </div>

          {/* SEO Excerpt Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="font-heading font-bold text-sm text-slate-900">
              SEO Summary & Excerpt
            </h3>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Provide a compelling 150-character summary for Google SERP and Twitter cards..."
              className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
