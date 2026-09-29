import Link from "next/link";
import { Clock, Calendar, ArrowRight, Sparkles, BookOpen } from "lucide-react";

export default function FeaturedArticle() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-royal-blue/30 border border-royal-blue/30 text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-blue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 hero-grid-bg opacity-15 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-blue/20 border border-cyan-blue/35 text-cyan-blue text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Architecture Breakdown
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 8 min read
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Published September 2026
              </span>
            </div>

            {/* Title */}
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Architecting High-Throughput .NET 9 Microservices with Next.js 16 Frontends: Lessons from 10M Daily Events
            </h2>

            {/* Summary */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              A comprehensive deep-dive into how we designed an event-driven system using C# and .NET 9, Kafka message streaming, and Next.js 16 Server Components to achieve deterministic sub-40ms query latencies under sustained peak load.
            </p>

            {/* Author and Action */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-royal-blue to-purple flex items-center justify-center font-bold text-white text-sm">
                  BJ
                </div>
                <div>
                  <div className="text-sm font-bold text-white">BitJunoo Core Architecture Team</div>
                  <div className="text-xs text-slate-400">Principal Systems Architects</div>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-royal-blue to-cyan-blue text-white text-xs sm:text-sm font-bold shadow-lg shadow-royal-blue/30 hover:shadow-royal-blue/50 hover:-translate-y-0.5 transition-all"
              >
                <span>Read Full Technical Paper</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
