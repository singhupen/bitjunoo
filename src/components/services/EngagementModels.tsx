import Link from "next/link";
import { Users, Check, ArrowRight } from "lucide-react";

const models = [
  {
    name: "Dedicated Engineering Squad",
    badge: "Most Popular",
    desc: "A fully managed, cross-functional team of senior engineers, tech lead, and QA embedded into your company for continuous velocity.",
    bullets: [
      "Lead Architect + Full-Stack Engineers",
      "Direct daily syncs & dedicated Slack channel",
      "Elastic scaling up or down as roadmap shifts",
      "Weekly clickable staging demonstrations",
      "Full IP & code transfer on every PR",
    ],
    cta: "Hire a Dedicated Squad",
    popular: true,
  },
  {
    name: "Fixed-Scope Milestone",
    badge: "Predictable Budget",
    desc: "Ideal for MVPs, greenfield applications, or specific architectural migrations with clear specs, strict deadlines, and defined budgets.",
    bullets: [
      "Comprehensive fixed-scope pricing & timeline",
      "Clear milestone acceptance criteria",
      "Guaranteed delivery date SLA",
      "Comprehensive handover & training sessions",
      "30-day post-launch warranty included",
    ],
    cta: "Request Milestone Estimate",
    popular: false,
  },
  {
    name: "Specialized Staff Augmentation",
    badge: "Rapid Scale",
    desc: "Inject veteran Next.js, .NET 9, or Cloud DevOps engineers directly into your existing in-house team to accelerate velocity instantly.",
    bullets: [
      "Senior engineers with 8+ years experience",
      "Zero onboarding friction, ready within 48h",
      "Integrated directly into your git & standups",
      "Transparent monthly or hourly billing",
      "Flexible notice periods",
    ],
    cta: "Augment Your Team",
    popular: false,
  },
];

export default function EngagementModels() {
  return (
    <section className="py-10 sm:py-14 bg-white dark:bg-slate-950 relative transition-colors duration-300">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue dark:text-cyan-blue text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>HOW WE COLLABORATE</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-2">
            Flexible Engagement Models
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Choose the collaboration model that fits your organization&apos;s stage, roadmap velocity, and budget structure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {models.map((m) => (
            <div
              key={m.name}
              className={`rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${
                m.popular
                  ? "bg-slate-900 text-white border-2 border-cyan-blue/60 shadow-2xl relative z-10 shadow-royal-blue/20"
                  : "bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      m.popular
                        ? "bg-gradient-to-r from-royal-blue to-brand-azure text-white shadow-sm"
                        : "bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700/60"
                    }`}
                  >
                    {m.badge}
                  </span>
                </div>

                <h3 className={`font-heading text-lg sm:text-xl font-bold mb-2 ${m.popular ? "text-white" : "text-slate-950 dark:text-white"}`}>
                  {m.name}
                </h3>

                <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${m.popular ? "text-slate-200" : "text-slate-600 dark:text-slate-300"}`}>
                  {m.desc}
                </p>

                <div className={`space-y-2 pt-3.5 border-t ${m.popular ? "border-slate-800" : "border-slate-200 dark:border-slate-800/80"}`}>
                  {m.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-xs">
                      <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-cyan-blue" />
                      <span className={m.popular ? "text-slate-200" : "text-slate-600 dark:text-slate-300"}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`mt-5 pt-3.5 border-t ${m.popular ? "border-slate-800" : "border-slate-200 dark:border-slate-800/80"}`}>
                <Link
                  href="/contact"
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                    m.popular
                      ? "bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan text-white shadow-md shadow-royal-blue/30 hover:shadow-royal-blue/50 hover:-translate-y-0.5"
                      : "bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:-translate-y-0.5 shadow-xs"
                  }`}
                >
                  <span>{m.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
