import { Metadata } from "next";
import UsersManager from "@/components/dashboard/UsersManager";
import { Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Authors & Access Permissions | BitJunoo Editorial Console",
  description: "Manage author approvals, write permissions, and role assignments.",
};

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-royal-blue" />
          <span>ACCESS GOVERNANCE</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Authors &amp; Permissions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review pending author signups, toggle publishing privileges, and manage role assignments.
        </p>
      </div>

      <UsersManager />
    </div>
  );
}
