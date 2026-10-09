import React from "react";
import { Sparkles, Users, Layers, Globe, ShieldCheck } from "lucide-react";

export default function AboutHero() {
  const stats = [
    { icon: Users, value: "8+", label: "Years of Experience" },
    { icon: Layers, value: "150+", label: "Projects Delivered" },
    { icon: Globe, value: "30+", label: "Global Clients" },
    { icon: ShieldCheck, value: "99.9%", label: "Client Satisfaction" },
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-royal-blue/20 dark:border-cyan-blue/30 text-royal-blue dark:text-cyan-blue text-xs font-bold tracking-wide mb-8 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span className="uppercase">ABOUT BITJUNOO</span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]">
              Pioneering the Next Era of<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-brand-cyan">Digital Engineering</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mb-10">
              We are a senior-led technical consultancy that builds resilient, high-speed software architectures for forward-thinking enterprises and venture-backed startups.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-cyan-blue/10 flex items-center justify-center text-blue-500 dark:text-cyan-blue mb-2 transition-transform group-hover:scale-110">
                    <stat.icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white leading-tight font-heading">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full">
              <img 
                src="/assets/Orbital-Tech-Hub.png" 
                alt="Orbital Tech Hub"
                className="w-full max-w-lg lg:max-w-full h-auto object-contain drop-shadow-xl mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
