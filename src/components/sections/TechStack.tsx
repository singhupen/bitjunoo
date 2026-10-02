"use client";

import { useState } from "react";
import {
  Atom,
  Server,
  Hexagon,
  Database,
  Boxes,
  Globe,
  Terminal,
  Layers,
  Cpu,
  Cloud,
  Shield,
  Workflow,
  Sparkles,
} from "lucide-react";

interface TechItem {
  name: string;
  category: "Frontend" | "Backend" | "Cloud & DevOps" | "Data & AI";
  icon: any;
  specialty: string;
  color: string;
}

const technologies: TechItem[] = [
  // Frontend
  { name: "React 19", category: "Frontend", icon: Atom, specialty: "Concurrent UI & Hooks", color: "text-cyan-blue group-hover:border-cyan-blue/40" },
  { name: "Next.js 16", category: "Frontend", icon: Layers, specialty: "Turbopack & Edge SSR", color: "text-slate-100 group-hover:border-slate-400" },
  { name: "TypeScript", category: "Frontend", icon: Terminal, specialty: "Type-Safe Architecture", color: "text-royal-blue group-hover:border-royal-blue/40" },
  { name: "Tailwind CSS", category: "Frontend", icon: Globe, specialty: "Modern Design Systems", color: "text-cyan-400 group-hover:border-cyan-400/40" },

  // Backend
  { name: ".NET 9 / C#", category: "Backend", icon: Server, specialty: "Enterprise Microservices", color: "text-purple group-hover:border-purple/40" },
  { name: "Node.js", category: "Backend", icon: Hexagon, specialty: "Async I/O & Event Loops", color: "text-emerald-400 group-hover:border-emerald-400/40" },
  { name: "gRPC & REST", category: "Backend", icon: Workflow, specialty: "High-Throughput APIs", color: "text-indigo-400 group-hover:border-indigo-400/40" },
  { name: "Python / AI", category: "Backend", icon: Cpu, specialty: "LLM Workflows & Pipelines", color: "text-amber-400 group-hover:border-amber-400/40" },

  // Cloud & DevOps
  { name: "Docker", category: "Cloud & DevOps", icon: Boxes, specialty: "Container Standards", color: "text-sky-400 group-hover:border-sky-400/40" },
  { name: "Kubernetes", category: "Cloud & DevOps", icon: Cloud, specialty: "Cluster Orchestration", color: "text-blue-400 group-hover:border-blue-400/40" },
  { name: "AWS & Azure", category: "Cloud & DevOps", icon: Cloud, specialty: "Serverless & Cloud Native", color: "text-orange-400 group-hover:border-orange-400/40" },
  { name: "CI / CD Security", category: "Cloud & DevOps", icon: Shield, specialty: "Automated Deployments", color: "text-teal-400 group-hover:border-teal-400/40" },

  // Data & AI
  { name: "PostgreSQL", category: "Data & AI", icon: Database, specialty: "Relational Core & Vector", color: "text-indigo-400 group-hover:border-indigo-400/40" },
  { name: "Redis", category: "Data & AI", icon: Database, specialty: "In-Memory Caching & PubSub", color: "text-rose-400 group-hover:border-rose-400/40" },
  { name: "Vector DBs", category: "Data & AI", icon: Cpu, specialty: "RAG & Semantic Retrieval", color: "text-violet-400 group-hover:border-violet-400/40" },
  { name: "Kafka / RabbitMQ", category: "Data & AI", icon: Workflow, specialty: "Event-Driven Streams", color: "text-amber-500 group-hover:border-amber-500/40" },
];

const categories = ["All Stacks", "Frontend", "Backend", "Cloud & DevOps", "Data & AI"] as const;

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("All Stacks");

  const filtered = activeCategory === "All Stacks"
    ? technologies
    : technologies.filter((t) => t.category === activeCategory);

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 bg-slate-950 overflow-hidden border-t border-slate-800/80">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-royal-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-blue/10 border border-royal-blue/25 text-cyan-blue text-xs font-semibold mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-blue" />
            <span className="tracking-wide">ENTERPRISE-GRADE TOOLKIT</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18] mb-4">
            Modern Technologies We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-blue via-royal-blue to-purple">
              Master & Deploy
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            We build with battle-tested frameworks and modern standards designed for peak performance, rapid evolution, and enterprise security.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-6 sm:mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-royal-blue to-purple text-white shadow-lg shadow-royal-blue/30 scale-105"
                    : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {filtered.map((t) => (
            <div
              key={t.name}
              className="group relative p-5 sm:p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-md border border-slate-800 hover:border-cyan-blue/40 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-110 transition-transform ${t.color}`}>
                  <t.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700/60">
                  {t.category}
                </span>
              </div>

              <div>
                <h3 className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-cyan-blue transition-colors">
                  {t.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  {t.specialty}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Guarantee Footer */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-400 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/70 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            Have a specialized or proprietary tech stack? We integrate seamlessly with your internal infrastructure.
          </p>
        </div>
      </div>
    </section>
  );
}
