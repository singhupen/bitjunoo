import { Metadata } from "next";
import Link from "next/link";
import ArticleEditor from "@/components/dashboard/ArticleEditor";
import {
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Command,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Create Article | BitJunoo Editorial Console",
  description:
    "Compose, format, and publish enterprise software engineering deep dives, system benchmarks, and production architecture guides.",
};

interface Props {
  searchParams: Promise<{ edit?: string }>;
}

export default async function AddArticlesPage({ searchParams }: Props) {
  const params = await searchParams;
  const editId = params.edit ?? undefined;
  const isEditMode = Boolean(editId);

  return (
    <div className="space-y-2.5 pb-4 w-full animate-in fade-in duration-300">
      {/* Top Header & Breadcrumbs Section */}
      <header className="bg-white/85 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
        <div className="space-y-0.5">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <Link
              href="/dashboard"
              className="hover:text-royal-blue transition-colors flex items-center gap-1"
            >
              <span>Dashboard</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link
              href="/articles"
              className="hover:text-royal-blue transition-colors"
            >
              <span>Editorial</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-royal-blue font-semibold">
              {isEditMode ? "Edit Publication" : "New Publication"}
            </span>
          </nav>

          {/* Title & Studio Pro Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-heading text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight">
              {isEditMode ? "Edit Publication" : "Create New Publication"}
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-royal-blue/10 via-brand-azure/10 to-royal-blue/10 border border-royal-blue/20 text-royal-blue text-[10px] font-bold tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-2.5 h-2.5 text-royal-blue animate-pulse" />
              <span>Studio Pro</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-500 max-w-3xl leading-snug">
            {isEditMode
              ? "Update and republish your article — changes are automatically saved as drafts."
              : "Compose architecture teardowns, high-throughput benchmarks, and cloud deployment guides with real-time markdown & HTML visual preview."}
          </p>
        </div>

        {/* Quick Actions & Shortcut Indicators */}
        <div className="flex items-center gap-2 self-start lg:self-center shrink-0 pt-0.5 lg:pt-0">
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 text-[11px] text-slate-600 font-medium">
            <Command className="w-3 h-3 text-royal-blue" />
            <span className="text-slate-400">Shortcuts:</span>
            <kbd className="px-1 py-0.5 rounded bg-white text-[9px] font-mono font-bold shadow-2xs border border-slate-200/60">Ctrl+B</kbd>
            <kbd className="px-1 py-0.5 rounded bg-white text-[9px] font-mono font-bold shadow-2xs border border-slate-200/60">Ctrl+I</kbd>
            <kbd className="px-1 py-0.5 rounded bg-white text-[9px] font-mono font-bold shadow-2xs border border-slate-200/60">Ctrl+S</kbd>
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-all shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
            <span>Articles List</span>
          </Link>
        </div>
      </header>

      {/* Main Orchestrated Editor Component */}
      <ArticleEditor articleId={editId} />
    </div>
  );
}
