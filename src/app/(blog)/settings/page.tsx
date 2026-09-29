import { Metadata } from "next";
import PublicationSettings from "@/components/dashboard/PublicationSettings";
import { Settings, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Platform Settings | BitJunoo Editorial Console",
  description: "Configure publication channels, SEO syndication, editorial governance, and RSS distribution.",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="pb-3 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-royal-blue" />
          <span>CONSOLE CONFIGURATION</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Editorial & Platform Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize publication branding, SEO syndication protocols, review workflows, and RSS feeds.
        </p>
      </div>

      <PublicationSettings />
    </div>
  );
}
