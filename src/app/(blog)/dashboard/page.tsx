import { Metadata } from "next";
import Link from "next/link";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentArticlesTable from "@/components/dashboard/RecentArticlesTable";
import QuickDraftWidget from "@/components/dashboard/QuickDraftWidget";
import { Sparkles, Download, Plus, ExternalLink, Activity, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Dashboard | BitJunoo Editorial & Technical Hub",
  description: "Monitor article metrics, manage technical drafts, and oversee high-scale software publications.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Welcome & Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-royal-blue" />
              <span>EDITORIAL OPERATIONS CONSOLE</span>
            </span>

            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              EDGE CLUSTER ONLINE
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Publication Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time analytics, readership retention, and draft pipeline for BitJunoo technical dispatches.
          </p>
        </div>

        {/* Top Header Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 self-start sm:self-center">
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <span>Live Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <a
            href="#new-draft-section"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-royal-blue via-deep-blue to-purple text-white text-xs font-bold shadow-md shadow-royal-blue/25 hover:shadow-lg hover:shadow-royal-blue/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Draft Article</span>
          </a>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <DashboardStats />

      {/* Publications & Drafts Table with Tabs */}
      <RecentArticlesTable />

      {/* Quick Draft Jotter & System Metrics */}
      <QuickDraftWidget />
    </div>
  );
}
