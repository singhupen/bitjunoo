import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Server,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowUpRight,
} from "lucide-react";

export default function AuthVisualSide() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 sm:p-10 lg:p-12 xl:p-14 bg-slate-950 text-white overflow-hidden">
      {/* Ambient background brand glows */}
      <div className="absolute inset-0 hero-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-royal-blue/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-blue/15 rounded-full blur-[110px] pointer-events-none" />

      {/* Top Logo */}
      <div className="relative z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <img
            src="/icon-dark.png"
            alt="BitJunoo Logo"
            className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-white text-lg tracking-tight leading-tight">
              BitJunoo
            </span>
            <span className="text-[10px] font-semibold text-cyan-blue tracking-wider uppercase">
              Digital Engineering
            </span>
          </div>
        </Link>
      </div>

      {/* Center Architecture Telemetry Showcase */}
      <div className="relative z-10 my-8 space-y-6">
        {/* Holographic System Architecture Card */}
        <div className="relative rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 p-6 shadow-2xl overflow-hidden">
          {/* Top terminal status bar */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-emerald-300 font-bold text-[11px]">
                PRODUCTION SYSTEM LIVE
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">
              CLUSTER: US-EAST-01
            </span>
          </div>

          {/* Metric Telemetry Grid */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="text-[10px] uppercase font-semibold text-slate-400 mb-0.5">Latency</div>
              <div className="font-mono text-base font-bold text-cyan-blue">14ms</div>
              <div className="text-[9px] text-emerald-400 mt-0.5">Sub-second SLA</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="text-[10px] uppercase font-semibold text-slate-400 mb-0.5">Uptime</div>
              <div className="font-mono text-base font-bold text-white">99.99%</div>
              <div className="text-[9px] text-emerald-400 mt-0.5">Zero Outages</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="text-[10px] uppercase font-semibold text-slate-400 mb-0.5">Throughput</div>
              <div className="font-mono text-base font-bold text-purple">2.4M/s</div>
              <div className="text-[9px] text-purple/80 mt-0.5">Auto-Scaling</div>
            </div>
          </div>

          {/* Interactive Flow Diagram Nodes */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-royal-blue/10 border border-royal-blue/30 text-xs">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-cyan-blue" />
                <span className="font-medium text-slate-200">Next.js 16 Turbopack Edge SSR</span>
              </div>
              <span className="font-mono text-[10px] text-cyan-300 font-semibold">60 FPS</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple/10 border border-purple/30 text-xs">
              <div className="flex items-center gap-2.5">
                <Server className="w-4 h-4 text-purple" />
                <span className="font-medium text-slate-200">.NET 9 Core Enterprise Microservices</span>
              </div>
              <span className="font-mono text-[10px] text-purple/90 font-semibold">gRPC / REST</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-slate-200">Autonomous LLM Pipelines & Vector DB</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-300 font-semibold">pgvector</span>
            </div>
          </div>
        </div>

        {/* Headline text */}
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 leading-snug">
            Where Systemic Logic{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-blue via-royal-blue to-purple">
              Meets Unstoppable Passion
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Welcome to the BitJunoo engineering console. Securely oversee your production deliverables, sprint velocity, and technical publications.
          </p>
        </div>

        {/* Client Quote Card */}
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300">
          <p className="italic mb-2">
            &ldquo;BitJunoo transformed our legacy platform into a lightning-fast cloud architecture. Delivered 2 weeks ahead of deadline with zero bugs.&rdquo;
          </p>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-white">Sarah Mitchell</span>
            <span className="text-slate-400">CEO, FinSight Technologies</span>
          </div>
        </div>
      </div>

      {/* Bottom Compliance & Security Badges */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>SOC-2 Type II Certified</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Lock className="w-4 h-4 text-cyan-blue" />
          <span>256-Bit SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-purple" />
          <span>Zero Junior Delegation</span>
        </div>
      </div>
    </div>
  );
}
