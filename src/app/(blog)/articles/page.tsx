import { Metadata } from "next";
import ArticlesManager from "@/components/dashboard/ArticlesManager";
import { FileText, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Articles Catalog | BitJunoo Editorial Console",
  description: "Browse, filter, and manage technical articles, deep dives, and system architecture guides.",
};

import { getArticles } from "@/services/article.service";

export default async function ArticlesPage() {
  const result = await getArticles({ limit: 100 }); // Getting a larger batch for the manager
  
  const formattedArticles = result.articles.map((article: any) => ({
    id: article._id.toString(),
    title: article.title,
    category: article.category || "Uncategorized",
    status: article.status ? article.status.charAt(0).toUpperCase() + article.status.slice(1) : "Draft",
    views: article.views?.toLocaleString() || "0",
    readTime: `${article.readTime || 5} min`,
    updatedAt: new Date(article.updatedAt || article.createdAt).toLocaleDateString(),
    author: article.author?.name || "Unknown Author",
  }));

  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="pb-3 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-royal-blue" />
          <span>EDITORIAL REPOSITORY</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Articles & Publications
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage, search, and monitor all production technical articles, drafts, and scheduled releases.
        </p>
      </div>

      <ArticlesManager initialArticles={formattedArticles} />
    </div>
  );
}
