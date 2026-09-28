import { Users, Repeat, Clock, Headphones } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Experienced Team",
    desc: "A dedicated team of senior engineers and consultants with a decade of combined experience across industries.",
  },
  {
    icon: Repeat,
    title: "Agile Process",
    desc: "Iterative sprints with transparent communication, so you see progress every step of the way.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    desc: "We respect deadlines. Every project ships on schedule with clear milestones and accountability.",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    desc: "Post-launch maintenance, monitoring, and enhancements to keep your product running smoothly.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-24 bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2">
            Why <img src="/icon.png" alt="BitJunoo Logo" className="h-5 w-auto" />
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-900 mt-3 mb-4">
            A Partner You Can Rely On
          </h2>
          <p className="text-slate-600">
            We don&apos;t just write code — we build long-term partnerships rooted in
            trust, quality, and measurable results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="relative group p-7 rounded-2xl border border-slate-100 hover:border-accent-200 hover:bg-accent-50/30 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-brand-50 text-brand-600 mb-5 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                <r.icon className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-brand-900 mb-3">
                {r.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
              <div className="absolute top-6 right-6 text-5xl font-bold font-heading text-slate-100 group-hover:text-accent-100 transition-colors select-none">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
