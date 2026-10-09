import { ShieldCheck, Zap, Database, Rocket, ArrowUpRight } from "lucide-react";

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
    icon: Rocket,
    value: "100/100",
    label: "Lighthouse Performance Target",
    sub: "Sub-second First Contentful Paint",
  },
];

export default function ImpactMetrics() {
  return (
    <section className="py-8 sm:py-12 bg-slate-50/50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300 z-20">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white dark:bg-slate-900 rounded-[28px] p-6 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 flex flex-col relative overflow-hidden h-full group transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1"
            >
              <div className="flex gap-4 sm:gap-5 mb-4 z-10">
                {/* Icon Container */}
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 dark:bg-cyan-blue/10 text-royal-blue dark:text-cyan-blue rounded-2xl flex items-center justify-center border border-blue-100 dark:border-cyan-blue/20">
                  <s.icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5]" />
                </div>
                
                {/* Text Content */}
                <div>
                  <h3 className="text-[28px] sm:text-[32px] font-extrabold text-royal-blue dark:text-white mb-1 font-heading leading-none">
                    {s.value}
                  </h3>
                  <p className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-1 leading-tight">
                    {s.label}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                    {s.sub}
                  </p>
                </div>
              </div>
              
              {/* Bottom decorative wave & button */}
              <div className="mt-auto pt-6 flex items-end justify-between z-10">
                <div className="w-3/4 -ml-2 -mb-2">
                  <svg viewBox="0 0 100 20" className="w-full h-8 stroke-blue-500/50 dark:stroke-cyan-blue/50 stroke-[1.5] fill-none stroke-linecap-round stroke-linejoin-round transition-all duration-500 group-hover:stroke-blue-600 dark:group-hover:stroke-cyan-blue group-hover:scale-x-105">
                    <path d="M0,15 Q15,5 30,15 T60,15 T90,15 T120,15" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center shrink-0 shadow-md transform transition-transform group-hover:scale-110 group-hover:bg-brand-cyan">
                   <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hover gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
