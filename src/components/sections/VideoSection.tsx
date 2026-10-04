import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Bot, Cpu, Zap, ShieldCheck } from 'lucide-react';

export default function VideoSection() {
  return (
    <section className="py-14 sm:py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-royal-blue/5 dark:bg-royal-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-brand-mint/5 dark:bg-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-blue/10 dark:bg-cyan-blue/10 border border-royal-blue/20 dark:border-cyan-blue/25 text-royal-blue dark:text-cyan-blue text-xs font-semibold mb-4 backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-royal-blue dark:text-cyan-blue" />
            <span className="tracking-wide">INNOVATION & AUTONOMOUS SYSTEMS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold font-heading text-slate-900 dark:text-white mb-4 tracking-tight leading-[1.18]">
            Shaping the Future with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue via-brand-azure to-brand-mint">
              Autonomous Intelligence
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Harnessing high-speed vector data pipelines, autonomous LLM agents, and distributed edge computing to build smarter, resilient enterprise applications.
          </p>
        </div>
        
        {/* Console / Video Showcase Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 dark:shadow-2xl dark:shadow-royal-blue/10 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 max-w-5xl mx-auto">
          {/* Top Console Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/90 dark:bg-slate-950/70 text-xs font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-slate-700 dark:text-slate-300 font-semibold hidden sm:inline">ai_pipeline_stream.engine</span>
            </div>
            <div className="flex items-center gap-3 text-royal-blue dark:text-cyan-blue text-[11px]">
              <span className="inline-block w-2 h-2 rounded-full bg-royal-blue dark:bg-cyan-blue animate-pulse" />
              <span>LIVE SYSTEM STREAM</span>
            </div>
          </div>

          <div className="relative group">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-auto object-cover max-h-[480px] opacity-90 transition-transform duration-700 group-hover:scale-[1.02]"
            >
              <source src="/assets/ai-tech.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Desktop Gradient Overlay with Interactive Details */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 flex items-end">
              <div className="p-6 sm:p-10 w-full transform sm:translate-y-2 sm:group-hover:translate-y-0 transition-transform duration-500">
                <div className="max-w-xl">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-blue mb-2">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Real-Time Autonomous Agent Execution</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Next-Gen Intelligent Systems
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 hidden sm:block">
                    Empowering enterprise products with autonomous LLM agents, automated workflow orchestration, and extreme resilience under continuous traffic.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan text-white text-xs sm:text-sm font-semibold shadow-md shadow-royal-blue/30 hover:shadow-royal-blue/50 hover:-translate-y-0.5 transition-all"
                    >
                      <span>Explore AI Capabilities</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 text-slate-300 hover:text-white text-xs sm:text-sm font-medium border border-slate-700 transition-colors"
                    >
                      <span>Consult Principal Architect</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Capability Feature Chips */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3 sm:p-4 bg-slate-50 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
              <Bot className="w-4 h-4 text-royal-blue dark:text-cyan-blue flex-shrink-0" />
              <span className="truncate">Autonomous Agents</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
              <Cpu className="w-4 h-4 text-brand-azure flex-shrink-0" />
              <span className="truncate">Vector Embeddings</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
              <Zap className="w-4 h-4 text-brand-cyan flex-shrink-0" />
              <span className="truncate">Sub-100ms Inference</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span className="truncate">Zero Data Leakage SLA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
