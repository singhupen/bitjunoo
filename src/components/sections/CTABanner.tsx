"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Users,
  FileText,
  BarChart3,
  Settings,
  Box,
  Code2
} from "lucide-react";

export default function CTABanner() {
  return (
    <section id="contact" className="relative py-14 sm:py-20 lg:py-24 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Main Banner Container */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#F8FAFC] dark:bg-slate-900 border border-[#E6F0F9] dark:border-slate-800 p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(8,105,232,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          
          {/* Background Decorative SVG Waves */}
          <div className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-20 z-0">
            {/* SVG Wave Graphic matching the image (simplified CSS/radial gradients to simulate the dynamic wave) */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#E8F2FC] dark:bg-[#0a1122] rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#E8F2FC] dark:bg-[#0a1122] rounded-full blur-[100px]" />
            <div className="absolute top-[20%] right-[30%] w-[400px] h-[400px] bg-[#EEF7FF] dark:bg-[#0a1122] rounded-full blur-[80px]" />
          </div>

          {/* Grid Layout: Left Content & Right Image */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              
              {/* Top pill badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF7FF] dark:bg-[#0a1122] border border-[#DCE8F5] dark:border-slate-800 text-[#0869E8] dark:text-[#38bdf8] text-[11px] font-bold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>RAPID TECHNICAL DISCOVERY & ARCHITECTURE REVIEW</span>
              </div>

              {/* Headline */}
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#0B1733] dark:text-white tracking-tight leading-[1.12]">
                Ready to Accelerate Your{" "}
                <br className="hidden sm:block" />
                <span className="text-[#0869E8] dark:text-[#38bdf8]">
                  Digital Engineering?
                </span>
              </h2>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl font-medium">
                Schedule a technical discovery session with our principal engineers. We review your requirements, assess feasibility, and provide actionable architecture insights — no pushy sales, just high-caliber technical dialogue.
              </p>

              {/* 4 Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl pt-2">
                {/* Badge 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF7FF] dark:bg-[#0a1122] border border-[#DCE8F5] dark:border-slate-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#0869E8] dark:text-[#38bdf8]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">Strict Mutual</div>
                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">NDA Protected</div>
                  </div>
                </div>

                {/* Badge 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF7FF] dark:bg-[#0a1122] border border-[#DCE8F5] dark:border-slate-800 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#0869E8] dark:text-[#38bdf8]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">2-Hour Average</div>
                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">Response SLA</div>
                  </div>
                </div>

                {/* Badge 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF7FF] dark:bg-[#0a1122] border border-[#DCE8F5] dark:border-slate-800 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-[#0869E8] dark:text-[#38bdf8]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">Free Architectural</div>
                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">Roadmap</div>
                  </div>
                </div>

                {/* Badge 4 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF7FF] dark:bg-[#0a1122] border border-[#DCE8F5] dark:border-slate-800 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-[#0869E8] dark:text-[#38bdf8]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">Expert Engineers</div>
                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">Technical Review</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 pt-4 w-full">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0869E8] to-[#08B9D9] text-white font-bold text-[13px] shadow-[0_10px_20px_rgba(8,105,232,0.25)] hover:shadow-[0_15px_25px_rgba(8,105,232,0.35)] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Free Technical Call</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="mailto:hello@bitjunoo.com"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-white font-bold text-[13px] border border-[#E6F0F9] dark:border-slate-700 shadow-sm hover:shadow-md hover:border-[#0869E8]/40 transition-all duration-200 whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 text-[#0869E8] dark:text-[#38bdf8]" />
                  <span>hello@bitjunoo.com</span>
                </a>

                <a
                  href="tel:+918882434777"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-white font-bold text-[13px] border border-[#E6F0F9] dark:border-slate-700 shadow-sm hover:shadow-md hover:border-[#0869E8]/40 transition-all duration-200 whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#0869E8] dark:text-[#38bdf8]" />
                  <span>+91-88824 34777</span>
                </a>
              </div>

            </div>

            {/* RIGHT COLUMN: Visuals */}
            <div className="lg:col-span-5 relative flex items-center justify-center mt-10 lg:mt-0">
              
              {/* Laptop Image */}
              <div className="relative w-full max-w-[500px] z-10">
                <Image
                  src="/Laptop-Cloud-Network.png"
                  alt="Bitjuno Digital Engineering"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(8,105,232,0.2)]"
                />
              </div>

              {/* Floating Pill 1 (Top Left) */}
              <div className="absolute top-[10%] left-[-5%] sm:left-[-10%] z-20 animate-float-card-1 hidden sm:flex">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-[#E6F0F9] dark:border-slate-700 shadow-[0_10px_30px_rgba(8,105,232,0.1)]">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF7FF] dark:bg-slate-900 flex items-center justify-center text-[#0869E8] dark:text-[#38bdf8] shrink-0">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight pr-2">
                    Requirements<br/>Analysis
                  </div>
                </div>
              </div>

              {/* Floating Pill 2 (Bottom Left) */}
              <div className="absolute bottom-[20%] left-[-5%] sm:left-[-15%] z-20 animate-float-card-2 hidden sm:flex">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-[#E6F0F9] dark:border-slate-700 shadow-[0_10px_30px_rgba(8,105,232,0.1)]">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF7FF] dark:bg-slate-900 flex items-center justify-center text-[#08B9D9] dark:text-[#38bdf8] shrink-0">
                    <Settings className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight pr-2">
                    Solution<br/>Design
                  </div>
                </div>
              </div>

              {/* Floating Pill 3 (Top Right) */}
              <div className="absolute top-[5%] right-[-5%] sm:right-[-10%] z-20 animate-float-card-3 hidden sm:flex">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-[#E6F0F9] dark:border-slate-700 shadow-[0_10px_30px_rgba(8,105,232,0.1)]">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF7FF] dark:bg-slate-900 flex items-center justify-center text-[#0869E8] dark:text-[#38bdf8] shrink-0">
                    <Box className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight pr-2">
                    System<br/>Architecture
                  </div>
                </div>
              </div>

              {/* Floating Pill 4 (Bottom Right) */}
              <div className="absolute bottom-[15%] right-[-5%] sm:right-[-15%] z-20 animate-float-card-4 hidden sm:flex">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-[#E6F0F9] dark:border-slate-700 shadow-[0_10px_30px_rgba(8,105,232,0.1)]">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF7FF] dark:bg-slate-900 flex items-center justify-center text-[#168CFF] dark:text-[#38bdf8] shrink-0">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight pr-2">
                    Implementation<br/>Roadmap
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
