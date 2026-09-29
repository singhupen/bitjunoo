import { Compass, Award, Cpu, ShieldCheck, Zap } from "lucide-react";

export default function AboutMission() {
  return (
    <section className="py-10 sm:py-14 relative overflow-hidden bg-white">
      <div className="max-w-[1560px] mx-auto px-3 sm:px-5 lg:px-7 xl:px-8">
        {/* Story Section */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-xs font-semibold mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>THE BITJUNOO PHILOSOPHY</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Where <span className="text-royal-blue">Systemic Logic</span> Meets{" "}
              <span className="text-purple">Unstoppable Passion</span>.
            </h2>

            <div className="space-y-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                The name <strong className="text-slate-900 font-semibold">BitJunoo</strong> stems from two complementary forces:
                <strong className="text-royal-blue font-semibold"> &ldquo;Bit&rdquo;</strong>, representing deterministic computer science, architectural precision, and rigorous software fundamentals; and 
                <strong className="text-purple font-semibold"> &ldquo;Junoo&rdquo;</strong> (derived from <em>Junoon</em>), representing the fiery passion, obsessive craft, and tireless commitment to solve the world&apos;s toughest technical challenges.
              </p>
              <p>
                Founded by veteran software architects and engineering practitioners, we operate as a senior-led technical partner delivering production-ready, enterprise-grade digital systems with zero junior delegation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-6 pt-5 border-t border-slate-100">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="text-xs uppercase tracking-wider font-bold text-royal-blue mb-0.5">Our Mission</div>
                <p className="text-xs text-slate-600 leading-normal">
                  To empower ambitious startups and global enterprises with resilient, high-speed digital architectures that unlock non-linear scale.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="text-xs uppercase tracking-wider font-bold text-purple mb-0.5">Our Vision</div>
                <p className="text-xs text-slate-600 leading-normal">
                  To become the world&apos;s benchmark for high-velocity software engineering, combining modern cloud paradigms with clean craftsmanship.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-royal-blue/30 border border-royal-blue/30 p-6 sm:p-7 shadow-xl text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-blue/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple/20 rounded-full blur-3xl pointer-events-none" />

              <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-blue" />
                Engineering Guarantees
              </h3>

              <div className="space-y-3">
                {[
                  {
                    icon: Cpu,
                    title: "Senior Engineering Only",
                    desc: "Every sprint is executed by proven engineers with 8+ years of production experience.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "100% Code Ownership",
                    desc: "All source code, Docker configs, and IP belong unconditionally to you from day one.",
                  },
                  {
                    icon: Zap,
                    title: "Sub-Second Performance SLA",
                    desc: "Web & mobile apps benchmarked strictly for sub-second responses and 99.9% uptime.",
                  },
                ].map((item) => (
                  <div key={item.title} className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-4 h-4 text-cyan-blue flex-shrink-0" />
                      <h4 className="font-semibold text-white text-xs sm:text-sm">{item.title}</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-6">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
