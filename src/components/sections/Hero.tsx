"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Play, 
  X,
  Cloud,
  Code2,
  Cpu,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Headphones
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-[88vh] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-30 lg:pb-20 overflow-hidden bg-white dark:bg-[#070E1E] transition-colors duration-300"
    >
      {/* ── Global Background Atmospheric Gradients & Shapes ── */}
      {/* Soft blue radial gradient top right */}
      <div 
        className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full pointer-events-none opacity-70 dark:opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(8, 105, 232, 0.12) 0%, rgba(8, 185, 217, 0.06) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      {/* Soft cyan radial gradient bottom left */}
      <div 
        className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full pointer-events-none opacity-60 dark:opacity-35"
        style={{
          background: "radial-gradient(circle, rgba(8, 185, 217, 0.10) 0%, rgba(8, 105, 232, 0.05) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      
      {/* Light Mode Faint blue atmospheric glow in center */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[550px] rounded-[100%] pointer-events-none opacity-60 dark:hidden"
        style={{
          background: "radial-gradient(ellipse at center, rgba(238, 247, 255, 0.85) 0%, rgba(221, 247, 252, 0.3) 50%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />

      {/* Dark Mode Ambient Cyber Glow in center */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[550px] rounded-[100%] pointer-events-none opacity-40 hidden dark:block"
        style={{
          background: "radial-gradient(ellipse at center, rgba(8, 105, 232, 0.25) 0%, rgba(8, 185, 217, 0.12) 50%, transparent 80%)",
          filter: "blur(80px)",
        }}
      />

      {/* Decorative Dot Matrix on Left Bottom (Matching Reference Image) */}
      <div className="absolute left-4 lg:left-8 top-[60%] -translate-y-1/2 pointer-events-none opacity-30 dark:opacity-20 hidden md:block">
        <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
          <pattern id="dot-matrix" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.5" fill="#0869E8" opacity="0.4" />
          </pattern>
          <rect width="64" height="64" fill="url(#dot-matrix)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">

          {/* ══════════════════════════════════════════════════
              LEFT COLUMN: HERO COPY & ACTIONS
             ══════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-[#0B1733]/90 border border-[#DCE8F5] dark:border-slate-800 shadow-[0_2px_12px_rgba(8,105,232,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] self-start mb-4 sm:mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0869E8] dark:bg-[#38bdf8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0869E8] dark:bg-[#38bdf8]" />
              </span>
              <span className="text-xs sm:text-[13px] font-medium text-[#0B1733] dark:text-slate-200 tracking-tight">
                Enterprise IT Consultancy &amp; Digital Engineering
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[54px] 2xl:text-[58px] font-extrabold text-[#0B1733] dark:text-white leading-[1.1] tracking-tight mb-4 sm:mb-5"
            >
              Engineering Powerful{" "}
              <span className="text-[#0869E8] dark:text-[#38bdf8]">
                Digital Systems
              </span>{" "}
              for Scaling Enterprises
            </motion.h1>

            {/* Value Proposition Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.75 }}
              className="text-sm sm:text-base md:text-[17px] text-[#50627D] dark:text-slate-300 leading-relaxed max-w-[620px] mb-6 sm:mb-8 font-normal"
            >
              Bitjuno combines strategic consulting with modern technology to build secure, scalable, and high-performance digital solutions that help businesses grow faster.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10"
            >
              {/* Primary CTA */}
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#0869E8] via-[#168CFF] to-[#08B9D9] text-white font-semibold text-[15px] shadow-[0_10px_25px_rgba(8,105,232,0.25)] hover:shadow-[0_14px_35px_rgba(8,105,232,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary CTA */}
              <button
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white dark:bg-[#0B1733]/80 hover:bg-[#F7FBFF] dark:hover:bg-slate-800 text-[#0B1733] dark:text-white font-semibold text-[15px] border border-[#DCE8F5] dark:border-slate-800 shadow-[0_4px_16px_rgba(11,23,51,0.04)] hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                <span className="w-6 h-6 rounded-full bg-[#EEF7FF] dark:bg-[#0869E8]/20 flex items-center justify-center text-[#0869E8] dark:text-[#38bdf8]">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </span>
                <span>Watch Our Story</span>
              </button>
            </motion.div>

            {/* Hero Metrics Strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.75 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2 pt-6 border-t border-[#DCE8F5]/80 dark:border-slate-800/80 max-w-[640px]"
            >
              {/* Metric 1 */}
              <div className="flex items-center gap-3 pr-2">
                <div className="w-8 h-8 rounded-lg bg-[#EEF7FF] dark:bg-sky-950/50 text-[#0869E8] dark:text-[#38bdf8] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0869E8] dark:text-[#38bdf8] tracking-tight leading-none">
                    150+
                  </div>
                  <div className="text-[12px] font-medium text-[#718198] dark:text-slate-400 mt-1">
                    Projects Delivered
                  </div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center gap-3 sm:border-l sm:border-[#DCE8F5] dark:sm:border-slate-800 sm:pl-3">
                <div className="w-8 h-8 rounded-lg bg-[#EEF7FF] dark:bg-sky-950/50 text-[#0869E8] dark:text-[#38bdf8] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0869E8] dark:text-[#38bdf8] tracking-tight leading-none">
                    99.98%
                  </div>
                  <div className="text-[12px] font-medium text-[#718198] dark:text-slate-400 mt-1">
                    System Uptime
                  </div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center gap-3 sm:border-l sm:border-[#DCE8F5] dark:sm:border-slate-800 sm:pl-3">
                <div className="w-8 h-8 rounded-lg bg-[#EEF7FF] dark:bg-sky-950/50 text-[#0869E8] dark:text-[#38bdf8] flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0869E8] dark:text-[#38bdf8] tracking-tight leading-none">
                    40%
                  </div>
                  <div className="text-[12px] font-medium text-[#718198] dark:text-slate-400 mt-1">
                    Faster Deliveries
                  </div>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="flex items-center gap-3 sm:border-l sm:border-[#DCE8F5] dark:sm:border-slate-800 sm:pl-3">
                <div className="w-8 h-8 rounded-lg bg-[#EEF7FF] dark:bg-sky-950/50 text-[#0869E8] dark:text-[#38bdf8] flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0869E8] dark:text-[#38bdf8] tracking-tight leading-none">
                    24/7
                  </div>
                  <div className="text-[12px] font-medium text-[#718198] dark:text-slate-400 mt-1">
                    Expert Support
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════════════════════════
              RIGHT COLUMN: 3D LAPTOP, GLOBE & FLOATING GLASS CARDS
             ══════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex flex-col items-center justify-center"
          >
            {/* Outer Atmospheric Glow */}
            <div 
              className="absolute inset-0 -m-6 rounded-full pointer-events-none opacity-80"
              style={{
                background: "radial-gradient(circle at 55% 45%, rgba(8, 185, 217, 0.14) 0%, rgba(8, 105, 232, 0.08) 40%, transparent 70%)",
                filter: "blur(50px)",
              }}
            />

            {/* Central Realistic 3D Laptop Visual with Screen & Globe */}
            <div className="relative w-full max-w-[640px] aspect-[4/3] flex items-center justify-center">
              {/* Light Mode 3D Render */}
              <Image
                src="/hero-laptop-globe.jpg"
                alt="Bitjuno High Performance Digital Systems on Modern 3D Laptop"
                width={1024}
                height={768}
                priority
                className="w-full h-auto object-contain select-none drop-shadow-[0_20px_45px_rgba(8,105,232,0.12)] dark:hidden"
              />

              {/* Dark Mode 3D Render */}
              <Image
                src="/hero-laptop-globe-dark.jpg"
                alt="Bitjuno High Performance Digital Systems on Modern 3D Laptop"
                width={1024}
                height={768}
                priority
                className="w-full h-auto object-contain select-none drop-shadow-[0_20px_50px_rgba(8,185,217,0.25)] hidden dark:block"
              />

              {/* ── Desktop & Tablet Floating Glass Service Cards ── */}

              {/* CARD 1 (Top Left): Cloud Solutions */}
              <div
                className="hidden sm:block absolute top-[6%] left-[0%] sm:left-[2%] z-20 animate-float-card-1"
              >
                <div className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-white/92 dark:bg-[#0B1733]/92 backdrop-blur-md border border-[#DCE8F5] dark:border-slate-800 shadow-[0_15px_45px_rgba(30,100,180,0.12)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.5)] hover:border-[#0869E8]/40 hover:-translate-y-1 transition-all group cursor-default">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#0869E8] to-[#08B9D9] flex items-center justify-center text-white shadow-sm shrink-0">
                    <Cloud className="w-4 h-4 sm:w-5 sm:h-5 fill-white/20" />
                  </div>
                  <div className="pr-1">
                    <div className="text-xs sm:text-[13px] font-bold text-[#0B1733] dark:text-white leading-tight">
                      Cloud Solutions
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2 (Bottom Left): Web & App Development */}
              <div
                className="hidden sm:block absolute bottom-[18%] left-[-2%] sm:left-[0%] z-20 animate-float-card-2"
              >
                <div className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-white/92 dark:bg-[#0B1733]/92 backdrop-blur-md border border-[#DCE8F5] dark:border-slate-800 shadow-[0_15px_45px_rgba(30,100,180,0.12)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.5)] hover:border-[#0869E8]/40 hover:-translate-y-1 transition-all group cursor-default">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#0869E8] to-[#168CFF] flex items-center justify-center text-white shadow-sm shrink-0">
                    <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="pr-1">
                    <div className="text-xs sm:text-[13px] font-bold text-[#0B1733] dark:text-white leading-tight">
                      Web &amp; App Development
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 3 (Top Right): AI & Automation */}
              <div
                className="hidden sm:block absolute top-[8%] right-[0%] sm:right-[3%] z-20 animate-float-card-3"
              >
                <div className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-white/92 dark:bg-[#0B1733]/92 backdrop-blur-md border border-[#DCE8F5] dark:border-slate-800 shadow-[0_15px_45px_rgba(30,100,180,0.12)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.5)] hover:border-[#08B9D9]/40 hover:-translate-y-1 transition-all group cursor-default">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#08B9D9] to-[#0869E8] flex items-center justify-center text-white shadow-sm shrink-0">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="pr-1">
                    <div className="text-xs sm:text-[13px] font-bold text-[#0B1733] dark:text-white leading-tight">
                      AI &amp; Automation
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 4 (Bottom Right): IT Consulting */}
              <div
                className="hidden sm:block absolute bottom-[22%] right-[-2%] sm:right-[0%] z-20 animate-float-card-4"
              >
                <div className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-white/92 dark:bg-[#0B1733]/92 backdrop-blur-md border border-[#DCE8F5] dark:border-slate-800 shadow-[0_15px_45px_rgba(30,100,180,0.12)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.5)] hover:border-[#0869E8]/40 hover:-translate-y-1 transition-all group cursor-default">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#168CFF] to-[#08B9D9] flex items-center justify-center text-white shadow-sm shrink-0">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="pr-1">
                    <div className="text-xs sm:text-[13px] font-bold text-[#0B1733] dark:text-white leading-tight">
                      IT Consulting
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Mobile Only: 2x2 Clean Responsive Grid Directly Below Laptop (< 640px) */}
            <div className="sm:hidden grid grid-cols-2 gap-2.5 w-full mt-3">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/95 dark:bg-[#0B1733]/95 border border-[#DCE8F5] dark:border-slate-800 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0869E8] to-[#08B9D9] flex items-center justify-center text-white shrink-0">
                  <Cloud className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] font-bold text-[#0B1733] dark:text-white leading-tight">
                  Cloud Solutions
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/95 dark:bg-[#0B1733]/95 border border-[#DCE8F5] dark:border-slate-800 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0869E8] to-[#168CFF] flex items-center justify-center text-white shrink-0">
                  <Code2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] font-bold text-[#0B1733] dark:text-white leading-tight">
                  Web &amp; App Dev
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/95 dark:bg-[#0B1733]/95 border border-[#DCE8F5] dark:border-slate-800 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#08B9D9] to-[#0869E8] flex items-center justify-center text-white shrink-0">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] font-bold text-[#0B1733] dark:text-white leading-tight">
                  AI &amp; Automation
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/95 dark:bg-[#0B1733]/95 border border-[#DCE8F5] dark:border-slate-800 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#168CFF] to-[#08B9D9] flex items-center justify-center text-white shrink-0">
                  <BarChart3 className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] font-bold text-[#0B1733] dark:text-white leading-tight">
                  IT Consulting
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Video Modal (Watch Our Story) */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white">
                <span className="font-semibold text-sm">Bitjuno — Engineering Digital Systems</span>
                <button
                  onClick={() => setVideoOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                  aria-label="Close video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative aspect-video bg-black">
                <video
                  src="/assets/ai-tech.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}