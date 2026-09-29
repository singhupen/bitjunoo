import { ShieldCheck, Code, Rocket, Users, Lock, HeartHandshake } from "lucide-react";

const values = [
  {
    icon: Code,
    title: "Zero Technical Debt",
    desc: "We write clean, strongly-typed code adhering to SOLID and clean architecture principles. No hacky workarounds or shortcuts.",
    badge: "Architecture First",
    color: "from-royal-blue to-deep-blue",
  },
  {
    icon: Rocket,
    title: "Relentless Velocity",
    desc: "Agile 1-2 week sprints with continuous deployment and automated test suites so you can validate features weeks ahead of competition.",
    badge: "Fast Iterations",
    color: "from-cyan-blue to-royal-blue",
  },
  {
    icon: ShieldCheck,
    title: "Security by Design",
    desc: "Enterprise auth (OAuth, SAML), OWASP Top 10 defenses, encrypted datastores, and SOC2 awareness baked into foundational schemas.",
    badge: "Enterprise Grade",
    color: "from-indigo to-violet",
  },
  {
    icon: Users,
    title: "Radical Transparency",
    desc: "Shared Slack channels, real-time Jira/Linear boards, and clickable staging builds every Friday. You always know what is being built.",
    badge: "High Visibility",
    color: "from-violet to-purple",
  },
  {
    icon: Lock,
    title: "IP & Code Sovereignty",
    desc: "You retain 100% of all intellectual property, source repositories, documentation, and cloud infrastructure credentials from day one.",
    badge: "Full Ownership",
    color: "from-royal-blue to-cyan-blue",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Partnership",
    desc: "Deployment is just day one. We stay committed post-launch with proactive observability, automated alerting, and 24/7 SLA emergency support.",
    badge: "Post-Launch Care",
    color: "from-purple to-indigo",
  },
];

export default function CoreValues() {
  return (
    <section className="py-10 sm:py-14 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-blue/10 border border-cyan-blue/20 text-cyan-blue text-xs font-semibold mb-3">
            <span>OUR CORE VALUES</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            The Principles That Drive Every Line of Code
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            How we think, architect, and deliver software across every enterprise client engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="group bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-royal-blue/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${v.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    <v.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60">
                    {v.badge}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2 group-hover:text-royal-blue transition-colors">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
