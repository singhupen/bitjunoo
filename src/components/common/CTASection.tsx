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
    <section className="relative py-10 sm:py-14 overflow-hidden">
      <div className="relative z-10 max-w-[1560px] mx-auto px-3 sm:px-5 lg:px-7 xl:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-deep-blue/40 border border-royal-blue/30 p-6 sm:p-9 lg:p-10 shadow-[0_20px_50px_-15px_rgba(9,67,244,0.3)]">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-royal-blue/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 hero-grid-bg opacity-15 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-blue/10 border border-cyan-blue/30 text-cyan-blue text-xs font-semibold tracking-wide mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RAPID TECHNICAL CONSULTATION</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
              {title}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-blue via-royal-blue to-purple">
                {highlight}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-2xl mx-auto">
              {description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 mb-6">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-blue" />
                <span>Mutual NDA Protected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-blue" />
                <span>2-Hour Average Response</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-blue" />
                <span>Free Architectural Roadmap</span>
              </div>
            </div>

            {/* Button */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-royal-blue via-deep-blue to-purple text-white font-bold text-sm shadow-[0_0_25px_rgba(6,117,250,0.35)] hover:shadow-[0_0_35px_rgba(6,117,250,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                {buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
