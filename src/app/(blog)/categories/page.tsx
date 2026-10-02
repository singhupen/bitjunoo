import { Metadata } from "next";
import CategoriesManager from "@/components/dashboard/CategoriesManager";
import { Tags, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Categories & Tags | BitJunoo Editorial Console",
  description: "Organize publication domains, topic taxonomies, and technical keywords.",
};

import { getAllCategories } from "@/services/category.service";
import { getArticles } from "@/services/article.service";

export default async function CategoriesPage() {
  const [categories, articlesResult] = await Promise.all([
    getAllCategories(),
    getArticles({ limit: 1000 })
  ]);

  const categoryItems = categories.map((cat: any) => ({
    id: cat._id.toString(),
    name: cat.name,
    slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-'),
    description: cat.description || "",
    count: cat.articleCount || 0,
    views: "0", // DB doesn't store views per category yet
    color: "text-royal-blue border-royal-blue/30",
    badgeBg: "bg-blue-50 text-royal-blue",
  }));

  const tagCounts: Record<string, number> = {};
  articlesResult.articles.forEach((a: any) => {
    if (a.tags) {
      a.tags.forEach((t: string) => {
        tagCounts[t] = (tagCounts[t] || 0) + 1;
      });
    }
  });

  const popularTags = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="pb-3 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-royal-blue" />
          <span>TAXONOMY ARCHITECTURE</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Categories & Topic Tags
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Structure your technical knowledge base into specialized domains and semantic tags.
        </p>
      </div>

      <CategoriesManager initialCategories={categoryItems} popularTags={popularTags} totalArticles={articlesResult.total} />
    </div>
  );
}
