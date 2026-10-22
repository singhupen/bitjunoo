import { Metadata } from "next";
import ReviewQueueManager from "@/components/dashboard/ReviewQueueManager";
import { FileCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Review Queue | BitJunoo Editorial Console",
  description: "Peer review technical submissions, approve publications, and deliver author feedback.",
};

export default function ReviewQueuePage() {
  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-royal-blue" />
          <span>EDITORIAL GOVERNANCE</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Editorial Review Queue
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Inspect pending technical publications submitted by authors, verify accuracy, and publish to the live engineering journal.
        </p>
      </div>

      <ReviewQueueManager />
    </div>
  );
}
