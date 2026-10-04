"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Play, 
  Atom, 
  Server, 
  Hexagon, 
  Database, 
  Boxes, 
  Globe, 
  Terminal, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Activity,
  CheckCircle2,
  Cpu
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Hero3DScene = dynamic(() => import("./Hero3DScene"), { ssr: false });

const stack = [
  { name: "React 19", icon: Atom, category: "Frontend" },
  { name: "Next.js 16", icon: Layers, category: "Framework" },
  { name: ".NET 9", icon: Server, category: "Backend" },
  { name: "TypeScript", icon: Terminal, category: "Core" },
  { name: "AWS & Cloud", icon: Globe, category: "DevOps" },
  { name: "Docker", icon: Boxes, category: "Containers" },
  { name: "PostgreSQL", icon: Database, category: "Database" },
  { name: "Node.js", icon: Hexagon, category: "Runtime" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => setMounted(true));
      } else {
        setTimeout(() => setMounted(true), 60);
      }
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300"
    >
      {/* Dynamic Ambient Lighting Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-b from-royal-blue/10 via-brand-cyan/5 to-transparent dark:from-royal-blue/15 dark:via-purple/10 dark:to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] bg-brand-cyan/10 dark:bg-cyan-blue/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[480px] h-[480px] bg-brand-mint/10 dark:bg-purple/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern with Smooth Radial Mask */}
      <div 
        className="absolute inset-0 opacity-[0.18] dark:opacity-[0.14] pointer-events-none hero-grid-bg [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" 
      />

      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Live Status Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-royal-blue/20 dark:border-cyan-blue/30 text-royal-blue dark:text-cyan-blue text-xs font-semibold mb-4 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(5,176,252,0.15)] self-start"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal-blue dark:bg-cyan-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-royal-blue dark:bg-cyan-blue"></span>
              </span>
              <span className="tracking-wide">Enterprise IT Consultancy & Digital Engineering</span>
              <span className="hidden sm:inline-block text-slate-500 font-mono text-[10px]">| v2.4</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-4 sm:mb-5"
            >
              Engineering Powerful{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue via-brand-cyan to-brand-mint">
                Digital Systems
              </span>{" "}
              for Scaling Enterprises
            </motion.h1>

            {/* Subtitle / Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-6 sm:mb-8 font-normal"
            >
              BitJunoo unites rigorous software architecture (<span className="text-royal-blue font-semibold">Bit</span>) with relentless execution drive (<span className="text-brand-cyan dark:text-brand-mint font-semibold">Junoo</span>). We craft high-throughput web apps, resilient .NET backends, and cloud microservices built for extreme reliability.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan text-white font-semibold text-sm shadow-[0_4px_20px_rgba(0,100,218,0.3)] dark:shadow-[0_0_25px_rgba(6,117,250,0.35)] hover:shadow-[0_6px_25px_rgba(0,100,218,0.45)] dark:hover:shadow-[0_0_35px_rgba(6,117,250,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 dark:bg-slate-900/80 dark:hover:bg-slate-800/90 dark:text-slate-200 dark:hover:text-white font-medium text-sm border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-500 backdrop-blur-md transition-all duration-200 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 text-royal-blue dark:text-cyan-blue fill-royal-blue dark:fill-cyan-blue" />
                <span>Explore Case Studies</span>
              </Link>
            </motion.div>

            {/* Trust Assurances */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 text-xs text-slate-600 dark:text-slate-400 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800/80"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>Strict Mutual NDA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-royal-blue dark:text-cyan-blue" />
                <span>Senior Principal Engineers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-brand-azure dark:text-purple" />
                <span>48h Architecture Review</span>
              </div>
            </motion.div>

            {/* Stat Counters */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-xl"
            >
              <div className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-sm hover:border-royal-blue/40 transition-colors shadow-xs">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan dark:from-white dark:via-sky-100 dark:to-cyan-300">
                  150+
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">Shipped Systems</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block mt-0.5">Global Enterprise Trust</div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-sm hover:border-cyan-blue/40 transition-colors shadow-xs">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-brand-azure via-brand-cyan to-brand-mint dark:from-cyan-300 dark:via-sky-200 dark:to-white">
                  99.98%
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">High-Availability SLA</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block mt-0.5">Zero-Downtime Microservices</div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-sm hover:border-brand-mint/40 transition-colors shadow-xs">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-teal to-brand-mint dark:from-purple dark:via-violet-300 dark:to-white">
                  40%
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">Latency Reduction</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block mt-0.5">High-Throughput APIs</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Cybernetic Glass Control Deck & 3D Interactive Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative mt-4 lg:mt-0"
          >
            {/* Control Deck Frame */}
            <div className="relative rounded-3xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/90 shadow-xl shadow-slate-200/50 dark:shadow-[0_20px_60px_-15px_rgba(0,100,218,0.2)] backdrop-blur-xl overflow-hidden p-3.5 sm:p-5">
              
              {/* Terminal HUD Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 ml-1">SYSTEM_TELEMETRY</span>
                </div>
                <div className="flex items-center gap-2 text-royal-blue dark:text-cyan-blue">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-royal-blue dark:bg-cyan-blue animate-pulse" />
                  <span>CORE: ONLINE</span>
                </div>
              </div>

              {/* 3D Canvas Container */}
              <div className="relative h-[290px] sm:h-[350px] lg:h-[390px] w-full rounded-2xl bg-slate-100/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/50 overflow-hidden flex items-center justify-center">
                {/* Subtle internal lighting */}
                <div className="absolute inset-0 bg-gradient-to-tr from-royal-blue/10 dark:from-royal-blue/15 via-transparent to-brand-mint/10 dark:to-purple/15 pointer-events-none" />

                {/* Desktop Interactive Rotation Hint */}
                <div className="absolute top-2 right-2 z-20 hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-[10px] text-slate-700 dark:text-slate-300 backdrop-blur-md pointer-events-none select-none shadow-xs">
                  <Sparkles className="w-3 h-3 text-brand-cyan" />
                  <span>Interactive 3D Core</span>
                </div>

                {/* 3D Scene */}
                {mounted ? (
                  <Hero3DScene />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-full border-2 border-royal-blue/30 border-t-royal-blue dark:border-cyan-blue/30 dark:border-t-cyan-blue animate-spin" />
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Initializing 3D Telemetry...</span>
                  </div>
                )}
              </div>

              {/* Bottom Telemetry Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-center font-mono text-[10px]">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60 shadow-xs">
                  <div className="text-slate-500 dark:text-slate-400">LATENCY</div>
                  <div className="text-royal-blue dark:text-cyan-blue font-bold mt-0.5">12ms (Edge)</div>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60 shadow-xs">
                  <div className="text-slate-500 dark:text-slate-400">ENCRYPTION</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">AES-256 GCM</div>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60 shadow-xs">
                  <div className="text-slate-500 dark:text-slate-400">DEPLOYMENT</div>
                  <div className="text-brand-azure dark:text-purple font-bold mt-0.5">Multi-Region</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Architecture & Tooling Stack Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-12 sm:mt-16 pt-6 border-t border-slate-200 dark:border-slate-800/80 w-full"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              <Cpu className="w-4 h-4 text-royal-blue dark:text-cyan-blue" />
              <span>Core Enterprise Architecture & Tooling:</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 w-full lg:w-auto">
              {stack.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-center sm:justify-start gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-royal-blue/40 dark:hover:border-cyan-blue/40 hover:bg-white dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white text-xs font-medium transition-all select-none shadow-xs"
                >
                  <t.icon className="w-3.5 h-3.5 text-royal-blue dark:text-cyan-blue flex-shrink-0" />
                  <span className="whitespace-nowrap">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}