import { Metadata } from "next";
import CategoriesManager from "@/components/dashboard/CategoriesManager";
import { Tags, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Categories & Tags | BitJunoo Editorial Console",
  description: "Organize publication domains, topic taxonomies, and technical keywords.",
};

export default function CategoriesPage() {
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

      <CategoriesManager />
    </div>
  );
}
