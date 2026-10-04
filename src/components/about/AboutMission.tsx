import { Compass, Award, Cpu, ShieldCheck, Zap } from "lucide-react";

export default function AboutMission() {
  return (
    <section className="py-10 sm:py-14 bg-white dark:bg-slate-950 relative overflow-hidden border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Story Section */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-blue/10 border border-royal-blue/30 text-cyan-blue text-xs font-semibold mb-3 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-cyan-blue" />
              <span>THE BITJUNOO PHILOSOPHY</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-3">
              Where <span className="text-cyan-blue">Systemic Logic</span> Meets{" "}
              <span className="text-purple">Unstoppable Passion</span>.
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                The name <strong className="text-slate-900 dark:text-white font-semibold">BitJunoo</strong> stems from two complementary forces:
                <strong className="text-cyan-blue font-semibold"> &ldquo;Bit&rdquo;</strong>, representing deterministic computer science, architectural precision, and rigorous software fundamentals; and 
                <strong className="text-purple font-semibold"> &ldquo;Junoo&rdquo;</strong> (derived from <em>Junoon</em>), representing the fiery passion, obsessive craft, and tireless commitment to solve the world&apos;s toughest technical challenges.
              </p>
              <p>
                Founded by veteran software architects and engineering practitioners, we operate as a senior-led technical partner delivering production-ready, enterprise-grade digital systems with zero junior delegation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-xs">
                <div className="text-[11px] uppercase tracking-wider font-bold text-cyan-blue mb-1">Our Mission</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  To empower ambitious startups and global enterprises with resilient, high-speed digital architectures that unlock non-linear scale.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-xs">
                <div className="text-[11px] uppercase tracking-wider font-bold text-purple mb-1">Our Vision</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  To become the world&apos;s benchmark for high-velocity software engineering, combining modern cloud paradigms with clean craftsmanship.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-900/90 dark:bg-slate-900/70 border border-royal-blue/30 p-5 sm:p-6 shadow-2xl backdrop-blur-xl text-white">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-blue/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple/15 rounded-full blur-3xl pointer-events-none" />

              <h3 className="font-heading text-base sm:text-lg font-bold mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-blue" />
                <span>Engineering Guarantees</span>
              </h3>

              <div className="space-y-2.5">
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
                  <div key={item.title} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-sm">
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
