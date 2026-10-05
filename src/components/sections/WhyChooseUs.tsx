import { Users, Repeat, Clock, Headphones, CheckCircle2, ShieldCheck, Zap, Award } from "lucide-react";

const reasons = [
  {
    icon: Users,
    metric: "Senior-Led Teams",
    title: "Battle-Tested Senior Engineers",
    desc: "Work directly with veteran full-stack engineers and software architects. No inexperienced hand-offs or offshore guesswork — only battle-hardened practitioners.",
    bullets: ["Zero junior delegation", "Direct technical discussions", "Architectural oversight on every PR"],
    gradient: "from-royal-blue to-cyan-blue",
  },
  {
    icon: Repeat,
    metric: "Agile Velocity",
    title: "Transparent, Rapid Sprint Cycles",
    desc: "Experience true visibility. We work in 1-2 week iterative sprints with interactive demos, automated CI builds, and continuous communication.",
    bullets: ["Weekly clickable staging builds", "Shared Kanban boards & roadmaps", "Async updates via dedicated Slack"],
    gradient: "from-cyan-blue to-teal-400",
  },
  {
    icon: ShieldCheck,
    metric: "Zero Technical Debt",
    title: "Enterprise Quality & Security",
    desc: "From strict type checking and automated test suites to SOC2/HIPAA compliance awareness, we build clean code that scales smoothly from seed to enterprise.",
    bullets: ["Rigorous 90%+ test coverage", "Automated linting & security scans", "Thorough API documentation"],
    gradient: "from-royal-blue to-deep-blue",
  },
  {
    icon: Headphones,
    metric: "24/7 Reliability",
    title: "Unwavering Post-Launch SLA",
    desc: "Deployment is just day one. We stand behind our work with proactive observability, automated alerting, performance tuning, and 24/7 emergency response.",
    bullets: ["99.9% uptime SLA commitments", "Real-time error & log monitoring", "Continuous performance tuning"],
    gradient: "from-brand-azure to-brand-teal",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative py-14 sm:py-20 lg:py-24 bg-slate-50/70 dark:bg-slate-950 overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Ambient background decoration */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-royal-blue/5 dark:bg-royal-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-brand-cyan/5 dark:bg-cyan-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-blue/10 dark:bg-cyan-blue/10 border border-royal-blue/20 dark:border-cyan-blue/25 text-royal-blue dark:text-cyan-blue text-xs font-semibold mb-4 backdrop-blur-md shadow-xs">
            <Award className="w-3.5 h-3.5 text-royal-blue dark:text-cyan-blue" />
            <span>
              WHY PARTNER WITH Bitjunoo
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.18] mb-4">
            Engineering Precision.{" "}
            <span className="brand-title-gradient">
              Uncompromising Standards.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            We don’t just write code — we act as your strategic technical arm, building resilient foundations that support sustainable business growth.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="relative group bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 hover:border-royal-blue/40 dark:hover:border-cyan-blue/40 shadow-md hover:shadow-xl dark:shadow-lg dark:hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top row: Icon & Step watermark */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${r.gradient} text-white shadow-md group-hover:scale-105 transition-transform`}
                  >
                    <r.icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-extrabold font-mono text-slate-300 dark:text-slate-700 group-hover:text-royal-blue/50 dark:group-hover:text-cyan-blue/50 transition-colors select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Metric pill */}
                <div className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-royal-blue/10 dark:bg-cyan-blue/10 text-royal-blue dark:text-cyan-blue border border-royal-blue/20 dark:border-cyan-blue/20 mb-3">
                  {r.metric}
                </div>

                {/* Title */}
                <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-royal-blue dark:group-hover:text-cyan-blue transition-colors">
                  {r.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {r.desc}
                </p>
              </div>

              {/* Bullet checklist */}
              <ul className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
                {r.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-royal-blue dark:text-cyan-blue flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Trust & Verification Stats Bar */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-brand-azure dark:from-cyan-blue dark:to-white">
              3-4 Wks
            </div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">Average MVP Delivery</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-brand-azure dark:from-royal-blue dark:to-cyan-blue">
              90%+
            </div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">Automated Test Coverage</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-brand-azure to-brand-teal dark:from-cyan-blue dark:to-brand-mint">
              99.8%
            </div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">Milestone On-Time Rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-mint dark:from-brand-teal dark:to-brand-mint">
              100%
            </div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">Full Code Ownership</div>
          </div>
        </div>
      </div>
    </section>
  );
}
