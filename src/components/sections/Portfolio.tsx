"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap, Laptop, Smartphone, Database, ExternalLink } from "lucide-react";

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
  mockupType: "dashboard" | "mobile" | "enterprise" | "ai";
}

const projects: Project[] = [
  {
    id: "finsight",
    title: "FinSight Real-Time Analytics",
    category: "Web App",
    tagColor: "bg-blue-500/10 text-blue-700 border-blue-200",
    metrics: "+180% User Engagement",
    desc: "A sub-second financial intelligence dashboard delivering streaming market insights, automated PDF report generation, and role-based access control.",
    stack: ["Next.js 16", "React 19", "PostgreSQL", "Tailwind CSS"],
    gradient: "from-blue-600 via-indigo-600 to-sky-500",
    accentBg: "bg-blue-500/10",
    mockupType: "dashboard",
  },
  {
    id: "shopgo",
    title: "ShopGo Omnichannel Commerce",
    category: "Mobile App",
    tagColor: "bg-cyan-500/10 text-cyan-700 border-cyan-200",
    metrics: "2.4x Checkout Conversion",
    desc: "Cross-platform mobile e-commerce application with 1-click biometrics checkout, real-time order tracking, and offline inventory caching.",
    stack: ["React Native", "TypeScript", "Stripe API", "Node.js"],
    gradient: "from-cyan-600 via-teal-600 to-emerald-500",
    accentBg: "bg-cyan-500/10",
    mockupType: "mobile",
  },
  {
    id: "teamflow",
    title: "TeamFlow Enterprise Hub",
    category: "Enterprise",
    tagColor: "bg-purple-500/10 text-purple-700 border-purple-200",
    metrics: "40% Server Latency Reduction",
    desc: "Robust .NET microservices architecture managing multi-tenant team workflows, real-time document collaboration, and compliance auditing for 50,000+ seats.",
    stack: [".NET 9 / C#", "Azure Cloud", "Docker", "gRPC"],
    gradient: "from-purple-600 via-violet-600 to-indigo-500",
    accentBg: "bg-purple-500/10",
    mockupType: "enterprise",
  },
  {
    id: "nexusai",
    title: "NexusAI Process Automator",
    category: "AI & Cloud",
    tagColor: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    metrics: "85% Time Saved on Audits",
    desc: "An intelligent document parsing and anomaly detection engine powered by custom LLM pipelines and automated compliance verification.",
    stack: ["Python", "FastAPI", "Vector DB", "AWS Fargate"],
    gradient: "from-emerald-600 via-teal-600 to-cyan-500",
    accentBg: "bg-emerald-500/10",
    mockupType: "ai",
  },
];

const filterCategories = ["All Projects", "Web App", "Mobile App", "Enterprise", "AI & Cloud"] as const;

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<string>("All Projects");

  const filtered = activeTab === "All Projects"
    ? projects
    : projects.filter((p) => p.category === activeTab);

  return (
    <section id="portfolio" className="relative py-10 sm:py-14 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-sky-200/25 rounded-full blur-[140px] pointer-events-none" />

      {/* Reduced padding, wide container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-xs sm:text-sm font-semibold tracking-wide mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>PROVEN CLIENT RESULTS</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mt-1 mb-3">
              Featured Case Studies &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Shipped Systems
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore how we engineer scalable architectures that drive measurable business impact for global clients.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs sm:text-sm hover:bg-blue-600 transition-colors self-start md:self-end shadow-md whitespace-nowrap"
          >
            Start Your Case Study
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
          {filterCategories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  : "bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group relative bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] hover:border-sky-400/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Card Media Preview Header */}
              <div className={`relative h-48 sm:h-52 w-full overflow-hidden bg-gradient-to-br ${p.gradient} p-5 flex flex-col justify-between`}>
                {/* Mockup browser bar */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    <span className="text-[10px] text-white/80 font-mono ml-2 hidden sm:inline">production.bitjunoo.app</span>
                  </div>

                  {/* Category Pill */}
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/90 text-slate-900 shadow-sm backdrop-blur-sm">
                    {p.category}
                  </span>
                </div>

                {/* Simulated UI graphic preview inside card */}
                <div className="relative mt-auto pt-3 flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white max-w-xs shadow-lg">
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <TrendingUp className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Verified Outcome</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white mt-0.5">{p.metrics}</div>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-slate-900 transition-all duration-300 shadow-lg">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {p.desc}
                  </p>
                </div>

                <div>
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                    {p.stack.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Read case study trigger */}
                  <Link
                    href="/portfolio"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-royal-blue group-hover:text-purple transition-colors"
                  >
                    <span>Request Full Architecture Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Case Studies Button */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-xl shadow-slate-950/15 hover:-translate-y-0.5 transition-all"
          >
            <span>Explore All Portfolio Case Studies & Metrics</span>
            <ArrowRight className="w-4 h-4 text-cyan-blue" />
          </Link>
        </div>
      </div>
    </section>
  );
}
