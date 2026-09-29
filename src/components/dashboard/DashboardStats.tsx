import {
  FileText,
  Users,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    title: "Published Articles",
    value: "48",
    change: "+4 this month",
    trend: "up",
    icon: FileText,
    accent: "text-royal-blue bg-blue-50 border-blue-100",
    glow: "group-hover:border-royal-blue/30",
  },
  {
    title: "Monthly Active Readers",
    value: "124.5k",
    change: "+28.4% vs last mo",
    trend: "up",
    icon: Users,
    accent: "text-purple bg-purple/10 border-purple/20",
    glow: "group-hover:border-purple/30",
  },
  {
    title: "Average Read Duration",
    value: "4m 32s",
    change: "+18% retention",
    trend: "up",
    icon: Clock,
    accent: "text-cyan-blue bg-cyan-50 border-cyan-100",
    glow: "group-hover:border-cyan-blue/30",
  },
  {
    title: "Newsletter Subscribers",
    value: "12,850",
    change: "+840 new this wk",
    trend: "up",
    icon: TrendingUp,
    accent: "text-emerald-600 bg-emerald-50 border-emerald-100",
    glow: "group-hover:border-emerald-300",
  },
];

export default function DashboardStats() {
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
