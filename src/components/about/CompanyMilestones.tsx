import { CheckCircle2, TrendingUp, Award, Globe, Users } from "lucide-react";

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
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-xs sm:text-sm font-semibold mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>OUR JOURNEY</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Milestones of Engineering Excellence
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A track record built on consistent delivery, technical mastery, and client growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={m.year}
              className="relative p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-royal-blue/40 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-purple">
                    {m.year}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Phase 0{idx + 1}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2.5 group-hover:text-royal-blue transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {m.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-royal-blue">
                <CheckCircle2 className="w-4 h-4 text-cyan-blue flex-shrink-0" />
                <span>{m.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
