import { ArrowRight, Mail, Phone, Calendar, ShieldCheck, Clock, Sparkles } from "lucide-react";

export default function CTABanner() {
  return (
    <section id="contact" className="relative py-24 sm:py-28 overflow-hidden">
      {/* Reduced padding, wide container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-sky-500/25 p-8 sm:p-14 lg:p-16 shadow-[0_25px_60px_-15px_rgba(2,132,199,0.3)]">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 hero-grid-bg opacity-20 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs sm:text-sm font-semibold tracking-wide mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>RAPID TECHNICAL DISCOVERY & ARCHITECTURE REVIEW</span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
              Ready to Accelerate Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                Digital Engineering?
              </span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              Schedule a technical discovery session with our principal engineers. We review your requirements, assess feasibility, and provide actionable architecture insights — no pushy sales, just high-caliber technical dialogue.
            </p>

            {/* Guarantee checklist */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 mb-10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Strict Mutual NDA Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>2-Hour Average Response SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Free Architectural Roadmap</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:hello@bitjunoo.com"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-bold text-base shadow-[0_0_30px_rgba(14,165,233,0.4)] hover:shadow-[0_0_45px_rgba(14,165,233,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Calendar className="w-5 h-5" />
                Schedule Free Technical Call
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="mailto:hello@bitjunoo.com"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-base border border-white/20 backdrop-blur-md hover:border-white/40 transition-all duration-200"
              >
                <Mail className="w-5 h-5 text-cyan-400" />
                hello@bitjunoo.com
              </a>

              <a
                href="tel:+918882434777"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white font-medium text-base border border-white/10 backdrop-blur-md transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                +91-88824 34777
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
