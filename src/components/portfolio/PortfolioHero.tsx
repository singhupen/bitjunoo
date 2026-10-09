import React from "react";
import { Sparkles } from "lucide-react";

export default function PortfolioHero() {
  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-slate-50/50 dark:bg-slate-950">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-20 dark:opacity-5 pointer-events-none" />
      
      {/* Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-royal-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-royal-blue/20 dark:border-cyan-blue/30 text-royal-blue dark:text-cyan-blue text-xs font-bold tracking-wide mb-8 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span className="uppercase">ENGINEERING CASE STUDIES</span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]">
              Production Systems Built<br />
              for <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-brand-cyan">Non-Linear Scale</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Explore how our senior engineering pods architect and deliver high-concurrency systems across Fintech, Logistics, Healthcare, and Enterprise AI.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full">
              <img 
                src="/portfolio/Cloud-Server-Network.png" 
                alt="Cloud Server Network Architecture"
                className="w-full max-w-lg lg:max-w-full h-auto object-contain drop-shadow-xl mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
