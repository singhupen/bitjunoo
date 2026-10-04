import Link from "next/link";
import { Clock, Calendar, ArrowRight, Sparkles } from "lucide-react";

export default function FeaturedArticle() {
  return (
    <section className="py-6 sm:py-8 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 relative overflow-hidden transition-colors duration-300">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-40 bg-cyan-blue/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-3 sm:px-5 lg:px-7 xl:px-8 relative z-10">
        <div className="relative rounded-2xl overflow-hidden bg-slate-900/90 dark:bg-slate-900/70 border border-royal-blue/30 dark:border-slate-800 hover:border-cyan-blue/40 text-white p-6 sm:p-8 lg:p-9 shadow-2xl backdrop-blur-md transition-all duration-300">
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-blue/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 hero-grid-bg opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-blue/15 border border-cyan-blue/30 text-cyan-blue text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Architecture Breakdown
              </span>
              <span className="text-xs text-slate-300 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 8 min read
              </span>
              <span className="text-xs text-slate-300 dark:text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Published Sep 2026
              </span>
            </div>

            {/* Title */}
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-2.5 leading-snug">
              Architecting High-Throughput .NET 9 Microservices with Next.js 16 Frontends: Lessons from 10M Daily Events
            </h2>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 leading-relaxed mb-5">
              A comprehensive deep-dive into how we designed an event-driven system using C# and .NET 9, Kafka message streaming, and Next.js 16 Server Components to achieve deterministic sub-40ms query latencies under sustained peak load.
            </p>

            {/* Author and Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-700/80 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-royal-blue to-purple flex items-center justify-center font-bold text-white text-xs border border-white/20">
                  BJ
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">BitJunoo Core Architecture Pod</div>
                  <div className="text-[11px] text-slate-300 dark:text-slate-400">Principal Systems Architects</div>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-royal-blue to-cyan-blue text-white text-xs sm:text-sm font-bold shadow-md shadow-cyan-blue/20 hover:shadow-cyan-blue/40 hover:-translate-y-0.5 transition-all"
              >
                <span>Read Full Technical Paper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
