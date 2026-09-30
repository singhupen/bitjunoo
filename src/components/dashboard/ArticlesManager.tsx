"use client";

import { useState } from "react";
import { authFetch } from "@/lib/api/apiClient";
import Link from "next/link";
import {
  FileText,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit2,
  Trash2,
  MoreVertical,
  ArrowUpDown,
  Download,
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

const categories = ["All Categories", "Backend & Systems", "Frontend Architecture", "AI & Agents", "Cloud & DevOps", "Mobile Systems", "Data & AI"];
const statuses = ["All Statuses", "Published", "In Review", "Draft", "Scheduled"];

export default function ArticlesManager({ initialArticles }: { initialArticles: ArticleItem[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles);

  const filtered = articles.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "All Statuses" || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple/10 text-purple border border-purple/20">
            <Clock className="w-3 h-3 text-purple" />
            Scheduled
          </span>
        );
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Archive article "${title}"?`)) {
      try {
        const res = await authFetch(`/api/articles/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setArticles((prev) => prev.filter((a) => a.id !== id));
        } else {
          alert("Failed to delete article. Ensure you have proper permissions.");
        }
      } catch(e) {
        alert("An error occurred while deleting the article.");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title or author..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue text-slate-900"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <Link
            href="/add-articles"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-royal-blue to-purple text-white text-xs font-bold shadow-md shadow-royal-blue/25 hover:shadow-lg hover:shadow-royal-blue/35 transition-all whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Article</span>
          </Link>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Table summary bar */}
        <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong className="text-slate-800 font-semibold">{filtered.length}</strong> publications</span>
          <button
            onClick={() => alert("Exporting current articles view to CSV...")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-royal-blue hover:underline cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Desktop / Tablet View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/50 text-[11px] uppercase tracking-wider font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Headline</th>
                <th className="py-3 px-4">Domain</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Readership</th>
                <th className="py-3 px-4">Read Time</th>
                <th className="py-3 px-4">Updated</th>
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
                    <div className="text-xs text-slate-400 mt-0.5">By {item.author}</div>
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
                        title="View Live"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-royal-blue hover:bg-royal-blue/10 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => alert(`Editing: "${item.title}"`)}
                        title="Edit"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        title="Archive"
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

        {/* Mobile View */}
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
                <span>By {item.author}</span>
                <span>{item.updatedAt}</span>
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
    </div>
  );
}
