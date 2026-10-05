import { ShieldCheck, Zap, Database, Award } from "lucide-react";

const stats = [
  {
    icon: Zap,
    value: "45ms",
    label: "Average API Response",
    sub: "Optimized .NET 9 & Next.js backends",
    accent: "from-cyan-blue to-royal-blue",
  },
  {
    icon: Database,
    value: "99.99%",
    label: "Production Uptime SLA",
    sub: "Multi-region resilient architectures",
    accent: "from-royal-blue to-brand-azure",
  },
  {
    icon: ShieldCheck,
    value: "$120M+",
    label: "Transaction Volume Handled",
    sub: "Zero security breaches or leaks",
    accent: "from-brand-azure to-brand-cyan",
  },
  {
    icon: Award,
    value: "100/100",
    label: "Lighthouse Performance Target",
    sub: "Sub-second First Contentful Paint",
    accent: "from-brand-teal to-cyan-blue",
  },
];

export default function ImpactMetrics() {
  return (
    <section className="py-6 sm:py-8 bg-slate-50/70 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 relative overflow-hidden transition-colors duration-300">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-32 bg-cyan-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-32 bg-royal-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-3 sm:px-5 lg:px-7 xl:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-blue/40 dark:hover:border-cyan-blue/40 shadow-sm hover:shadow-lg text-center transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="w-8 h-8 rounded-lg bg-royal-blue/15 border border-royal-blue/30 text-royal-blue dark:text-cyan-blue flex items-center justify-center mx-auto mb-2 group-hover:scale-110 group-hover:border-cyan-blue/50 transition-all">
                <s.icon className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-royal-blue via-brand-azure to-brand-teal dark:from-white dark:via-cyan-100 dark:to-cyan-400 mb-0.5">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {s.label}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
