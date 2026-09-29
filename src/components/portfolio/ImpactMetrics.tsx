import { ShieldCheck, Zap, Database, Award } from "lucide-react";

const stats = [
  {
    icon: Zap,
    value: "45ms",
    label: "Average API Response",
    sub: "Optimized .NET 9 & Next.js backends",
  },
  {
    icon: Database,
    value: "99.99%",
    label: "Production Uptime SLA",
    sub: "Multi-region resilient architectures",
  },
  {
    icon: ShieldCheck,
    value: "$120M+",
    label: "Transaction Volume Handled",
    sub: "Zero security breaches or leaks",
  },
  {
    icon: Award,
    value: "100/100",
    label: "Lighthouse Performance Target",
    sub: "Sub-second First Contentful Paint",
  },
];

export default function ImpactMetrics() {
  return (
    <section className="py-8 sm:py-10 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/70 shadow-sm text-center"
            >
              <div className="w-8 h-8 rounded-lg bg-royal-blue/10 text-royal-blue flex items-center justify-center mx-auto mb-2">
                <s.icon className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mb-0.5">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800">
                {s.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
