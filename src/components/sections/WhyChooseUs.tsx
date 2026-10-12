"use client";

import {
  User,
  Users,
  RefreshCw,
  ShieldCheck,
  Headphones,
  Check,
  Rocket,
  BarChart2,
  Clock,
  Code2,
  TrendingUp,
} from "lucide-react";

interface ReasonCard {
  id: string;
  step: string;
  stepColor: string;
  tag: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  icon: any;
  iconBg: string;
  title: string;
  description: string;
  checklist: string[];
  checkColor: string;
}

const cardsData: ReasonCard[] = [
  {
    id: "senior-led",
    step: "01",
    stepColor: "text-sky-300 dark:text-sky-500",
    tag: "SENIOR-LED TEAMS",
    tagBg: "bg-blue-50/90 dark:bg-blue-950/40",
    tagText: "text-[#0869e8] dark:text-sky-400",
    tagBorder: "border-blue-100 dark:border-blue-900/50",
    icon: Users,
    iconBg: "bg-[#0869e8] text-white shadow-md shadow-blue-500/25",
    title: "Battle-Tested Senior Engineers",
    description:
      "Work directly with veteran full-stack engineers and software architects. No inexperienced hand-offs or offshore guesswork — only battle-hardened practitioners.",
    checklist: [
      "Zero junior delegation",
      "Architect-driven development",
      "Deep domain expertise",
    ],
    checkColor: "bg-[#0869e8]",
  },
  {
    id: "agile-velocity",
    step: "02",
    stepColor: "text-emerald-300 dark:text-teal-500",
    tag: "AGILE VELOCITY",
    tagBg: "bg-teal-50/90 dark:bg-teal-950/40",
    tagText: "text-[#00c5a0] dark:text-teal-300",
    tagBorder: "border-teal-100 dark:border-teal-900/50",
    icon: RefreshCw,
    iconBg: "bg-[#00c5a0] text-white shadow-md shadow-emerald-500/25",
    title: "Transparent, Rapid Sprint Cycles",
    description:
      "Experience true visibility. We work in 1–2 week iterative sprints with interactive demos, automated CI builds, and continuous communication.",
    checklist: [
      "Weekly clickable staging builds",
      "Real-time progress tracking",
      "Continuous stakeholder sync",
    ],
    checkColor: "bg-[#00c5a0]",
  },
  {
    id: "technical-debt",
    step: "03",
    stepColor: "text-purple-300 dark:text-purple-500",
    tag: "ZERO TECHNICAL DEBT",
    tagBg: "bg-purple-50/90 dark:bg-purple-950/40",
    tagText: "text-[#7c3aed] dark:text-purple-400",
    tagBorder: "border-purple-100 dark:border-purple-900/50",
    icon: ShieldCheck,
    iconBg: "bg-[#6d28d9] text-white shadow-md shadow-purple-500/25",
    title: "Enterprise Quality & Security",
    description:
      "From strict type checking and automated test suites to SOC2/HIPAA compliance awareness, we build clean code that scales smoothly from seed to enterprise.",
    checklist: [
      "Rigorous 90%+ test coverage",
      "Security best practices",
      "Scalable architecture design",
    ],
    checkColor: "bg-[#6d28d9]",
  },
  {
    id: "reliability",
    step: "04",
    stepColor: "text-amber-300 dark:text-amber-500",
    tag: "24/7 RELIABILITY",
    tagBg: "bg-orange-50/90 dark:bg-orange-950/40",
    tagText: "text-[#ea580c] dark:text-orange-400",
    tagBorder: "border-orange-100 dark:border-orange-900/50",
    icon: Headphones,
    iconBg: "bg-[#f97316] text-white shadow-md shadow-orange-500/25",
    title: "Unwavering Post-Launch SLA",
    description:
      "Deployment is just day one. We stand behind our work with proactive observability, automated alerting, performance tuning, and 24/7 emergency response.",
    checklist: [
      "99.9% uptime SLA commitments",
      "Proactive monitoring & alerting",
      "Dedicated support channel",
    ],
    checkColor: "bg-[#f97316]",
  },
];

