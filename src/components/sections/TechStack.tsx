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
  { name: "React 19", category: "Frontend", icon: Atom, specialty: "Concurrent UI & Hooks", color: "text-sky-500 group-hover:border-sky-500/40" },
  { name: "Next.js 16", category: "Frontend", icon: Layers, specialty: "Turbopack & Edge SSR", color: "text-slate-800 group-hover:border-slate-800/40" },
  { name: "TypeScript", category: "Frontend", icon: Terminal, specialty: "Type-Safe Architecture", color: "text-blue-500 group-hover:border-blue-500/40" },
  { name: "Tailwind CSS", category: "Frontend", icon: Globe, specialty: "Modern Design Systems", color: "text-cyan-500 group-hover:border-cyan-500/40" },

  // Backend
  { name: ".NET 9 / C#", category: "Backend", icon: Server, specialty: "Enterprise Microservices", color: "text-purple-600 group-hover:border-purple-600/40" },
  { name: "Node.js", category: "Backend", icon: Hexagon, specialty: "Asynchronous I/O & Event Loops", color: "text-emerald-600 group-hover:border-emerald-600/40" },
  { name: "gRPC & REST", category: "Backend", icon: Workflow, specialty: "High-Throughput APIs", color: "text-indigo-500 group-hover:border-indigo-500/40" },
  { name: "Python / AI", category: "Backend", icon: Cpu, specialty: "LLM Workflows & Automation", color: "text-amber-500 group-hover:border-amber-500/40" },

  // Cloud & DevOps
  { name: "Docker", category: "Cloud & DevOps", icon: Boxes, specialty: "Container Standards", color: "text-sky-600 group-hover:border-sky-600/40" },
  { name: "Kubernetes", category: "Cloud & DevOps", icon: Cloud, specialty: "Cluster Orchestration", color: "text-blue-600 group-hover:border-blue-600/40" },
  { name: "AWS & Azure", category: "Cloud & DevOps", icon: Cloud, specialty: "Serverless & Cloud Native", color: "text-orange-500 group-hover:border-orange-500/40" },
  { name: "CI / CD Security", category: "Cloud & DevOps", icon: Shield, specialty: "Automated Deployments", color: "text-teal-600 group-hover:border-teal-600/40" },

  // Data & AI
  { name: "PostgreSQL", category: "Data & AI", icon: Database, specialty: "Relational Core & Vector", color: "text-indigo-600 group-hover:border-indigo-600/40" },
  { name: "Redis", category: "Data & AI", icon: Database, specialty: "In-Memory Caching & PubSub", color: "text-red-500 group-hover:border-red-500/40" },
  { name: "Vector DBs", category: "Data & AI", icon: Cpu, specialty: "RAG & Semantic Retrieval", color: "text-violet-500 group-hover:border-violet-500/40" },
  { name: "Kafka / RabbitMQ", category: "Data & AI", icon: Workflow, specialty: "Event-Driven Streams", color: "text-amber-600 group-hover:border-amber-600/40" },
];

const categories = ["All Stacks", "Frontend", "Backend", "Cloud & DevOps", "Data & AI"] as const;

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("All Stacks");

  const filtered = activeCategory === "All Stacks"
    ? technologies
    : technologies.filter((t) => t.category === activeCategory);

  return (
    <section className="relative py-24 sm:py-28 overflow-hidden bg-slate-900/5">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-blue-100/50 rounded-full blur-[140px] pointer-events-none" />

      {/* Reduced padding, wide container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>ENTERPRISE-GRADE TOOLKIT</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mt-2 mb-5">
            Modern Technologies We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Master & Deploy
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We build with battle-tested frameworks and modern standards designed for performance, rapid evolution, and enterprise security.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105"
                    : "bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((t) => (
            <div
              key={t.name}
              className={`group relative p-5 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_-6px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform ${t.color}`}>
                  <t.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                  {t.category}
                </span>
              </div>

              <div>
                <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {t.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-normal">
                  {t.specialty}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Guarantee Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-500 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 border border-slate-200/70">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            Have a specialized or proprietary tech stack? We integrate seamlessly with your internal platforms.
          </p>
        </div>
      </div>
    </section>
  );
}
