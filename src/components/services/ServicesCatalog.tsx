import Link from "next/link";
import { 
  Code2, 
  Smartphone, 
  Server, 
  Cloud, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Layers,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    badge: "01 / Web Architecture",
    title: "Web Application Engineering",
    desc: "Bespoke, lightning-fast web applications built on Next.js 16, React 19, and TypeScript. We engineer responsive, accessible, and SEO-optimized web products with sub-second page loads.",
    features: [
      "Next.js App Router & Server Components",
      "Tailwind CSS & Design System Architecture",
      "PWA & Offline-First Capability",
      "Core Web Vitals Optimization (100 Lighthouse score target)",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"],
    accentGradient: "from-royal-blue to-brand-azure",
  },
  {
    icon: Smartphone,
    badge: "02 / Mobile Engineering",
    title: "Cross-Platform Mobile Apps",
    desc: "High-performance iOS and Android applications developed with React Native and native bridges. Smooth 60fps animations, intuitive gesture navigation, and robust offline sync.",
    features: [
      "Single codebase for iOS & Android",
      "Native device hardware integration (Biometrics, Camera, Bluetooth)",
      "Push notification & deep linking workflows",
      "App Store & Google Play automated deployment",
    ],
    tech: ["React Native", "Expo", "iOS & Android", "WebSockets"],
    accentGradient: "from-brand-azure to-cyan-blue",
  },
  {
    icon: Server,
    badge: "03 / Enterprise Core",
    title: "Enterprise .NET 9 Systems",
    desc: "Mission-critical backend architectures, clean microservices, and high-throughput REST and gRPC APIs powered by C# and .NET 9. Designed for extreme concurrency and low latency.",
    features: [
      "Clean architecture & Domain-Driven Design (DDD)",
      "Entity Framework Core & Dapper optimizations",
      "Event-driven messaging (Kafka, RabbitMQ, Azure Service Bus)",
      "Horizontal auto-scaling & memory management",
    ],
    tech: [".NET 9", "C#", "PostgreSQL", "Docker", "Redis"],
    accentGradient: "from-royal-blue to-deep-blue",
  },
  {
    icon: Cloud,
    badge: "04 / Infrastructure",
    title: "Cloud & DevOps Architecture",
    desc: "Production-grade cloud environments on AWS and Azure with zero-downtime CI/CD deployment pipelines, container orchestration, and Infrastructure as Code.",
    features: [
      "Terraform & Pulumi Infrastructure-as-Code",
      "Kubernetes (EKS/AKS) & Docker containerization",
      "Automated GitHub Actions CI/CD pipelines",
      "99.99% uptime SLAs with multi-region redundancy",
    ],
    tech: ["AWS", "Azure", "Kubernetes", "Docker", "Terraform"],
    accentGradient: "from-deep-blue to-royal-blue",
  },
  {
    icon: Cpu,
    badge: "05 / Intelligence",
    title: "AI & Workflow Automation",
    desc: "Transform operational workflows with custom LLM pipelines, Retrieval-Augmented Generation (RAG), vector embeddings, and intelligent agent automation.",
    features: [
      "Custom enterprise LLM integrations (OpenAI, Claude, Llama)",
      "RAG pipelines with Pinecone, pgvector & Qdrant",
      "Autonomous AI task agents for operations",
      "Data ingestion, cleansing & ETL pipelines",
    ],
    tech: ["Python", "LangChain", "Vector DBs", "OpenAI", "Anthropic"],
    accentGradient: "from-brand-azure to-brand-teal",
  },
  {
    icon: ShieldCheck,
    badge: "06 / Security & Audit",
    title: "Security, Auditing & Refactoring",
    desc: "Comprehensive code reviews, security vulnerability scanning, and architectural modernizations. We rescue legacy codebases and bring them to modern standards.",
    features: [
      "OWASP Top 10 security audits & remediation",
      "SOC2 & HIPAA technical compliance alignment",
      "Legacy .NET Framework to modern .NET 9 migration",
      "Database schema query optimization & indexing",
    ],
    tech: ["SonarQube", "Snyk", "OWASP", "OAuth2", "Vault"],
    accentGradient: "from-cyan-blue to-royal-blue",
  },
];

export default function ServicesCatalog() {
  return (
    <section className="py-10 sm:py-14 bg-slate-50/70 dark:bg-slate-950 relative border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue dark:text-cyan-blue text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>FULL-SPECTRUM CAPABILITIES</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-2">
            Engineered for High-Scale Enterprise Demands
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            From frontend velocity to mission-critical backend throughput, our specialized engineering squads build software that performs flawlessly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 hover:border-royal-blue/40 dark:hover:border-cyan-blue/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.accentGradient} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 shadow-xs">
                    {s.badge}
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-royal-blue dark:group-hover:text-cyan-blue transition-colors">
                  {s.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {s.desc}
                </p>

                {/* Features list */}
                <div className="space-y-1.5 mb-5">
                  {s.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-royal-blue dark:text-cyan-blue flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom footer: Tech Tags & CTA */}
              <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {s.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-royal-blue dark:text-cyan-blue hover:text-brand-azure transition-colors"
                >
                  Consult Squad
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
