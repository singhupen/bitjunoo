import { Search, Compass, Rocket, ShieldAlert, CheckCircle2 } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Discovery & Requirements Blueprint",
    desc: "We dissect your business goals, target user journeys, throughput requirements, and regulatory constraints. We deliver a complete architecture blueprint and milestone estimates.",
    deliverable: "Architecture Specs & PRD",
  },
  {
    step: "02",
    icon: Compass,
    title: "System Architecture & UI Prototypes",
    desc: "We define schema models, API contracts, cloud topologies, and interactive high-fidelity UI design systems. Everything is validated before any code is committed.",
    deliverable: "Figma Prototypes & API Contracts",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Iterative Sprint Execution",
    desc: "Agile 1-2 week cycles with continuous delivery. You receive clickable staging builds weekly, direct Slack access to engineers, and rigorous 90%+ automated test coverage.",
    deliverable: "Weekly Clickable Staging Releases",
  },
  {
    step: "04",
    icon: ShieldAlert,
    title: "Production Cutover & 24/7 SLA",
    desc: "Zero-downtime deployment, blue-green cutovers, real-time APM telemetry, automated log alerts, and strict enterprise SLA response times for peace of mind.",
    deliverable: "99.9% Uptime Guarantee & Post-Launch Support",
  },
];

export default function DeliveryFramework() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-blue/10 border border-cyan-blue/20 text-cyan-blue text-xs sm:text-sm font-semibold mb-4">
            <span>DELIVERY METHODOLOGY</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Our 4-Stage Production Delivery Framework
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A battle-tested process designed to remove uncertainty, eliminate technical debt, and ensure predictable, on-time releases.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((s) => (
            <div
              key={s.step}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-royal-blue/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-extrabold font-heading text-slate-300 group-hover:text-royal-blue transition-colors">
                    {s.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-royal-blue/10 text-royal-blue flex items-center justify-center group-hover:bg-royal-blue group-hover:text-white transition-colors">
                    <s.icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2.5 group-hover:text-royal-blue transition-colors">
                  {s.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-royal-blue">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-blue flex-shrink-0" />
                <span>{s.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
