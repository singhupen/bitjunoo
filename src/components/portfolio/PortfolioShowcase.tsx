"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ExternalLink, 
  ArrowUpRight, 
  Layers, 
  Server, 
  Smartphone, 
  Cpu, 
  CheckCircle2, 
  Sparkles,
  TrendingUp
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
    gradient: "from-royal-blue to-deep-blue",
    impact: ["99.995% transaction uptime", "45% reduction in compute footprint", "Automated compliance ledger"],
  },
  {
    title: "OmniHealth: Cross-Platform Patient Telehealth Suite",
    category: "Mobile Apps",
    tagline: "HIPAA-Compliant iOS & Android Patient App",
    desc: "Engineered an end-to-end patient telehealth and remote monitoring application with real-time WebRTC audio/video consultations, biometrics sync, and electronic medical record integration.",
    metric: "250K+ Active Patients • 4.9★ Store Rating",
    stack: ["React Native", "Expo", "TypeScript", "Node.js", "WebRTC"],
    gradient: "from-cyan-blue to-teal-400",
    impact: ["Zero crash rate across 250K users", "Sub-second WebRTC connection", "Seamless Bluetooth device pairing"],
  },
  {
    title: "SupplyChain Pro: Global Logistics Tracking Hub",
    category: "Web Applications",
    tagline: "Next.js Real-Time Maritime Operations Portal",
    desc: "A mission-critical logistics dashboard aggregating telemetry from 12,000+ cargo containers globally with predictive ETA modeling and live satellite map rendering.",
    metric: "12,000+ Live Telemetry Assets Tracked",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Mapbox GL"],
    gradient: "from-indigo to-violet",
    impact: ["100 Lighthouse performance score", "30% faster customs dispatching", "Live WebSocket telemetry"],
  },
  {
    title: "CognitiveOps: Enterprise Document Intelligence & RAG",
    category: "AI & Automation",
    tagline: "Custom Autonomous Document Processing Pipeline",
    desc: "Built a secure, on-premise Retrieval-Augmented Generation (RAG) platform that processes millions of pages of complex technical manuals and legal contracts with citations.",
    metric: "85% Reduction in Review Time",
    stack: ["Python", "FastAPI", "Next.js", "pgvector", "LangChain"],
    gradient: "from-purple to-royal-blue",
    impact: ["Over 2.4M pages indexed", "Sub-second multi-document queries", "Zero data leak to public LLMs"],
  },
  {
    title: "AeroReserve: High-Frequency Booking & Inventory",
    category: "Enterprise .NET",
    tagline: "Distributed Seat Reservation & Fare Lock System",
    desc: "Engineered a high-concurrency seat reservation engine capable of absorbing black swan traffic spikes without cache desynchronization or double-booking errors.",
    metric: "15,000 RPS Peak Concurrency",
    stack: [".NET 9", "Redis Enterprise", "C#", "Kubernetes", "AWS"],
    gradient: "from-deep-blue to-cyan-blue",
    impact: ["Zero race conditions or lockouts", "Sub-15ms cache read latency", "Elastic Kubernetes scaling"],
  },
  {
    title: "PulseFit: Real-Time Interactive Fitness & Community",
    category: "Mobile Apps",
    tagline: "Engaging Fitness Mobile Ecosystem",
    desc: "A native-grade mobile fitness experience featuring live heart rate streaming, personalized AI workout generators, audio haptics, and social leaderboards.",
    metric: "65% 30-Day Cohort Retention",
    stack: ["React Native", "TypeScript", "GraphQL", "Tailwind", "Swift/Kotlin"],
    gradient: "from-violet to-purple",
    impact: ["60fps interactive animations", "Offline workout logging", "Over 500K workout sessions"],
  },
];

export default function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filtered = activeCategory === "All Projects"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-slate-950 text-white shadow-md shadow-slate-950/20 scale-105"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <div
              key={p.title}
              className="group bg-slate-50 hover:bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl hover:border-royal-blue/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Banner */}
                <div className={`p-6 sm:p-7 bg-gradient-to-br ${p.gradient} text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/25">
                      {p.category}
                    </span>
                    <span className="text-xs font-semibold text-white/90 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-cyan-blue" />
                      Live in Prod
                    </span>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold leading-snug text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-white/80 font-medium">
                    {p.tagline}
                  </p>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-7">
                  {/* Metric Pill */}
                  <div className="inline-block text-xs font-bold text-royal-blue bg-royal-blue/10 border border-royal-blue/20 px-3 py-1.5 rounded-lg mb-4">
                    {p.metric}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {p.desc}
                  </p>

                  {/* Impact highlights */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-200/60">
                    {p.impact.map((imp) => (
                      <div key={imp} className="flex items-center gap-2 text-xs text-slate-700">
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
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 sm:p-7 pt-0">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 group-hover:border-royal-blue/50 group-hover:text-royal-blue transition-all"
                >
                  <span>Request Full Architecture Case Study</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
