import { Quote, Star, ShieldCheck, CheckCircle2, Award, Sparkles } from "lucide-react";

const testimonials = [
  {
    quote:
      "BitJunoo transformed our legacy financial system into a lightning-fast modern cloud platform. Their senior engineers delivered 2 weeks ahead of our strict regulatory deadline, and our user engagement doubled within the first quarter.",
    name: "Sarah Mitchell",
    role: "CEO & Co-Founder",
    company: "FinSight Technologies",
    initials: "SM",
    projectTag: "Fintech Platform Modernization",
    gradient: "from-blue-600 to-sky-500",
    rating: 5,
  },
  {
    quote:
      "The mobile application BitJunoo engineered exceeded our highest expectations. Flawless animations, native speed, zero crashes, and immediate App Store approval. They genuinely take ownership of product architecture.",
    name: "James Okoro",
    role: "Founder & Head of Product",
    company: "ShopGo Mobile",
    initials: "JO",
    projectTag: "Cross-Platform Mobile App",
    gradient: "from-cyan-600 to-teal-500",
    rating: 5,
  },
  {
    quote:
      "We brought in BitJunoo to rebuild our core .NET backend microservices. The results were stellar: 40% reduction in query latencies and effortless auto-scaling during peak black Friday traffic. Their engineering rigor is unmatched.",
    name: "Emily Chen",
    role: "VP of Engineering",
    company: "TeamFlow Inc.",
    initials: "EC",
    projectTag: "Enterprise .NET Microservices",
    gradient: "from-purple-600 to-indigo-500",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-28 overflow-hidden bg-slate-900/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-cyan-100/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Reduced padding, wide container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>REAL CLIENT TESTIMONIALS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mt-2 mb-5">
            Endorsed by Technical Leaders &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Founders Worldwide
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed flex items-center justify-center flex-wrap gap-1">
            Discover why growth-stage companies and enterprises trust{" "}
            <img src="/icon.png" alt="BitJunoo Logo" className="h-5 w-auto inline mx-1" />
            with their critical software initiatives.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-7">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative group bg-white/90 backdrop-blur-xl rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.12)] hover:border-sky-400/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Stars & Verified Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Project
                  </span>
                </div>

                {/* Quote Icon watermark */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-sky-200 group-hover:text-sky-300 transition-colors" />
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Client Info Footer */}
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} text-white font-bold text-sm shadow-md shadow-brand-900/10`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-sm">
                      {t.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {t.role}, <span className="text-slate-700 font-medium">{t.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="mt-14 p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">4.9 / 5.0</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Average Client Rating</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-200" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">100%</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">On-Time Sprint Completion</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-200" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">92%</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Repeat & Retainer Clients</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-200" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">0 Security Breaches</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Enterprise Compliance Track Record</div>
          </div>
        </div>
      </div>
    </section>
  );
}
