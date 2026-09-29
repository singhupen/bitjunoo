import { ShieldCheck, Code, Rocket, Users, Lock, HeartHandshake } from "lucide-react";

const values = [
  {
    icon: Code,
    title: "Zero Technical Debt",
    desc: "We write clean, strongly-typed code adhering to SOLID and clean architecture principles. No hacky workarounds or messy shortcuts that haunt your engineering team later.",
    badge: "Architecture First",
    color: "from-royal-blue to-deep-blue",
  },
  {
    icon: Rocket,
    title: "Relentless Velocity",
    desc: "We combine agile 1-2 week sprints with continuous deployment and automated test suites so you can validate features in the market weeks ahead of your competition.",
    badge: "Fast Iterations",
    color: "from-cyan-blue to-royal-blue",
  },
  {
    icon: ShieldCheck,
    title: "Security by Design",
    desc: "From enterprise auth (OAuth, SAML) to OWASP Top 10 defenses, encrypted datastores, and SOC2 awareness, security is baked into our foundational schemas, never bolted on.",
    badge: "Enterprise Grade",
    color: "from-indigo to-violet",
  },
  {
    icon: Users,
    title: "Radical Transparency",
    desc: "Shared Slack channels, real-time Jira/Linear boards, and clickable staging builds every Friday. You will never have to wonder what your engineering team is working on.",
    badge: "High Visibility",
    color: "from-violet to-purple",
  },
  {
    icon: Lock,
    title: "IP & Code Sovereignty",
    desc: "You retain 100% of all intellectual property, source repositories, documentation, and cloud infrastructure credentials. Complete transparency, zero vendor lock-in.",
    badge: "Full Ownership",
    color: "from-royal-blue to-cyan-blue",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Partnership",
    desc: "Deployment is just day one. We stay committed post-launch with proactive observability, automated alerting, performance tuning, and 24/7 SLA emergency support.",
    badge: "Post-Launch Care",
    color: "from-purple to-indigo",
  },
];

export default function CoreValues() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-blue/10 border border-cyan-blue/20 text-cyan-blue text-xs sm:text-sm font-semibold mb-4">
            <span>OUR CORE VALUES</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            The Principles That Drive Every Line of Code
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            How we think, architect, and deliver software across every enterprise client engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="group bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-royal-blue/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    <v.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60">
                    {v.badge}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-3 group-hover:text-royal-blue transition-colors">
                  {v.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
