import { Metadata } from "next";
import Link from "next/link";
import ArticleEditor from "@/components/dashboard/ArticleEditor";
import {
  Sparkles,
  ChevronRight,
  BookOpen,
  ArrowLeft,
  Compass,
  FileText,
  Command,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Create Article | BitJunoo Editorial Console",
  description:
    "Compose, format, and publish enterprise software engineering deep dives, system benchmarks, and production architecture guides.",
};

export default function AddArticlesPage() {
  return (
    <div className="space-y-6 pb-12 max-w-[1520px] mx-auto animate-in fade-in duration-300">
      {/* Top Header & Breadcrumbs Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/90">
        <div>
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-2.5">
            <Link
              href="/dashboard"
              className="hover:text-royal-blue transition-colors flex items-center gap-1"
            >
              <span>Dashboard</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              href="/articles"
              className="hover:text-royal-blue transition-colors"
            >
              <span>Editorial</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-royal-blue font-semibold">New Publication</span>
          </nav>

          {/* Heading */}
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Create New Publication
            </h1>
            <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-royal-blue/10 to-purple/10 border border-royal-blue/20 text-royal-blue text-[11px] font-bold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-royal-blue" />
              <span>Studio Pro</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Compose architecture teardowns, high-throughput benchmarks, and cloud deployment guides with real-time markdown & HTML visual preview.
          </p>
        </div>

        {/* Header Quick Actions / Shortcuts Pill */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200/80 text-xs text-slate-600 font-medium">
            <Command className="w-3.5 h-3.5 text-royal-blue" />
            <span>Shortcuts:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono font-bold shadow-xs">Ctrl+B</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono font-bold shadow-xs">Ctrl+I</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono font-bold shadow-xs">Ctrl+S</kbd>
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Articles List</span>
          </Link>
        </div>
      </div>

      {/* Main Orchestrated Editor Component */}
      <ArticleEditor />
    </div>
  );
}
