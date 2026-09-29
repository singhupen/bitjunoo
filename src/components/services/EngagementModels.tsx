import Link from "next/link";
import { Users, Calendar, Sparkles, Check, ArrowRight } from "lucide-react";

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
    <section className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-xs sm:text-sm font-semibold mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>HOW WE COLLABORATE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Flexible Engagement Models
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Choose the collaboration model that fits your organization&apos;s stage, roadmap velocity, and budget structure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {models.map((m) => (
            <div
              key={m.name}
              className={`rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 ${
                m.popular
                  ? "bg-slate-950 text-white border-2 border-royal-blue shadow-2xl relative scale-105 z-10"
                  : "bg-slate-50 text-slate-900 border border-slate-200/80 shadow-sm hover:shadow-lg"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      m.popular
                        ? "bg-royal-blue text-white"
                        : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    {m.badge}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold mb-3">
                  {m.name}
                </h3>

                <p className={`text-sm leading-relaxed mb-6 ${m.popular ? "text-slate-300" : "text-slate-600"}`}>
                  {m.desc}
                </p>

                <div className={`space-y-3 pt-6 border-t ${m.popular ? "border-white/10" : "border-slate-200"}`}>
                  {m.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${m.popular ? "text-cyan-blue" : "text-royal-blue"}`} />
                      <span className={m.popular ? "text-slate-200" : "text-slate-700"}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6">
                <Link
                  href="/contact"
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all ${
                    m.popular
                      ? "bg-gradient-to-r from-royal-blue via-deep-blue to-purple text-white shadow-lg shadow-royal-blue/30 hover:shadow-royal-blue/50 hover:-translate-y-0.5"
                      : "bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 hover:-translate-y-0.5"
                  }`}
                >
                  {m.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
