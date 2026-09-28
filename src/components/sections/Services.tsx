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
    desc: "Bespoke, high-performance web applications engineered with Next.js and TypeScript. We prioritize sub-second loads, accessible UX, and robust architectures.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Edge Rendering"],
    gradient: "from-blue-600 to-sky-500",
    glow: "group-hover:from-blue-600/15 group-hover:to-sky-500/15",
  },
  {
    icon: Smartphone,
    badge: "02",
    title: "Mobile App Development",
    desc: "Intuitive, native-grade iOS and Android mobile solutions built with cross-platform frameworks. Engaging user journeys with real-time sync and offline resilience.",
    tags: ["React Native", "iOS & Android", "Offline-First", "Push Notifications"],
    gradient: "from-cyan-600 to-teal-400",
    glow: "group-hover:from-cyan-600/15 group-hover:to-teal-400/15",
  },
  {
    icon: Server,
    badge: "03",
    title: "Enterprise .NET Systems",
    desc: "Industrial-strength backend systems, clean microservices, and high-throughput APIs powered by .NET 9 and C# for mission-critical enterprise workflows.",
    tags: [".NET 9 / C#", "Microservices", "REST & gRPC", "Azure Cloud"],
    gradient: "from-violet-600 to-indigo-500",
    glow: "group-hover:from-violet-600/15 group-hover:to-indigo-500/15",
  },
  {
    icon: Cloud,
    badge: "04",
    title: "Cloud & DevOps Architecture",
    desc: "Automated CI/CD pipelines, container orchestration, and infrastructure-as-code ensuring 99.99% uptime, elastic scalability, and zero-stress releases.",
    tags: ["Docker", "Kubernetes", "AWS & Azure", "Terraform & CI/CD"],
    gradient: "from-sky-600 to-blue-500",
    glow: "group-hover:from-sky-600/15 group-hover:to-blue-500/15",
  },
  {
    icon: Cpu,
    badge: "05",
    title: "AI Integration & Automation",
    desc: "Custom LLM integrations, retrieval-augmented generation (RAG), and smart automated workflows that streamline repetitive processes and unlock actionable intelligence.",
    tags: ["OpenAI / Anthropic", "RAG Pipelines", "Process Automation", "Vector Search"],
    gradient: "from-amber-600 to-orange-400",
    glow: "group-hover:from-amber-600/15 group-hover:to-orange-400/15",
  },
  {
    icon: Atom,
    badge: "06",
    title: "Modern React & Frontend UI",
    desc: "Design system creation, component-driven microfrontends, and state orchestration that convert complex product requirements into delightful visual interfaces.",
    tags: ["Design Systems", "Tailwind CSS", "Framer Motion", "Micro-Frontends"],
    gradient: "from-emerald-600 to-teal-500",
    glow: "group-hover:from-emerald-600/15 group-hover:to-teal-500/15",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-28 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-200/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Reduced padding, wide container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-600/15 text-blue-600 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>FULL-LIFECYCLE ENGINEERING SERVICES</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mt-2 mb-5">
            Solutions Built to Scale Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Competitive Advantage
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From technical discovery to continuous enterprise delivery, we design and build software that performs under demanding loads and delights your users.
          </p>
        </div>

        {/* 6-Card High-Performance Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.12)] hover:border-sky-400/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top ambient highlight */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Header row: Icon & Index Pill */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`flex items-center justify-center w-13 h-13 rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-md shadow-brand-900/10 group-hover:scale-105 group-hover:rotate-1 transition-all duration-300`}
                  >
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200/60 group-hover:border-sky-300 group-hover:text-brand-600 transition-colors">
                    {s.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {s.desc}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100/90 text-slate-600 border border-slate-200/50 group-hover:bg-blue-50/80 group-hover:text-blue-700 group-hover:border-blue-200/50 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Interactive Link */}
              <div className="relative z-10 pt-4 border-t border-slate-100/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                <span>Explore Architecture</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom architecture consultation bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-slate-900 to-sky-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-cyan-300">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading text-base sm:text-lg font-bold">Have a specialized engineering requirement?</h4>
              <p className="text-slate-300 text-xs sm:text-sm">We provide tailored architectural blueprints and feasibility roadmaps within 48 hours.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-sm hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:-translate-y-0.5 transition-all"
          >
            Request Technical Discovery
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
