import Link from "next/link";
import { ArrowRight, Mail, Phone, Calendar, ShieldCheck, Clock, Sparkles } from "lucide-react";

export default function CTABanner() {
  return (
    <section id="contact" className="relative py-14 sm:py-20 lg:py-24 bg-slate-950 overflow-hidden border-t border-slate-800/80">
      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-royal-blue/25 border border-royal-blue/30 p-7 sm:p-12 lg:p-16 shadow-[0_25px_60px_-15px_rgba(6,117,250,0.25)]">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-blue/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple/15 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 hero-grid-bg opacity-15 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-blue/10 border border-cyan-blue/30 text-cyan-blue text-xs font-semibold mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-blue" />
              <span className="tracking-wide">RAPID TECHNICAL DISCOVERY & ARCHITECTURE REVIEW</span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-[1.18]">
              Ready to Accelerate Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-blue via-royal-blue to-purple">
                Digital Engineering?
              </span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
              Schedule a technical discovery session with our principal engineers. We review your requirements, assess feasibility, and provide actionable architecture insights — no pushy sales, just high-caliber technical dialogue.
            </p>

            {/* Guarantee checklist */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 mb-8">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Strict Mutual NDA Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-blue" />
                <span>2-Hour Average Response SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple" />
                <span>Free Architectural Roadmap</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-royal-blue via-deep-blue to-purple text-white font-semibold text-xs sm:text-sm shadow-[0_0_30px_rgba(6,117,250,0.4)] hover:shadow-[0_0_45px_rgba(6,117,250,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Free Technical Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="mailto:hello@bitjunoo.com"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm border border-slate-700/80 hover:border-cyan-blue/40 backdrop-blur-md transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-cyan-blue" />
                <span>hello@bitjunoo.com</span>
              </a>

              <a
                href="tel:+918882434777"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white font-medium text-xs sm:text-sm border border-slate-800 backdrop-blur-md transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91-88824 34777</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
