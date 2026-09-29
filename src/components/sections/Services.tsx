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
    desc: "Bespoke, high-performance web applications engineered with Next.js and TypeScript. Sub-second loads and accessible UX.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Edge Rendering"],
    gradient: "from-royal-blue to-cyan-blue",
    glow: "group-hover:from-royal-blue/15 group-hover:to-cyan-blue/15",
  },
  {
    icon: Smartphone,
    badge: "02",
    title: "Mobile App Development",
    desc: "Intuitive, native-grade iOS and Android mobile solutions built with cross-platform frameworks. Engaging real-time sync.",
    tags: ["React Native", "iOS & Android", "Offline-First", "Push Notifications"],
    gradient: "from-cyan-blue to-teal-400",
    glow: "group-hover:from-cyan-blue/15 group-hover:to-teal-400/15",
  },
  {
    icon: Server,
    badge: "03",
    title: "Enterprise .NET Systems",
    desc: "Industrial-strength backend systems, clean microservices, and high-throughput APIs powered by .NET 9 and C#.",
    tags: [".NET 9 / C#", "Microservices", "REST & gRPC", "Azure Cloud"],
    gradient: "from-indigo to-violet",
    glow: "group-hover:from-indigo/15 group-hover:to-violet/15",
  },
  {
    icon: Cloud,
    badge: "04",
    title: "Cloud & DevOps Architecture",
    desc: "Automated CI/CD pipelines, container orchestration, and infrastructure-as-code ensuring 99.99% uptime and elastic scalability.",
    tags: ["Docker", "Kubernetes", "AWS & Azure", "Terraform & CI/CD"],
    gradient: "from-deep-blue to-royal-blue",
    glow: "group-hover:from-deep-blue/15 group-hover:to-royal-blue/15",
  },
  {
    icon: Cpu,
    badge: "05",
    title: "AI Integration & Automation",
    desc: "Custom LLM integrations, retrieval-augmented generation (RAG), and smart automated workflows that streamline repetitive processes.",
    tags: ["OpenAI / Claude", "RAG Pipelines", "Process Automation", "Vector Search"],
    gradient: "from-violet to-purple",
    glow: "group-hover:from-violet/15 group-hover:to-purple/15",
  },
  {
    icon: Atom,
    badge: "06",
    title: "Code Audit & Modernization",
    desc: "Comprehensive code reviews, security vulnerability scanning, and architectural refactoring to rescue and modernize legacy code.",
    tags: ["Security Audits", "Refactoring", "Clean Architecture", "Performance Tuning"],
    gradient: "from-purple to-royal-blue",
    glow: "group-hover:from-purple/15 group-hover:to-royal-blue/15",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-10 sm:py-14 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-200/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Reduced padding, wide container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-xs font-semibold tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5 text-royal-blue" />
            <span>FULL-LIFECYCLE ENGINEERING SERVICES</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2.5">
            Solutions Built to Scale Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-cyan-blue">
              Competitive Advantage
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            From technical discovery to continuous enterprise delivery, we design and build software that performs under demanding loads and delights your users.
          </p>
        </div>

        {/* 6-Card High-Performance Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(6,117,250,0.12)] hover:border-royal-blue/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top ambient highlight */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Header row: Icon & Index Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-md shadow-brand-900/10 group-hover:scale-105 transition-all duration-300`}
                  >
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200/60 group-hover:border-sky-300 group-hover:text-royal-blue transition-colors">
                    {s.badge}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2 group-hover:text-royal-blue transition-colors">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {s.desc}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100/90 text-slate-600 border border-slate-200/50 group-hover:bg-sky-50 group-hover:text-royal-blue transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Interactive Link */}
              <Link
                href="/services"
                className="relative z-10 pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-royal-blue transition-colors"
              >
                <span>Explore Architecture Specs</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom architecture consultation bar */}
        <div className="mt-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-royal-blue/30 text-white border border-royal-blue/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-cyan-blue">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading text-sm sm:text-base font-bold">Have a specialized engineering requirement?</h4>
              <p className="text-slate-300 text-xs">We provide tailored architectural blueprints and feasibility roadmaps within 48 hours.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-royal-blue via-deep-blue to-purple text-white font-bold text-xs sm:text-sm shadow-md shadow-royal-blue/30 hover:shadow-royal-blue/50 hover:-translate-y-0.5 transition-all"
          >
            Request Technical Discovery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
