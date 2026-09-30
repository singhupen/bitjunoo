"use client";

import Link from 'next/link';
import { ArrowRight, Play, Zap, Atom, Server, Hexagon, Database, Boxes, Globe, Terminal, Layers, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Hero3DScene = dynamic(() => import('./Hero3DScene'), { ssr: false });

const stack = [
  { name: "React 19", icon: Atom, position: "top-4 left-2 sm:top-5 sm:left-4", anim: "animate-float" },
  { name: "Next.js 16", icon: Layers, position: "top-2 left-1/2 -translate-x-1/2", anim: "animate-float-delayed" },
  { name: ".NET 9", icon: Server, position: "top-4 right-2 sm:top-5 sm:right-4", anim: "animate-float" },
  { name: "TypeScript", icon: Terminal, position: "top-1/2 -translate-y-1/2 right-1 sm:right-2", anim: "animate-float-delayed" },
  { name: "Cloud / AWS", icon: Globe, position: "bottom-14 right-2 sm:bottom-16 sm:right-4", anim: "animate-float" },
  { name: "Docker", icon: Boxes, position: "bottom-3 left-1/2 -translate-x-1/2", anim: "animate-float-delayed" },
  { name: "PostgreSQL", icon: Database, position: "bottom-14 left-2 sm:bottom-16 sm:left-4", anim: "animate-float" },
  { name: "Node.js", icon: Hexagon, position: "top-1/2 -translate-y-1/2 left-1 sm:left-2", anim: "animate-float-delayed" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => setMounted(true));
    } else {
      setTimeout(() => setMounted(true), 50);
    }
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col justify-center pt-24 pb-10 sm:pt-28 sm:pb-12 overflow-hidden bg-slate-950"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-screen"
      >
        <source src="/assets/ai-tech.mp4" type="video/mp4" />
      </video>

      {/* Modern cybernetic radial lighting with brand colors */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-royal-blue/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/65 to-slate-950/95 z-0 pointer-events-none" />

      {/* High-efficiency container: expanded max-w and tighter horizontal padding */}
      <div className="relative z-10 max-w-[1560px] mx-auto px-3 sm:px-5 lg:px-7 xl:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            {/* Status pill badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-blue/10 border border-cyan-blue/30 text-cyan-blue text-xs font-medium mb-3.5 backdrop-blur-md shadow-[0_0_20px_rgba(5,176,252,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-blue"></span>
              </span>
              <span className="font-semibold tracking-wide">Enterprise IT Consultancy & Digital Engineering</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-white mb-3.5"
            >
              Engineering Powerful{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-blue via-royal-blue to-purple">
                Digital Solutions
              </span>{" "}
              for High-Growth Brands
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-2xl"
            >
              <img src="/icon.png" alt="BitJunoo Logo" className="inline-block h-5 w-auto mx-1 -mt-1" /> crafts high-performance web applications, enterprise-grade backends, and cloud architectures. We bridge strategy with engineering precision to scale your business with speed and security.
            </motion.p>

            {/* Action CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="flex flex-wrap gap-3 items-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-royal-blue via-deep-blue to-purple text-white font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(6,117,250,0.35)] hover:shadow-[0_0_30px_rgba(6,117,250,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white font-medium text-xs sm:text-sm border border-white/15 backdrop-blur-md transition-all duration-200"
              >
                <Play className="w-3.5 h-3.5 text-cyan-blue fill-cyan-blue" />
                Explore Case Studies
              </Link>
            </motion.div>

            {/* Refined Stats Cards */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-5 border-t border-white/10 mt-6 max-w-xl"
            >
              {[
                { value: '150+', label: 'Delivered Projects', sub: 'On-time delivery' },
                { value: '99.8%', label: 'Client Satisfaction', sub: 'Global enterprise trust' },
                { value: '10+ Yrs', label: 'Engineering Depth', sub: 'Modern full-stack' },
              ].map((s) => (
                <div 
                  key={s.label}
                  className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-sky-500/30 transition-colors"
                >
                  <div className="text-xl sm:text-2xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200">
                    {s.value}
                  </div>
                  <div className="text-xs font-medium text-slate-200 mt-0.5">{s.label}</div>
                  <div className="text-[10px] text-sky-400/80 hidden sm:block mt-0.5">{s.sub}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Interactive Canvas & All 8 Floating Tech Badges */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative h-[340px] sm:h-[400px] lg:h-[460px] w-full mt-4 lg:mt-0"
          >
            {/* Ambient Glow behind 3D core */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 via-blue-600/10 to-cyan-400/10 rounded-3xl blur-2xl pointer-events-none" />

            {/* Interactive Hint Badge */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/15 text-[11px] text-slate-300 backdrop-blur-md pointer-events-none select-none">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Interactive 3D Engine • Drag to rotate</span>
            </div>

            {/* Floating Technology Pills in Pure DOM - All 8 Technologies */}
            {stack.map((t) => (
              <div
                key={t.name}
                className={`absolute ${t.position} ${t.anim} z-20 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-slate-950/90 border border-sky-400/35 backdrop-blur-md text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:border-sky-400 hover:text-white transition-all select-none cursor-default`}
              >
                <t.icon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px] sm:text-xs font-semibold whitespace-nowrap">
                  {t.name}
                </span>
              </div>
            ))}

            {/* 3D Canvas guarded by mounted state */}
            {mounted ? (
              <Hero3DScene />
            ) : (
              <div className="w-full h-full flex items-center justify-center opacity-50">
                <div className="w-32 h-32 rounded-full bg-sky-500/10 blur-xl animate-pulse" />
              </div>
            )}
          </motion.div>
        </div>

        {/* Dedicated 8-Technology Architecture Bar */}
        <div className="mt-8 pt-4 border-t border-white/10 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Core Architecture & Tooling Stack:
            </span>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
              {stack.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 hover:border-sky-400/50 hover:bg-sky-500/10 text-slate-300 hover:text-white text-xs font-medium transition-all select-none"
                >
                  <t.icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}