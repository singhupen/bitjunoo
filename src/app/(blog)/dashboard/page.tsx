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
  FileCheck,
  Users,
  TrendingUp,
} from "lucide-react";
import Article from "@/models/Article";
import "@/models/User";
import "@/lib/db";

export const metadata: Metadata = {
  title: "Editorial Command Center | BitJunoo Console",
  description: "High-level overview of readership metrics, active drafts, and publishing pipelines.",
};

export const revalidate = 30; // 30s revalidation for dashboard metrics

export default async function DashboardPage() {
  // Query real dashboard metrics
  const [
    publishedCount,
    inReviewCount,
    draftsCount,
    viewsAggregation,
    readTimeAggregation,
    recentArticlesDocs,
  ] = await Promise.all([
    Article.countDocuments({ status: "published" }),
    Article.countDocuments({ status: "in_review" }),
    Article.countDocuments({ status: "draft" }),
    Article.aggregate([
      { $match: { status: "published" } },
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]),
    Article.aggregate([
      { $match: { status: "published" } },
      { $group: { _id: null, avgReadTime: { $avg: "$readTime" } } },
    ]),
    Article.find({ status: "published" })
      .populate("author", "name avatar")
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  const totalViews = viewsAggregation[0]?.totalViews ?? 0;
  const avgReadTimeMinutes = Math.round(readTimeAggregation[0]?.avgReadTime ?? 5);

  const dynamicStats = [
    {
      title: "Live Published Articles",
      value: publishedCount.toLocaleString(),
      change: `${draftsCount} working drafts`,
      trend: "up",
      icon: FileText,
      accent: "text-royal-blue bg-blue-50 dark:bg-royal-blue/10 border-blue-100 dark:border-royal-blue/20",
      glow: "group-hover:border-royal-blue/30",
    },
    {
      title: "In Review Queue",
      value: inReviewCount.toString(),
      change: inReviewCount > 0 ? "Awaiting approval" : "Queue clear",
      trend: "up",
      icon: FileCheck,
      accent: "text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-800/40",
      glow: "group-hover:border-purple-300",
    },
    {
      title: "Total Readers Reached",
      value: totalViews.toLocaleString(),
      change: "Lifetime technical views",
      trend: "up",
      icon: Users,
      accent: "text-brand-azure bg-blue-50 dark:bg-brand-azure/10 border-blue-100 dark:border-brand-azure/20",
      glow: "group-hover:border-brand-azure/30",
    },
    {
      title: "Avg Read Duration",
      value: `${avgReadTimeMinutes} min`,
      change: "Benchmark metric",
      trend: "up",
      icon: Clock,
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
              DATABASE SYNC: ONLINE
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

      {/* Middle Row: Recent Publications Snapshot & Quick Shortcuts */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left: Recent Publications Card */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900/70 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-royal-blue" />
                  <span>Recent Live Publications</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Latest engineering dispatches currently active on the public blog
                </p>
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
              {recentArticlesDocs.length > 0 ? (
                recentArticlesDocs.map((item: any) => (
                  <div key={item._id.toString()} className="py-3 flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {item.category}
                      </span>
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 hover:text-royal-blue dark:hover:text-cyan-blue transition-colors">
                        <Link href={`/blog/${item.slug}`} target="_blank">
                          {item.title}
                        </Link>
                      </h4>
                    </div>

                    <div className="text-right whitespace-nowrap text-xs">
                      <div className="font-mono font-bold text-slate-900 dark:text-white">
                        {(item.views || 0).toLocaleString()} views
                      </div>
                      <div className="text-[10px] text-slate-400">{item.readTime || 5} min</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  No articles published live yet. Create and publish your first article!
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Want to inspect drafts or scheduled posts?</span>
            <Link
              href="/articles"
              className="font-bold text-royal-blue dark:text-cyan-blue hover:underline"
            >
              Open Articles Manager &rarr;
            </Link>
          </div>
        </div>

        {/* Right: Editorial Quick Jump Portals */}
        <div className="lg:col-span-5 space-y-4">
          <Link
            href="/review"
            className="block p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-brand-azure/5 to-transparent border border-purple-200 dark:border-purple-900/60 shadow-2xs hover:border-purple-400 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Editorial Queue
              </span>
              <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              Peer Review Submissions ({inReviewCount})
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Inspect articles submitted by authors, approve for live release, or provide feedback.
            </p>
          </Link>

          <Link
            href="/users"
            className="block p-5 rounded-2xl bg-gradient-to-br from-royal-blue/10 via-brand-azure/5 to-transparent border border-royal-blue/20 dark:border-royal-blue/30 shadow-2xs hover:border-royal-blue/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-royal-blue uppercase tracking-wider">
                Access Control
              </span>
              <ArrowRight className="w-4 h-4 text-royal-blue group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              Manage Author Permissions
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Approve pending accounts, toggle publishing rights, and grant category permissions.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
