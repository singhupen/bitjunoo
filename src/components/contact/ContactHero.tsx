import React from "react";
import { Sparkles, Zap, Users, ShieldCheck } from "lucide-react";

export default function ContactHero() {
  const highlights = [
    { icon: Zap, title: "Quick Response", desc: "Within 2 business hours" },
    { icon: Users, title: "Talk to Senior Engineers", desc: "No sales representatives" },
    { icon: ShieldCheck, title: "Confidential & Secure", desc: "Your data is 100% safe" },
  ];

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-blue-100 dark:border-cyan-blue/30 text-blue-600 dark:text-cyan-blue text-xs font-bold tracking-wide mb-8 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span className="uppercase">CONTACT US</span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]">
              Let&apos;s Engineer Your Next<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0869E8] to-[#08B9D9]">Digital Breakthrough</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mb-10">
              Share your project idea with us. Our principal engineers will get back to you with feasibility insights, architecture guidance, and a tailored proposal.
            </p>

            {/* Highlights */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-cyan-blue/10 flex items-center justify-center text-blue-600 dark:text-cyan-blue shrink-0 border border-blue-100 dark:border-cyan-blue/20">
                    <item.icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-slate-900 dark:text-white leading-tight mb-0.5">
                      {item.title}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full">
              <img 
                src="/assets/3D-Email.png" 
                alt="Email Illustration"
                className="w-full max-w-lg lg:max-w-[120%] h-auto object-contain drop-shadow-2xl mx-auto -mr-4 lg:-mr-12"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
