"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Eye,
  Edit2,
  Trash2,
  ExternalLink,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  status: "Published" | "In Review" | "Draft" | "Scheduled";
  views: string;
  readTime: string;
  updatedAt: string;
  author: string;
}

const initialArticles: ArticleItem[] = [
  {
    id: "art-1",
    title: "Zero-Downtime Database Migrations in High-Concurrency .NET 9 Microservices",
    category: "Backend & Systems",
    status: "Published",
    views: "18,420",
    readTime: "9 min",
    updatedAt: "2 days ago",
    author: "Alex Vance",
  },
  {
    id: "art-2",
    title: "Autonomous AI Agents in Production: Guardrails, Latency, and Failover Design",
    category: "AI & Agents",
    status: "Published",
    views: "24,890",
    readTime: "11 min",
    updatedAt: "5 days ago",
    author: "Elena Rostova",
  },
  {
    id: "art-3",
    title: "Optimizing Next.js 16 Edge Rendering: 60fps WebGL with React 19 Compiler",
    category: "Frontend Architecture",
    status: "Published",
    views: "14,110",
    readTime: "7 min",
    updatedAt: "1 week ago",
    author: "Sarah Mitchell",
  },
  {
    id: "art-4",
    title: "Multi-Region Kubernetes Observability with Prometheus & OpenTelemetry",
    category: "Cloud & DevOps",
    status: "In Review",
    views: "—",
    readTime: "8 min",
    updatedAt: "Yesterday",
    author: "James Okoro",
  },
  {
    id: "art-5",
    title: "Cross-Platform React Native 0.76 New Architecture Performance Audit",
    category: "Mobile Systems",
    status: "Draft",
    views: "—",
    readTime: "6 min",
    updatedAt: "3 hours ago",
    author: "Alex Vance",
  },
  {
    id: "art-6",
    title: "Benchmarking Vector Search Latencies: pgvector vs Qdrant vs Pinecone",
    category: "Data & AI",
    status: "Scheduled",
    views: "—",
    readTime: "10 min",
    updatedAt: "Tomorrow",
    author: "Elena Rostova",
  },
];

const filterTabs = ["All Articles", "Published", "In Review", "Draft", "Scheduled"] as const;

export default function RecentArticlesTable() {
  const [activeFilter, setActiveFilter] = useState<string>("All Articles");
  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles);

  const filtered = activeFilter === "All Articles"
    ? articles
    : articles.filter((a) => a.status === activeFilter);

  const getStatusBadge = (status: ArticleItem["status"]) => {
    switch (status) {
      case "Published":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Published
          </span>
        );
      case "In Review":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            In Review
          </span>
        );
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <FileText className="w-3 h-3 text-slate-500" />
            Draft
          </span>
        );
      case "Scheduled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-azure/10 text-brand-azure border border-brand-azure/20">
            <Clock className="w-3 h-3 text-brand-azure" />
            Scheduled
          </span>
        );
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to archive "${title}"?`)) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div id="articles" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-8">
      {/* Table Header and Filter Pills */}
      <div className="p-4 sm:p-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900">
            Editorial Publications & Drafts
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your engineering deep dives, architectural guides, and production benchmark reports.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === tab
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Articles Table for Tablet/Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/80 text-[11px] uppercase tracking-wider font-bold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="py-3 px-5">Article Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Views</th>
              <th className="py-3 px-4">Read Time</th>
              <th className="py-3 px-4">Last Updated</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                <td className="py-3.5 px-5 max-w-sm">
                  <div className="font-semibold text-slate-900 group-hover:text-royal-blue transition-colors line-clamp-1">
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Author: {item.author}</div>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    {item.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap font-mono text-xs font-semibold text-slate-700">
                  {item.views}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500">
                  {item.readTime}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500">
                  {item.updatedAt}
                </td>
                <td className="py-3.5 px-5 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1.5">
                    <Link
                      href="/blog"
                      target="_blank"
                      title="Preview Live"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-royal-blue hover:bg-royal-blue/10 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => alert(`Opening editor for: "${item.title}"`)}
                      title="Edit Article"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      title="Delete"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
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

      {/* Mobile Card List (Stacked for Mobile Screens) */}
      <div className="md:hidden divide-y divide-slate-100">
        {filtered.map((item) => (
          <div key={item.id} className="p-4 space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                {item.category}
              </span>
              {getStatusBadge(item.status)}
            </div>

            <h3 className="font-heading font-bold text-sm text-slate-900 leading-snug">
              {item.title}
            </h3>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Views: <strong className="text-slate-700 font-mono">{item.views}</strong></span>
              <span>Updated {item.updatedAt}</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Link
                href="/blog"
                target="_blank"
                className="inline-flex items-center gap-1 text-xs text-royal-blue font-semibold hover:underline"
              >
                <span>Preview</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={() => alert(`Editing: "${item.title}"`)}
                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id, item.title)}
                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
              >
                Archive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
