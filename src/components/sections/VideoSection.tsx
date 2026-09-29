import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function VideoSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-cyan-blue/10 border border-cyan-blue/25 text-cyan-blue text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            INNOVATION & AI INTEGRATION
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 mb-4 tracking-tight">
            Shaping the Future with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue via-deep-blue to-purple">
              Autonomous Intelligence
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Experience our vision for seamless technological integration. We harness the power of artificial intelligence, vector data pipelines, and distributed cloud computing to build smarter, faster digital solutions.
          </p>
        </div>
        
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-royal-blue/10 border border-slate-200 group max-w-5xl mx-auto">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover max-h-[580px] transition-transform duration-700 group-hover:scale-105"
          >
            <source src="/assets/ai-tech.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-end">
            <div className="p-8 sm:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-bold text-white mb-2">Next-Gen Intelligent Systems</h3>
              <p className="text-slate-300 text-sm max-w-lg mb-4">Empowering enterprise products with autonomous LLM agents, automated workflow orchestration, and extreme resilience.</p>
              <div className="pointer-events-auto">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-royal-blue text-white text-xs sm:text-sm font-bold shadow-md hover:bg-royal-blue/90 transition-colors"
                >
                  Explore AI Capabilities
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
