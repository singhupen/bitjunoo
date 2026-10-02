import Link from "next/link";
import { ArrowRight, Calendar, ShieldCheck, Clock, Sparkles } from "lucide-react";

interface CTASectionProps {
  title?: string;
  highlight?: string;
  description?: string;
  buttonText?: string;
}

export default function CTASection({
  title = "Ready to Build Something",
  highlight = "Extraordinary Together?",
  description = "Schedule a technical discovery session with our senior software architects. We provide immediate architectural insights, scoping estimates, and an execution roadmap.",
  buttonText = "Schedule Technical Call",
}: CTASectionProps) {
  return (
    <section className="relative py-10 sm:py-14 bg-slate-950 overflow-hidden border-t border-slate-800/80">
      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-royal-blue/20 border border-royal-blue/30 p-6 sm:p-9 lg:p-10 shadow-2xl">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-royal-blue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 hero-grid-bg opacity-15 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-blue/10 border border-cyan-blue/30 text-cyan-blue text-xs font-semibold tracking-wide mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-blue" />
              <span>RAPID TECHNICAL CONSULTATION</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2.5">
              {title}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-blue via-royal-blue to-purple">
                {highlight}
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 max-w-2xl mx-auto">
              {description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-slate-300 mb-6">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mutual NDA Protected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-blue" />
                <span>2-Hour Average Response SLA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple" />
                <span>Free Architectural Roadmap</span>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-center items-center">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-royal-blue via-deep-blue to-purple text-white font-semibold text-xs sm:text-sm shadow-md shadow-royal-blue/30 hover:shadow-royal-blue/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
