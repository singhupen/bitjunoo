import {
  FileText,
  Users,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export interface StatItem {
  title: string;
  value: string | number;
  change: string;
  trend: string;
  icon: any;
  accent: string;
  glow: string;
}

export default function DashboardStats({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`group relative p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between ${stat.glow}`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">{stat.title}</span>
            <div className={`p-2 rounded-xl border ${stat.accent}`}>
              <stat.icon className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {stat.value}
            </div>

            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{stat.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
