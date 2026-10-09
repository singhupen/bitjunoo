import { Compass, Users, Code, Zap, Database, ShieldCheck } from "lucide-react";

export default function AboutMission() {
  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-slate-950 relative overflow-hidden border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Philosophy Text */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-cyan-blue/30 text-blue-600 dark:text-cyan-blue text-xs font-bold tracking-wide mb-6 shadow-sm">
              <Compass className="w-4 h-4" />
              <span className="uppercase">THE BITJUNOO PHILOSOPHY</span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.15]">
              Where <span className="text-[#007AFF]">Systemic Logic</span> Meets <span className="text-[#007AFF]">Unstoppable Passion.</span>
            </h2>

            <div className="space-y-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                The name <strong>BitJunoo</strong> stems from two complementary forces: 
                <strong> &ldquo;Bit&rdquo;</strong>, representing deterministic computer science, architectural precision, and rigorous software fundamentals; and 
                <strong> &ldquo;Junoo&rdquo;</strong> (derived from <em>Junoon</em>), representing the fiery passion, obsessive craft, and tireless commitment to solve the world&apos;s toughest technical challenges.
              </p>
              <p>
                Founded by veteran software architects and engineering practitioners, we operate as a senior-led technical partner delivering production-ready, enterprise-grade digital systems with zero junior delegation.
              </p>
            </div>
          </div>

          {/* Right Column - Guarantees Card */}
          <div className="relative">
            <div className="rounded-[28px] bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-slate-700/50 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-white overflow-hidden">
              {/* Card ambient glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#007AFF]/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00A8FF]/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold">Engineering Guarantees</h3>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-8 relative z-10">
                We stand behind our work with clear commitments and measurable outcomes.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                {[
                  {
                    icon: Users,
                    title: "Senior Engineering Only",
                    desc: "Every sprint is executed by proven engineers with 8+ years of experience.",
                  },
                  {
                    icon: Code,
                    title: "100% Code Ownership",
                    desc: "All source code, Docker configs, and IP belong unconditionally to you from day one.",
                  },
                  {
                    icon: Zap,
                    title: "Sub-Second Performance SLA",
                    desc: "Optimized architectures for blazing-fast performance.",
                  },
                  {
                    icon: Database,
                    title: "Secure & Compliant by Design",
                    desc: "Security, scalability, and compliance built into every solution.",
                  },
                ].map((item) => (
                  <div key={item.title} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                        <item.icon className="w-4 h-4 stroke-[2]" />
                      </div>
                      <h4 className="font-bold text-white text-sm">{item.title}</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-11">{item.desc}</p>
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
