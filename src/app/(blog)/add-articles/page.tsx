import { Metadata } from "next";
import ArticleEditor from "@/components/dashboard/ArticleEditor";
import { PlusCircle, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Article | BitJunoo Editorial Console",
  description: "Draft, format, and publish enterprise software engineering deep dives and production guides.",
};

export default function AddArticlesPage() {
  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="pb-3 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-royal-blue" />
          <span>ARTICLE COMPOSER</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Create New Publication
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Compose architecture teardowns, technical benchmarks, and cloud deployment guides with live markdown preview.
        </p>
      </div>

      <ArticleEditor />
    </div>
  );
}
