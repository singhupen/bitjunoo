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
    <section className="py-16 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/70 shadow-sm text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-royal-blue/10 text-royal-blue flex items-center justify-center mx-auto mb-3">
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 mb-1">
                {s.value}
              </div>
              <div className="text-sm font-bold text-slate-800 mb-0.5">
                {s.label}
              </div>
              <div className="text-xs text-slate-500">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
