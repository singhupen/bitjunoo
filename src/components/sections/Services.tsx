import { Code2, Smartphone, Atom, Server } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Custom websites and web applications built with modern frameworks for performance, scalability, and seamless user experiences.",
    gradient: "from-brand-600 to-brand-500",
    bg: "bg-brand-50",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile apps for iOS and Android — intuitive, fast, and built to engage your users on the go.",
    gradient: "from-accent-500 to-accent-400",
    bg: "bg-accent-50",
  },
  {
    icon: Atom,
    title: "React Development",
    desc: "Component-driven React interfaces with reusable architecture, state management, and SSR for blazing-fast page loads.",
    gradient: "from-blue-500 to-cyan-400",
    bg: "bg-blue-50",
  },
  {
    icon: Server,
    title: ".NET Development",
    desc: "Robust enterprise backends with .NET and C# — secure APIs, microservices, and cloud-ready architecture.",
    gradient: "from-violet-600 to-purple-500",
    bg: "bg-violet-50",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-900 mt-3 mb-4">
            Services Built to Move Your Business Forward
          </h2>
          <p className="text-slate-600">
            From concept to deployment, we cover the full spectrum of software
            development so you can focus on what matters — growing your
            business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-900/10 hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${s.gradient} text-white mb-5 group-hover:scale-110 transition-transform`}
              >
                <s.icon className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-brand-900 mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
