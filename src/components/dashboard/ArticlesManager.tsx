"use client";

import { useState, useEffect, useCallback } from "react";
import { authFetch } from "@/lib/api/apiClient";
import Link from "next/link";
import {
  FileText,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit2,
  Trash2,
  Download,
  RefreshCw,
  AlertCircle,
  LayoutList,
} from "lucide-react";

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: "published" | "draft" | "scheduled" | "archived";
  views: number;
  readTime: number;
  updatedAt: string;
  author: string;
}

const STATUS_TABS = [
  { key: "all", label: "All" },
  { key: "published", label: "Published" },
  { key: "draft", label: "Drafts" },
  { key: "scheduled", label: "Scheduled" },
];

function StatusBadge({ status }: { status: ArticleItem["status"] }) {
  switch (status) {
    case "published":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Published
        </span>
      );
    case "draft":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
          <FileText className="w-3 h-3 text-slate-500" />
          Draft
        </span>
      );
    case "scheduled":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-azure/10 text-brand-azure border border-brand-azure/20">
          <Clock className="w-3 h-3 text-brand-azure" />
          Scheduled
        </span>
      );
    case "archived":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
          <Clock className="w-3 h-3 text-amber-600" />
          Archived
        </span>
      );
  }
}

export default function ArticlesManager() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [stats, setStats] = useState({ drafts: 0, published: 0, scheduled: 0, total: 0 });

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch user's own articles only
      const params = new URLSearchParams({ mine: "true", limit: "100" });
      if (activeStatus !== "all") params.set("status", activeStatus);
      if (search) params.set("search", search);

      const res = await authFetch(`/api/articles?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch articles.");
      const json = await res.json();

      const mapped: ArticleItem[] = (json.data?.articles ?? []).map((a: Record<string, unknown>) => ({
        id: String(a._id),
        title: String(a.title),
        slug: String(a.slug),
        category: String(a.category ?? "Uncategorized"),
        status: String(a.status) as ArticleItem["status"],
        views: Number(a.views ?? 0),
        readTime: Number(a.readTime ?? 5),
        updatedAt: new Date(String(a.updatedAt ?? a.createdAt)).toLocaleDateString(),
        author: String((a.author as Record<string, string>)?.name ?? "You"),
      }));
      setArticles(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [activeStatus, search]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await authFetch("/api/articles/stats");
      if (res.ok) {
        const json = await res.json();
        setStats(json.data ?? stats);
      }
    } catch {
      // Non-critical
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats, articles]); // Refresh stats when articles change

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete article "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await authFetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
        fetchStats();
      } else {
        const json = await res.json().catch(() => ({}));
        alert(json.message ?? "Failed to delete article.");
      }
    } catch {
      alert("An error occurred while deleting the article.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: stats.total, color: "text-slate-900", bg: "bg-slate-50", border: "border-slate-200" },
          { label: "Published", value: stats.published, color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
          { label: "Drafts", value: stats.drafts, color: "text-slate-700 dark:text-slate-300", bg: "bg-slate-100 dark:bg-slate-800", border: "border-slate-200 dark:border-slate-700" },
          { label: "Scheduled", value: stats.scheduled, color: "text-brand-azure", bg: "bg-brand-azure/5 dark:bg-brand-azure/10", border: "border-brand-azure/20" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl p-3 text-center`}>
            <span className={`block font-heading font-black text-xl ${s.color}`}>{s.value}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your articles by title..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue text-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold gap-0.5">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveStatus(tab.key)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeStatus === tab.key
                    ? "bg-white text-royal-blue shadow-sm font-bold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={fetchArticles}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <Link
            href="/add-articles"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan text-white text-xs font-bold shadow-md shadow-royal-blue/25 hover:shadow-lg hover:shadow-royal-blue/35 transition-all whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Article</span>
          </Link>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <LayoutList className="w-3.5 h-3.5" />
            <span>
              Showing <strong className="text-slate-800 font-semibold">{articles.length}</strong> articles
            </span>
          </span>
          <button
            onClick={() => alert("Export feature coming soon.")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-royal-blue hover:underline cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center space-y-3">
              <div className="w-6 h-6 border-2 border-royal-blue border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-400">Loading your articles...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="flex items-center justify-center gap-2 py-12 text-rose-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && articles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <p className="font-heading font-bold text-slate-800">No articles yet</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeStatus === "all"
                  ? "Create your first article to get started."
                  : `You have no ${activeStatus} articles.`}
              </p>
            </div>
            <Link
              href="/add-articles"
              className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-royal-blue text-white text-xs font-bold shadow-sm hover:bg-royal-blue/90 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Create Article
            </Link>
          </div>
        )}

        {/* Desktop Table */}
        {!isLoading && !error && articles.length > 0 && (
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/50 text-[11px] uppercase tracking-wider font-bold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-5">Headline</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Views</th>
                  <th className="py-3 px-4">Read Time</th>
                  <th className="py-3 px-4">Updated</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="py-3.5 px-5 max-w-sm">
                      <div className="font-semibold text-slate-900 group-hover:text-royal-blue transition-colors line-clamp-1">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">By {item.author}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-xs font-semibold text-slate-700">
                      {item.views.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500">
                      {item.readTime} min
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500">
                      {item.updatedAt}
                    </td>
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {item.status === "published" && (
                          <Link
                            href={`/blog/${item.slug}`}
                            target="_blank"
                            title="View Live"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-royal-blue hover:bg-royal-blue/10 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/add-articles?edit=${item.id}`}
                          title="Edit"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          disabled={deletingId === item.id}
                          title="Delete"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-40"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Cards */}
        {!isLoading && !error && articles.length > 0 && (
          <div className="md:hidden divide-y divide-slate-100">
            {articles.map((item) => (
              <div key={item.id} className="p-4 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {item.category}
                  </span>
                  <StatusBadge status={item.status} />
                </div>

                <h3 className="font-heading font-bold text-sm text-slate-900 leading-snug">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>By {item.author}</span>
                  <span>{item.updatedAt}</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  {item.status === "published" && (
                    <Link
                      href={`/blog/${item.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs text-royal-blue font-semibold hover:underline"
                    >
                      <span>Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                  <Link
                    href={`/add-articles?edit=${item.id}`}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    disabled={deletingId === item.id}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer disabled:opacity-40"
                  >
                    {deletingId === item.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
