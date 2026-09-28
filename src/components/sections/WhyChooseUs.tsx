import { Users, Repeat, Clock, Headphones, CheckCircle2, ShieldCheck, Zap, Award } from "lucide-react";

const reasons = [
  {
    icon: Users,
    metric: "Senior-Led Teams",
    title: "Battle-Tested Senior Engineers",
    desc: "Work directly with veteran full-stack engineers and software architects. No inexperienced hand-offs or offshore guesswork — only battle-hardened practitioners.",
    bullets: ["Zero junior delegation", "Direct technical discussions", "Architectural oversight on every PR"],
    gradient: "from-blue-600 to-sky-500",
  },
  {
    icon: Repeat,
    metric: "Agile Velocity",
    title: "Transparent, Rapid Sprint Cycles",
    desc: "Experience true visibility. We work in 1-2 week iterative sprints with interactive demos, automated CI builds, and continuous communication.",
    bullets: ["Weekly clickable staging builds", "Shared Kanban boards & roadmaps", "Async updates via dedicated Slack"],
    gradient: "from-cyan-600 to-teal-500",
  },
  {
    icon: ShieldCheck,
    metric: "Zero Technical Debt",
    title: "Enterprise Quality & Security",
    desc: "From strict type checking and automated test suites to SOC2/HIPAA compliance awareness, we build clean code that scales smoothly from seed to enterprise.",
    bullets: ["Rigorous 90%+ test coverage", "Automated linting & security scans", "Thorough API documentation"],
    gradient: "from-indigo-600 to-violet-500",
  },
  {
    icon: Headphones,
    metric: "24/7 Reliability",
    title: "Unwavering Post-Launch SLA",
    desc: "Deployment is just day one. We stand behind our work with proactive observability, automated alerting, performance tuning, and 24/7 emergency response.",
    bullets: ["99.9% uptime SLA commitments", "Real-time error & log monitoring", "Continuous performance tuning"],
    gradient: "from-emerald-600 to-cyan-500",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative py-24 sm:py-28 overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Reduced padding, wide container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <Award className="w-3.5 h-3.5 text-cyan-600" />
            <span className="flex items-center gap-1.5">
              WHY PARTNER WITH <img src="/icon.png" alt="BitJunoo Logo" className="h-4 w-auto inline" />
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mt-2 mb-5">
            Engineering Precision.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500">
              Uncompromising Standards.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We don’t just deliver code — we act as your strategic technical arm, building resilient foundations that support sustainable business growth.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="relative group bg-white/85 backdrop-blur-xl rounded-2xl p-7 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.12)] hover:border-sky-400/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top row: Icon & Step watermark */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${r.gradient} text-white shadow-md shadow-brand-900/10 group-hover:scale-105 transition-transform`}
                  >
                    <r.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold font-heading text-slate-200 group-hover:text-sky-200 transition-colors select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Metric pill */}
                <div className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 border border-sky-100 mb-3">
                  {r.metric}
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {r.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {r.desc}
                </p>
              </div>

              {/* Bullet checklist */}
              <ul className="pt-4 border-t border-slate-100/90 space-y-2">
                {r.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Trust & Verification Stats Bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-7 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-sm text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-blue-600">3-4 Wks</div>
            <div className="text-xs sm:text-sm font-medium text-slate-700 mt-0.5">Average MVP Delivery</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-cyan-600">90%+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-700 mt-0.5">Automated Test Coverage</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-indigo-600">99.8%</div>
            <div className="text-xs sm:text-sm font-medium text-slate-700 mt-0.5">Milestone On-Time Rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-600">100%</div>
            <div className="text-xs sm:text-sm font-medium text-slate-700 mt-0.5">Code Ownership Transfer</div>
          </div>
        </div>
      </div>
    </section>
  );
}
