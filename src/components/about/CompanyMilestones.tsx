import { CheckCircle2, TrendingUp } from "lucide-react";

const milestones = [
  {
    year: "2020",
    title: "Inception & Core Foundation",
    desc: "BitJunoo was born out of a desire to unite systemic computer science rigor ('Bit') with passionate problem-solving ('Junoo'). Started delivering high-concurrency .NET and React systems.",
    highlight: "Initial 10 Enterprise Deployments",
  },
  {
    year: "2022",
    title: "Global Expansion & Cross-Platform Suite",
    desc: "Scaled our engineering pods across North America, Europe, and Asia. Expanded capabilities into cross-platform React Native and enterprise cloud migration.",
    highlight: "50+ Global Clients & 99.8% SLA",
  },
  {
    year: "2024",
    title: "AI & Distributed Systems Integration",
    desc: "Integrated enterprise AI workflows, LLM agents, and vector databases directly into production systems for logistics, healthcare, and fintech leaders.",
    highlight: "150+ Milestone Releases",
  },
  {
    year: "2026",
    title: "Full-Stack Enterprise Engineering Partner",
    desc: "Recognized as a premier strategic technology partner delivering Next.js 16, .NET 9, and autonomous cloud pipelines for high-growth enterprises.",
    highlight: "Leading Global Digital Engineering",
  },
];

export default function CompanyMilestones() {
  return (
    <section className="py-10 sm:py-14 bg-white relative overflow-hidden">
      <div className="max-w-[1560px] mx-auto px-3 sm:px-5 lg:px-7 xl:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-xs font-semibold mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>OUR JOURNEY</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Milestones of Engineering Excellence
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            A track record built on consistent delivery, technical mastery, and client growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {milestones.map((m, idx) => (
            <div
              key={m.year}
              className="relative p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-royal-blue/40 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl sm:text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-purple">
                    {m.year}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Phase 0{idx + 1}</span>
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900 mb-2 group-hover:text-royal-blue transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {m.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-royal-blue">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-blue flex-shrink-0" />
                <span>{m.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
