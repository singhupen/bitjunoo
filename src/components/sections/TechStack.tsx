import {
  Atom,
  Server,
  Hexagon,
  Database,
  Boxes,
  Globe,
  Terminal,
  Layers,
} from "lucide-react";

const stack = [
  { name: "React", icon: Atom },
  { name: ".NET", icon: Server },
  { name: "Node.js", icon: Hexagon },
  { name: "TypeScript", icon: Terminal },
  { name: "PostgreSQL", icon: Database },
  { name: "Docker", icon: Boxes },
  { name: "Next.js", icon: Layers },
  { name: "Tailwind", icon: Globe },
];

export default function TechStack() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider">
            Our Toolkit
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-900 mt-3 mb-4">
            Technologies We Master
          </h2>
          <p className="text-slate-600">
            We work with industry-leading tools and frameworks to deliver
            solutions that are modern, maintainable, and future-proof.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {stack.map((t) => (
            <div
              key={t.name}
              className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white border border-slate-100 hover:border-accent-300 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <t.icon className="w-8 h-8 text-brand-600 group-hover:text-accent-500 transition-colors" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-brand-900 transition-colors">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
