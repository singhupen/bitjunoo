"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Sparkles, TrendingUp } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: "Web App" | "Mobile App" | "Enterprise" | "AI & Cloud";
  tagColor: string;
  metrics: string;
  desc: string;
  stack: string[];
  gradient: string;
  accentBg: string;
}

const projects: Project[] = [
  {
    id: "finsight",
    title: "FinSight Real-Time Analytics",
    category: "Web App",
    tagColor: "bg-cyan-blue/10 text-cyan-blue border-cyan-blue/20",
    metrics: "+180% User Engagement",
    desc: "A sub-second financial intelligence dashboard delivering streaming market insights, automated report generation, and role-based access control.",
    stack: ["Next.js 16", "React 19", "PostgreSQL", "Tailwind CSS"],
    gradient: "from-royal-blue via-deep-blue to-cyan-blue",
    accentBg: "bg-cyan-blue/10",
  },
  {
    id: "shopgo",
    title: "ShopGo Omnichannel Commerce",
    category: "Mobile App",
    tagColor: "bg-teal-500/10 text-teal-300 border-teal-500/20",
    metrics: "2.4x Checkout Conversion",
    desc: "Cross-platform mobile e-commerce application with 1-click biometrics checkout, real-time order tracking, and offline inventory caching.",
    stack: ["React Native", "TypeScript", "Stripe API", "Node.js"],
    gradient: "from-cyan-blue via-teal-600 to-emerald-600",
    accentBg: "bg-teal-500/10",
  },
  {
    id: "teamflow",
    title: "TeamFlow Enterprise Hub",
    category: "Enterprise",
    tagColor: "bg-purple/10 text-purple border-purple/20",
    metrics: "40% Server Latency Reduction",
    desc: "Robust .NET microservices architecture managing multi-tenant team workflows, real-time document collaboration, and compliance auditing for 50,000+ seats.",
    stack: [".NET 9 / C#", "Azure Cloud", "Docker", "gRPC"],
    gradient: "from-purple via-violet to-indigo",
    accentBg: "bg-purple/10",
  },
  {
    id: "nexusai",
    title: "NexusAI Process Automator",
    category: "AI & Cloud",
    tagColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    metrics: "85% Time Saved on Audits",
    desc: "An intelligent document parsing and anomaly detection engine powered by custom LLM pipelines, vector databases, and automated compliance verification.",
    stack: ["Python", "FastAPI", "Vector DB", "AWS Fargate"],
    gradient: "from-emerald-600 via-cyan-blue to-royal-blue",
    accentBg: "bg-emerald-500/10",
  },
];

const filterCategories = ["All Projects", "Web App", "Mobile App", "Enterprise", "AI & Cloud"] as const;

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<string>("All Projects");

  const filtered = activeTab === "All Projects"
    ? projects
    : projects.filter((p) => p.category === activeTab);

  return (
    <section id="portfolio" className="relative py-14 sm:py-20 lg:py-24 bg-slate-950 overflow-hidden border-t border-slate-800/80">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[700px] h-[400px] bg-royal-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-8 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-blue/10 border border-royal-blue/25 text-cyan-blue text-xs font-semibold mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-blue" />
              <span className="tracking-wide">PROVEN CLIENT RESULTS</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18] mb-4">
              Featured Case Studies &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-blue via-royal-blue to-purple">
                Shipped Systems
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore how we engineer scalable architectures that drive measurable business impact for global enterprise clients.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-royal-blue to-purple text-white font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-royal-blue/30 transition-all self-start md:self-end whitespace-nowrap"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8 sm:mb-10">
          {filterCategories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-gradient-to-r from-royal-blue to-purple text-white shadow-lg shadow-royal-blue/30 scale-105"
                  : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group relative bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 hover:border-cyan-blue/40 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Card Media Preview Header */}
              <div className={`relative h-48 sm:h-56 w-full overflow-hidden bg-gradient-to-br ${p.gradient} p-5 sm:p-6 flex flex-col justify-between`}>
                {/* Mockup browser bar */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    <span className="text-[10px] text-white/90 font-mono ml-2 hidden sm:inline">production.bitjunoo.app</span>
                  </div>

                  {/* Category Pill */}
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-950/70 text-white border border-white/20 shadow-sm backdrop-blur-md">
                    {p.category}
                  </span>
                </div>

                {/* Outcome indicator */}
                <div className="relative mt-auto pt-3 flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/20 text-white max-w-xs shadow-lg">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Verified Outcome</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white mt-0.5">{p.metrics}</div>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-slate-950 transition-all duration-300 shadow-lg">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-cyan-blue transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {p.desc}
                  </p>
                </div>

                <div>
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                    {p.stack.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Read case study trigger */}
                  <Link
                    href="/portfolio"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-blue group-hover:text-purple transition-colors"
                  >
                    <span>Request Full Architecture Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Case Studies Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-semibold text-xs sm:text-sm border border-slate-800 hover:border-cyan-blue/40 shadow-xl transition-all"
          >
            <span>Explore All Portfolio Case Studies & Metrics</span>
            <ArrowRight className="w-4 h-4 text-cyan-blue" />
          </Link>
        </div>
      </div>
    </section>
  );
}
