import { Metadata } from "next";
import AnalyticsOverview from "@/components/dashboard/AnalyticsOverview";
import { BarChart3, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Audience Analytics | BitJunoo Editorial Console",
  description: "Track readership growth, dwell duration, channel traffic, and article conversion performance.",
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="pb-3 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-royal-blue" />
          <span>READERSHIP INTELLIGENCE</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Audience & Engagement Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Detailed metrics on developer readership, channel acquisition, retention, and global geographical reach.
        </p>
      </div>

      <AnalyticsOverview />
    </div>
  );
}
