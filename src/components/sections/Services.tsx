import Link from "next/link";
import { 
  Code2, 
  Smartphone, 
  Atom, 
  Server, 
  Cloud, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2 
} from "lucide-react";

const services = [
  {
    icon: Code2,
    badge: "01",
    title: "Web App Development",
    desc: "Bespoke, high-performance web applications engineered with Next.js 16 and TypeScript. Sub-second loads, edge rendering, and accessible enterprise UX.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Edge SSR"],
    gradient: "from-royal-blue to-cyan-blue",
    glow: "group-hover:border-cyan-blue/40 shadow-royal-blue/10",
  },
  {
    icon: Smartphone,
    badge: "02",
    title: "Mobile App Development",
    desc: "Intuitive, native-grade iOS and Android mobile solutions built with cross-platform frameworks. Engaging offline-first architecture & push notifications.",
    tags: ["React Native", "iOS & Android", "Offline Sync", "Biometrics"],
    gradient: "from-cyan-blue to-teal-400",
    glow: "group-hover:border-teal-400/40 shadow-cyan-blue/10",
  },
  {
    icon: Server,
    badge: "03",
    title: "Enterprise .NET Systems",
    desc: "Industrial-strength backend systems, clean microservices, and high-throughput APIs powered by .NET 9 and C# for mission-critical workloads.",
    tags: [".NET 9 / C#", "Microservices", "REST & gRPC", "Azure Cloud"],
    gradient: "from-indigo to-violet",
    glow: "group-hover:border-violet/40 shadow-indigo/10",
  },
  {
    icon: Cloud,
    badge: "04",
    title: "Cloud & DevOps Architecture",
    desc: "Automated CI/CD pipelines, container orchestration, and infrastructure-as-code ensuring 99.99% uptime and elastic auto-scaling under peak traffic.",
    tags: ["Docker", "Kubernetes", "AWS & Azure", "Terraform & CI/CD"],
    gradient: "from-deep-blue to-royal-blue",
    glow: "group-hover:border-royal-blue/40 shadow-deep-blue/10",
  },
  {
    icon: Cpu,
    badge: "05",
    title: "AI Integration & Automation",
    desc: "Custom LLM integrations, retrieval-augmented generation (RAG), and smart automated workflows that streamline repetitive processes at scale.",
    tags: ["OpenAI / Claude", "RAG Pipelines", "Process Automation", "Vector Search"],
    gradient: "from-violet to-purple",
    glow: "group-hover:border-purple/40 shadow-purple/10",
  },
  {
    icon: Atom,
    badge: "06",
    title: "Code Audit & Modernization",
    desc: "Comprehensive architecture reviews, security vulnerability scanning, and refactoring to rescue, modernize, and accelerate legacy codebases.",
    tags: ["Security Audits", "Refactoring", "Clean Architecture", "Performance Tuning"],
    gradient: "from-purple to-royal-blue",
    glow: "group-hover:border-cyan-blue/40 shadow-royal-blue/10",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-14 sm:py-20 lg:py-24 bg-slate-950 overflow-hidden border-t border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-royal-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-blue/10 border border-royal-blue/25 text-cyan-blue text-xs font-semibold mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-blue" />
            <span className="tracking-wide">FULL-LIFECYCLE ENGINEERING SERVICES</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18] mb-4">
            Solutions Built to Scale Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-blue via-royal-blue to-purple">
              Competitive Advantage
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            From technical discovery to continuous enterprise delivery, we design and build software that performs under demanding loads and scales effortlessly.
          </p>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className={`group relative rounded-2xl p-6 sm:p-7 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${s.glow}`}
            >
              <div>
                {/* Header row: Icon & Index Pill */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-md group-hover:scale-105 transition-transform duration-300`}
                  >
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700/80 group-hover:border-cyan-blue/40 group-hover:text-cyan-blue transition-colors">
                    {s.badge}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-cyan-blue transition-colors">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {s.desc}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 group-hover:border-slate-600 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Interactive Link */}
              <Link
                href="/services"
                className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-blue transition-colors"
              >
                <span>Explore Architecture Specs</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom architecture consultation bar */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-royal-blue/20 text-white border border-royal-blue/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-royal-blue/20 border border-royal-blue/30 flex items-center justify-center flex-shrink-0 text-cyan-blue">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading text-base sm:text-lg font-bold">Have a specialized engineering requirement?</h4>
              <p className="text-slate-300 text-xs sm:text-sm mt-0.5">We provide tailored architectural blueprints and feasibility roadmaps within 48 hours.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-royal-blue via-deep-blue to-purple text-white font-semibold text-xs sm:text-sm shadow-md shadow-royal-blue/30 hover:shadow-royal-blue/50 hover:-translate-y-0.5 transition-all"
          >
            <span>Request Technical Discovery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
