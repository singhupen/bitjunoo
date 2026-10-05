"use client";

import { useState } from "react";
import {
  Sparkles,
  Send,
  CheckCircle2,
  TrendingUp,
  Tag,
  Radio,
  Server,
  Zap,
} from "lucide-react";

const trendingTags = [
  { name: ".NET 9 Microservices", count: "34.2k reads" },
  { name: "Next.js 16 Edge", count: "29.8k reads" },
  { name: "Autonomous LLM Agents", count: "48.5k reads" },
  { name: "pgvector Indexing", count: "21.0k reads" },
  { name: "Kubernetes Istio", count: "16.4k reads" },
  { name: "React 19 Server Actions", count: "38.1k reads" },
];

export default function QuickDraftWidget() {
  const [draftTitle, setDraftTitle] = useState("");
  const [draftCategory, setDraftCategory] = useState("Backend & Systems");
  const [draftNotes, setDraftNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle) return;

    setSaved(true);
    setTimeout(() => {
      setDraftTitle("");
      setDraftNotes("");
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Left: Quick Draft Jotter */}
      <div id="new-draft-section" className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-royal-blue/10 dark:bg-royal-blue/20 text-royal-blue dark:text-cyan-blue border border-royal-blue/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                Quick Editorial Jotter
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">Autosave Enabled</span>
          </div>

          {saved && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Draft outline captured and queued for technical review!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Working Headline
              </label>
              <input
                type="text"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="e.g. Distributed Consensus in Mission-Critical Systems..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue text-slate-900"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Domain
                </label>
                <select
                  value={draftCategory}
                  onChange={(e) => setDraftCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue text-slate-900 cursor-pointer"
                >
                  <option value="Backend & Systems">Backend & Systems</option>
                  <option value="Frontend Architecture">Frontend Architecture</option>
                  <option value="AI & Agents">AI & Agents</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Mobile Engineering">Mobile Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Publication Date
                </label>
                <input
                  type="date"
                  defaultValue="2026-10-15"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue text-slate-900 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Key Technical Takeaways / Code Snippets Outline
              </label>
              <textarea
                rows={3}
                value={draftNotes}
                onChange={(e) => setDraftNotes(e.target.value)}
                placeholder="Outline benchmark findings, architectural diagrams to produce, or key repository commits..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue text-slate-900 resize-none"
              />
            </div>

            <div className="pt-1 flex items-center justify-end">
              <button
                type="submit"
                disabled={!draftTitle}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save to Drafts Queue</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right: Trending Topics & System Health */}
      <div className="lg:col-span-5 space-y-6">
        {/* Trending Topics Cloud */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-blue" />
              High-Velocity Reader Topics
            </h3>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              Active
            </span>
          </div>

          <div className="space-y-2">
            {trendingTags.map((tag) => (
              <div
                key={tag.name}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-100 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Tag className="w-3.5 h-3.5 text-royal-blue" />
                  <span>{tag.name}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">{tag.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Publication Platform Health */}
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 text-white rounded-2xl border border-slate-800 p-5 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-blue flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              Content Delivery CDN Status
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">ALL SYSTEMS NOMINAL</span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
            <div>
              <div className="text-base font-bold font-mono text-white">99.98%</div>
              <div className="text-[10px] text-slate-400">Global Uptime</div>
            </div>
            <div>
              <div className="text-base font-bold font-mono text-cyan-blue">48ms</div>
              <div className="text-[10px] text-slate-400">Edge TTFB</div>
            </div>
            <div>
              <div className="text-base font-bold font-mono text-brand-azure">94.8%</div>
              <div className="text-[10px] text-slate-400">Cache Hit Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
