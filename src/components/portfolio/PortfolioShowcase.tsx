"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp,
  Sparkles
} from "lucide-react";

const categories = [
  "All Projects",
  "Web Applications",
  "Mobile Apps",
  "Enterprise .NET",
  "AI & Automation",
];

const projects = [
  {
    title: "FinFlow: Real-Time B2B Treasury & Payments Engine",
    category: "Enterprise .NET",
    tagline: "High-Throughput Financial Microservices",
    desc: "Architected a zero-downtime payments and treasury orchestration engine processing $40M+ in weekly transaction volume with sub-50ms deterministic settlement latencies.",
    metric: "40ms Latency • $40M/Wk Volume",
    stack: [".NET 9", "C#", "Next.js 16", "PostgreSQL", "Kafka", "Docker"],
    gradient: "from-blue-600/40 via-indigo-700/40 to-slate-900",
    glowColor: "rgba(59, 130, 246, 0.3)",
    impact: ["99.995% transaction uptime", "45% reduction in compute footprint", "Automated compliance ledger"],
  },
  {
    title: "OmniHealth: Cross-Platform Patient Telehealth Suite",
    category: "Mobile Apps",
    tagline: "HIPAA-Compliant iOS & Android Patient App",
    desc: "Engineered an end-to-end patient telehealth and remote monitoring application with real-time WebRTC audio/video consultations, biometrics sync, and electronic medical record integration.",
    metric: "250K+ Active Patients • 4.9★ Store Rating",
    stack: ["React Native", "Expo", "TypeScript", "Node.js", "WebRTC"],
    gradient: "from-cyan-600/40 via-teal-700/40 to-slate-900",
    glowColor: "rgba(6, 182, 212, 0.3)",
    impact: ["Zero crash rate across 250K users", "Sub-second WebRTC connection", "Seamless Bluetooth device pairing"],
  },
  {
    title: "SupplyChain Pro: Global Logistics Tracking Hub",
    category: "Web Applications",
    tagline: "Next.js Real-Time Maritime Operations Portal",
    desc: "A mission-critical logistics dashboard aggregating telemetry from 12,000+ cargo containers globally with predictive ETA modeling and live satellite map rendering.",
    metric: "12,000+ Live Telemetry Assets Tracked",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Mapbox GL"],
    gradient: "from-indigo-600/40 via-purple-700/40 to-slate-900",
    glowColor: "rgba(99, 102, 241, 0.3)",
    impact: ["100 Lighthouse performance score", "30% faster customs dispatching", "Live WebSocket telemetry"],
  },
  {
    title: "CognitiveOps: Enterprise Document Intelligence & RAG",
    category: "AI & Automation",
    tagline: "Custom Autonomous Document Processing Pipeline",
    desc: "Built a secure, on-premise Retrieval-Augmented Generation (RAG) platform that processes millions of pages of complex technical manuals and legal contracts with citations.",
    metric: "85% Reduction in Review Time",
    stack: ["Python", "FastAPI", "Next.js", "pgvector", "LangChain"],
    gradient: "from-purple-600/40 via-pink-700/40 to-slate-900",
    glowColor: "rgba(168, 85, 247, 0.3)",
    impact: ["Over 2.4M pages indexed", "Sub-second multi-document queries", "Zero data leak to public LLMs"],
  },
  {
    title: "AeroReserve: High-Frequency Booking & Inventory",
    category: "Enterprise .NET",
    tagline: "Distributed Seat Reservation & Fare Lock System",
    desc: "Engineered a high-concurrency seat reservation engine capable of absorbing black swan traffic spikes without cache desynchronization or double-booking errors.",
    metric: "15,000 RPS Peak Concurrency",
    stack: [".NET 9", "Redis Enterprise", "C#", "Kubernetes", "AWS"],
    gradient: "from-sky-600/40 via-blue-800/40 to-slate-900",
    glowColor: "rgba(14, 165, 233, 0.3)",
    impact: ["Zero race conditions or lockouts", "Sub-15ms cache read latency", "Elastic Kubernetes scaling"],
  },
  {
    title: "PulseFit: Real-Time Interactive Fitness & Community",
    category: "Mobile Apps",
    tagline: "Engaging Fitness Mobile Ecosystem",
    desc: "A native-grade mobile fitness experience featuring live heart rate streaming, personalized AI workout generators, audio haptics, and social leaderboards.",
    metric: "65% 30-Day Cohort Retention",
    stack: ["React Native", "TypeScript", "GraphQL", "Tailwind", "Swift/Kotlin"],
    gradient: "from-violet-600/40 via-fuchsia-700/40 to-slate-900",
    glowColor: "rgba(139, 92, 246, 0.3)",
    impact: ["60fps interactive animations", "Offline workout logging", "Over 500K workout sessions"],
  },
];

export default function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filtered = activeCategory === "All Projects"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-10 sm:py-14 bg-slate-50/70 dark:bg-slate-950 relative overflow-hidden border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-royal-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-3 sm:px-5 lg:px-7 xl:px-8 relative z-10">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-royal-blue to-cyan-blue text-white shadow-md shadow-cyan-blue/20 scale-105 border border-cyan-blue/40"
                    : "bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((p) => (
            <div
              key={p.title}
              className="group bg-white dark:bg-slate-900/60 hover:bg-slate-50/50 dark:hover:bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-cyan-blue/40 dark:hover:border-cyan-blue/40 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between backdrop-blur-sm"
            >
              <div>
                {/* Header Banner */}
                <div className={`p-5 sm:p-6 bg-gradient-to-br ${p.gradient} relative overflow-hidden border-b border-slate-800/80 text-white`}>
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
                  
                  {/* Status header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900/70 border border-slate-700/80 text-cyan-blue backdrop-blur-sm">
                      {p.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live in Prod
                    </span>
                  </div>

                  <h3 className="font-heading text-base sm:text-lg font-bold leading-snug text-white mb-1.5 group-hover:text-cyan-blue transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-200 font-medium">
                    {p.tagline}
                  </p>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6">
                  {/* Metric Pill */}
                  <div className="inline-block text-xs font-bold text-cyan-blue bg-cyan-blue/10 border border-cyan-blue/25 px-2.5 py-1 rounded-md mb-3">
                    {p.metric}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {p.desc}
                  </p>

                  {/* Impact highlights */}
                  <div className="space-y-1.5 mb-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    {p.impact.map((imp) => (
                      <div key={imp} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-blue flex-shrink-0" />
                        <span>{imp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 sm:p-6 pt-0">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white group-hover:border-cyan-blue/50 group-hover:text-cyan-blue transition-all"
                >
                  <span>Request Architecture Deep-Dive</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