const metricsData = [
  {
    icon: Rocket,
    iconBg: "bg-blue-50 dark:bg-blue-950/50 text-[#0869e8] dark:text-sky-400",
    value: "3–4 Wks",
    label: "Average MVP Delivery",
  },
  {
    icon: BarChart2,
    iconBg: "bg-sky-50 dark:bg-sky-950/50 text-[#0284c7] dark:text-cyan-400",
    value: "90%+",
    label: "Automated Test Coverage",
  },
  {
    icon: Clock,
    iconBg: "bg-purple-50 dark:bg-purple-950/50 text-[#7c3aed] dark:text-purple-400",
    value: "99.8%",
    label: "Milestone On-Time Rate",
  },
  {
    icon: Code2,
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50 text-[#059669] dark:text-emerald-400",
    value: "100%",
    label: "Full Code Ownership",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why"
      className="relative py-10 sm:py-12 lg:py-14 bg-[#fafcff] dark:bg-slate-950 overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Soft Ambient Radial Background Glows */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-12 -right-24 w-[550px] h-[550px] bg-sky-100/60 dark:bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Matrix Dots - Left Top */}
      <div className="hidden xl:block absolute left-10 top-36 w-16 h-20 opacity-30 pointer-events-none">
        <svg width="64" height="80" viewBox="0 0 64 80" fill="none">
          {Array.from({ length: 20 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 4) * 16 + 8}
              cy={Math.floor(i / 4) * 16 + 8}
              r="2"
              fill="#3B82F6"
            />
          ))}
        </svg>
      </div>

      {/* Decorative Matrix Dots - Right Side */}
      <div className="hidden xl:block absolute right-12 top-60 w-16 h-20 opacity-25 pointer-events-none">
        <svg width="64" height="80" viewBox="0 0 64 80" fill="none">
          {Array.from({ length: 20 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 4) * 16 + 8}
              cy={Math.floor(i / 4) * 16 + 8}
              r="2"
              fill="#3B82F6"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Floating Card Left: Build Faster */}
        <div className="hidden md:flex absolute top-4 lg:top-6 left-2 sm:left-4 lg:left-8 xl:left-14 -rotate-6 items-center gap-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 pointer-events-none animate-float z-20">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-cyan-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
              Build
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
              Faster
            </div>
          </div>
        </div>

        {/* Floating Card Right: Secure & Scalable */}
        <div className="hidden md:flex absolute top-2 lg:top-4 right-2 sm:right-4 lg:right-8 xl:right-14 rotate-6 items-center gap-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 pointer-events-none animate-float-delayed z-20">
          <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900 flex items-center justify-center text-[#00c5a0]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
              Secure
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
              & Scalable
            </div>
          </div>
        </div>

        {/* Curved Accent Line with Dot on Right */}
        <div className="hidden lg:block absolute top-14 right-48 xl:right-64 pointer-events-none">
          <svg className="w-20 h-16 text-blue-400/80" viewBox="0 0 80 60" fill="none">
            <path
              d="M 5 55 Q 45 40 70 8"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="70" cy="8" r="4" fill="#0869e8" />
          </svg>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200/70 dark:border-blue-800/60 text-[#2563eb] dark:text-cyan-400 text-[11px] font-bold tracking-wider uppercase mb-5 backdrop-blur-md shadow-xs">
            <User className="w-3.5 h-3.5 text-[#2563eb] dark:text-cyan-400" />
            <span>WHY PARTNER WITH BITJUNO</span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.14] mb-4">
            Engineering Precision.{" "}
            <span className="text-[#0869e8] dark:text-[#38bdf8]">
              Uncompromising Standards.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            We don’t just write code — we act as your strategic technical arm, building resilient foundations that support sustainable business growth.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {cardsData.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Icon + Step watermark number */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${c.iconBg} group-hover:scale-105 transition-transform`}
                  >
                    <c.icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-lg font-bold font-mono tracking-wider ${c.stepColor}`}
                  >
                    {c.step}
                  </span>
                </div>

                {/* Pill Tag */}
                <div
                  className={`inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${c.tagBg} ${c.tagText} ${c.tagBorder} mb-3.5`}
                >
                  {c.tag}
                </div>

                {/* Title */}
                <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-2.5 group-hover:text-[#0869e8] dark:group-hover:text-cyan-400 transition-colors">
                  {c.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {c.description}
                </p>
              </div>

              {/* Bullet checklist */}
              <ul className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                {c.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200"
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 p-0.5 ${c.checkColor}`}
                    >
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </span>
                    <span className="leading-tight font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-6 sm:mt-8 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 lg:p-7 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
            {metricsData.map((m, idx) => (
              <div
                key={m.label}
                className={`flex items-center gap-4 ${
                  idx !== 0 ? "pt-4 sm:pt-0 lg:pl-6" : ""
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${m.iconBg}`}
                >
                  <m.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                    {m.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-snug">
                    {m.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
