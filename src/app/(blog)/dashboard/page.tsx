import { Metadata } from "next";
import Link from "next/link";
import DashboardStats from "@/components/dashboard/DashboardStats";
import {
  Sparkles,
  ArrowRight,
  FileText,
  BarChart3,
  Plus,
  ExternalLink,
  CheckCircle2,
  Clock,
  Layers,
  Tags,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Command Center | BitJunoo Console",
  description: "High-level overview of readership metrics, active drafts, and publishing pipelines.",
};

import { getArticles } from "@/services/article.service";
import { Users, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const result = await getArticles({ limit: 5 });
  const recentArticles = result.articles.map((article: any) => ({
    id: article._id.toString(),
    title: article.title,
    category: article.category,
    status: article.status ? article.status.charAt(0).toUpperCase() + article.status.slice(1) : "Draft",
    views: article.views?.toLocaleString() || "0",
    readTime: `${article.readTime || 5} min`,
  }));

  const totalViews = result.articles.reduce((acc: number, curr: any) => acc + (curr.views || 0), 0);

  const dynamicStats = [
    {
      title: "Published Articles",
      value: result.total.toString(),
      change: "Lifetime total",
      trend: "up",
      icon: FileText,
      accent: "text-royal-blue bg-blue-50 dark:bg-royal-blue/10 border-blue-100 dark:border-royal-blue/20",
      glow: "group-hover:border-royal-blue/30",
    },
    {
      title: "Total Readers",
      value: totalViews.toLocaleString(),
      change: "Lifetime views",
      trend: "up",
      icon: Users,
      accent: "text-brand-azure bg-blue-50 dark:bg-brand-azure/10 border-blue-100 dark:border-brand-azure/20",
      glow: "group-hover:border-brand-azure/30",
    },
    {
      title: "Average Read Duration",
      value: "4m 32s",
      change: "Estimated",
      trend: "up",
      icon: Clock,
      accent: "text-royal-blue dark:text-cyan-blue bg-cyan-50 dark:bg-cyan-blue/10 border-cyan-100 dark:border-cyan-blue/20",
      glow: "group-hover:border-cyan-blue/30",
    },
    {
      title: "System Status",
      value: "Online",
      change: "All services running",
      trend: "up",
      icon: TrendingUp,
      accent: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-800/40",
      glow: "group-hover:border-emerald-300",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-royal-blue" />
              <span>COMMAND OVERVIEW</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              CLUSTER: US-EAST ACTIVE
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Editorial Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Executive overview of digital engineering publications, reader growth, and delivery pipelines.
          </p>
        </div>

        {/* Quick Route Actions */}
        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
          >
            <span>Live Blog</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <Link
            href="/add-articles"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan text-white text-xs font-bold shadow-md shadow-royal-blue/25 hover:shadow-lg transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Article</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <DashboardStats stats={dynamicStats} />

      {/* Middle Row: Recent Publications Snapshot & Audience Snapshot */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left: Recent Publications Card */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900/70 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-royal-blue" />
                  <span>Recent Publications</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Latest live technical dispatches</p>
              </div>

              <Link
                href="/articles"
                className="inline-flex items-center gap-1 text-xs font-bold text-royal-blue dark:text-cyan-blue hover:underline"
              >
                <span>All Articles</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentArticles.length > 0 ? recentArticles.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.category}
                    </span>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 hover:text-royal-blue dark:hover:text-cyan-blue transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  <div className="text-right whitespace-nowrap text-xs">
                    <div className="font-mono font-bold text-slate-900 dark:text-white">{item.views}</div>
                    <div className="text-[10px] text-slate-400">{item.readTime}</div>
                  </div>
                </div>
              )) : (
                <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  No articles published yet.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Need to manage drafts or review queues?</span>
            <Link
              href="/articles"
              className="font-bold text-royal-blue dark:text-cyan-blue hover:underline"
            >
              Open Articles Manager &rarr;
            </Link>
          </div>
        </div>

        {/* Right: Quick Analytics & Traffic Channels Snapshot */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900/70 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-brand-azure" />
                  <span>Audience Channels</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Where engineers discover content</p>
              </div>

              <Link
                href="/analytics"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-azure dark:text-cyan-blue hover:underline"
              >
                <span>Deep Analytics</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { label: "Organic Search", pct: 48, color: "bg-royal-blue" },
                { label: "Direct Bookmarks", pct: 24, color: "bg-brand-azure" },
                { label: "Developer Communities", pct: 16, color: "bg-brand-cyan" },
                { label: "Engineering Socials", pct: 12, color: "bg-emerald-500" },
              ].map((c) => (
                <div key={c.label}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600 dark:text-slate-400">{c.label}</span>
                    <span className="font-mono text-slate-900 dark:text-white">{c.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Full reader demographics available</span>
            <Link
              href="/analytics"
              className="font-bold text-brand-azure dark:text-cyan-blue hover:underline"
            >
              View Full Report &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Quick Jump Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/add-articles"
          className="p-4 rounded-2xl bg-gradient-to-br from-royal-blue/10 to-royal-blue/5 dark:from-royal-blue/20 dark:to-royal-blue/5 border border-royal-blue/20 hover:border-royal-blue/40 shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-royal-blue uppercase tracking-wider">Composer</span>
            <ArrowRight className="w-4 h-4 text-royal-blue group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            Write New Technical Deep Dive
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Markdown editor with live preview and code snippet formatting.
          </p>
        </Link>

        <Link
          href="/categories"
          className="p-4 rounded-2xl bg-gradient-to-br from-brand-azure/10 to-brand-azure/5 dark:from-brand-azure/20 dark:to-brand-azure/5 border border-brand-azure/20 hover:border-brand-azure/40 shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-brand-azure uppercase tracking-wider">Taxonomy</span>
            <ArrowRight className="w-4 h-4 text-brand-azure group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            Manage Domains & Tags
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Structure your knowledge base across 6 core technical domains.
          </p>
        </Link>

        <Link
          href="/settings"
          className="p-4 rounded-2xl bg-gradient-to-br from-brand-cyan/10 to-brand-cyan/5 dark:from-brand-cyan/20 dark:to-brand-cyan/5 border border-brand-cyan/20 hover:border-brand-cyan/40 shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-royal-blue dark:text-cyan-blue uppercase tracking-wider">Settings</span>
            <ArrowRight className="w-4 h-4 text-royal-blue dark:text-cyan-blue group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            Configure Editorial Rules
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Set up peer reviews, RSS syndication, and SEO parameters.
          </p>
        </Link>
      </div>
    </div>
  );
}
