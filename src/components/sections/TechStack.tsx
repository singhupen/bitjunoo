"use client";

import { useState } from "react";
import {
  Sparkles,
  LayoutGrid,
  Monitor,
  Server,
  Cloud,
  Database,
  ArrowRight,
  TrendingUp,
  Zap,
} from "lucide-react";

// --- Authentic Brand SVG Logomarks ---

const ReactLogo = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 text-[#00D8FE]">
    <circle cx="0" cy="0" r="2.05" fill="#00D8FE" />
    <g stroke="#00D8FE" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const NextJsLogo = () => (
  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center p-1.5 shadow-xs shrink-0">
    <svg viewBox="0 0 180 180" className="w-full h-full" fill="none">
      <path
        d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z"
        fill="white"
      />
      <rect x="115" y="54" width="12" height="72" fill="white" />
    </svg>
  </div>
);

const TypeScriptLogo = () => (
  <div className="w-8 h-8 rounded-lg bg-[#3178C6] flex items-center justify-center text-white font-extrabold text-[13px] tracking-tight shadow-xs select-none shrink-0">
    TS
  </div>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#38BDF8] shrink-0" fill="currentColor">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
  </svg>
);

const DotNetLogo = () => (
  <div className="w-8 h-8 rounded-lg bg-[#512BD4] flex items-center justify-center text-white font-black text-[11px] tracking-tight shadow-xs select-none shrink-0">
    .NET
  </div>
);

const NodeJsLogo = () => (
  <svg viewBox="0 0 256 289" className="w-8 h-8 shrink-0" fill="none">
    <path
      d="M128 0L255.306 73.5V220.5L128 294L0.693893 220.5V73.5L128 0Z"
      fill="#417E38"
    />
    <path
      d="M128 17.5L240.147 82.25V211.75L128 276.5L15.8529 211.75V82.25L128 17.5Z"
      fill="#689F38"
    />
    <text
      x="128"
      y="185"
      textAnchor="middle"
      fill="white"
      fontWeight="bold"
      fontSize="110"
      fontFamily="system-ui, sans-serif"
    >
      JS
    </text>
  </svg>
);

const GrpcRestLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#2563EB] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" fill="#2563EB" />
    <circle cx="6" cy="18" r="3" fill="#2563EB" />
    <circle cx="18" cy="12" r="3" fill="#2563EB" />
    <path d="M8.5 7.5L15.5 10.5" stroke="#2563EB" strokeWidth="2.2" />
    <path d="M8.5 16.5L15.5 13.5" stroke="#2563EB" strokeWidth="2.2" />
  </svg>
);

const PythonLogo = () => (
  <svg viewBox="0 0 110 110" className="w-8 h-8 shrink-0">
    <path
      d="M54.5 5C30.2 5 31.7 15.5 31.7 15.5L31.8 26.5H55V29.9H20.4C9.5 29.9 5 36.3 5 50.8C5 65.3 11.4 66.8 17.5 66.8H24.3V57.2C24.3 45.4 34.6 44.5 34.6 44.5H54.9C64.6 44.5 65.5 35.8 65.5 35.8V15.6C65.5 15.6 66.7 5 54.5 5ZM43.3 11.4C46 11.4 48.2 13.6 48.2 16.3C48.2 19 46 21.2 43.3 21.2C40.6 21.2 38.4 19 38.4 16.3C38.4 13.6 40.6 11.4 43.3 11.4Z"
      fill="#387EB8"
    />
    <path
      d="M55.5 105C79.8 105 78.3 94.5 78.3 94.5L78.2 83.5H55V80.1H89.6C100.5 80.1 105 73.7 105 59.2C105 44.7 98.6 43.2 92.5 43.2H85.7V52.8C85.7 64.6 75.4 65.5 75.4 65.5H55.1C45.4 65.5 44.5 74.2 44.5 74.2V94.4C44.5 94.4 43.3 105 55.5 105ZM66.7 98.6C64 98.6 61.8 96.4 61.8 93.7C61.8 91 64 88.8 66.7 88.8C69.4 88.8 71.6 91 71.6 93.7C71.6 96.4 69.4 98.6 66.7 98.6Z"
      fill="#FFE052"
    />
  </svg>
);

const DockerLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#0db7ed] shrink-0" fill="currentColor">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.954 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.145a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m5.884 2.714h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.145a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M23.76 9.89a3.7 3.7 0 00-2.323-2.05s-.37-.09-.944-.04c-.082-.67-.34-1.3-.77-1.83l-.36-.43-.44.35a3.86 3.86 0 00-1.4 2.29 4.3 4.3 0 00-.91-.1H.56a.56.56 0 00-.56.56c0 3.59 1.15 6.84 3.32 9.04C5.4 19.8 8.43 20.9 12.08 20.9c7.62 0 11.23-4.22 11.68-7.98.05-.44.07-.88.07-1.32 0-.58-.02-1.15-.07-1.71"/>
  </svg>
);

const KubernetesLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#326CE5] shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9.2" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3" fill="#326CE5" />
    <path d="M12 2.8v6.2M12 15v6.2M2.8 12h6.2M15 12h6.2M5.5 5.5l4.4 4.4M14.1 14.1l4.4 4.4M18.5 5.5l-4.4 4.4M9.9 14.1l-4.4 4.4" strokeWidth="1.8" />
  </svg>
);

const AwsAzureLogo = () => (
  <div className="flex flex-col items-center justify-center shrink-0">
    <span className="font-black text-xs text-slate-800 dark:text-white tracking-tight leading-none">aws</span>
    <svg viewBox="0 0 36 12" className="w-6 h-2 text-[#FF9900]" fill="currentColor">
      <path d="M2 3 C12 11, 24 11, 34 3 C25 8, 11 8, 2 3 Z" />
      <polygon points="30,1 35,4 30,6" />
    </svg>
  </div>
);

const SecurityLogo = () => (
  <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  </div>
);

const PostgresLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#336791] shrink-0" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 3.31 1.61 6.24 4.09 8.04l.11-.84c.1-.81.42-1.54.89-2.12-.39-.81-.6-1.7-.6-2.63 0-3.35 2.69-6.07 6-6.07 1.34 0 2.58.45 3.58 1.2.66-.46 1.45-.75 2.31-.8.29-.02.59-.01.88.03.49-1.92 1.83-3.48 3.59-4.27C20.67 4.09 16.65 2 12 2zm1.5 10.38c-1.93 0-3.5 1.57-3.5 3.5 0 .61.16 1.18.44 1.68l.94 1.65c.24.42.66.71 1.15.79l2.47.41c.88.15 1.7-.45 1.85-1.33.02-.12.02-.24.01-.36l-.36-2.16c-.14-.84-.8-1.5-1.64-1.64l-1.36-.23c-.02-.1-.03-.2-.03-.31 0-.96.79-1.75 1.75-1.75.48 0 .92.2 1.24.51l.8-.8c-.53-.53-1.25-.86-2.05-.86-.26 0-.52.04-.76.11z"/>
  </svg>
);

const RedisLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#DC382D] shrink-0" fill="currentColor">
    <path d="M2.5 7.5L12 2l9.5 5.5v9L12 22l-9.5-5.5v-9zm9.5 3.5L5.5 7.5 12 4l6.5 3.5-6.5 3.5zm7.5 1.5l-6.5 3.5-6.5-3.5v3.5l6.5 3.5 6.5-3.5v-3.5z" />
  </svg>
);

const VectorDbLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#7C3AED] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" fill="#7C3AED" />
    <circle cx="19" cy="5" r="2" fill="#7C3AED" />
    <circle cx="5" cy="5" r="2" fill="#7C3AED" />
    <circle cx="5" cy="19" r="2" fill="#7C3AED" />
    <circle cx="19" cy="19" r="2" fill="#7C3AED" />
    <path d="M12 9V5M12 15v4M9 12H5M15 12h4M9.9 9.9 6.4 6.4M14.1 14.1l3.5 3.5M9.9 14.1l-3.5 3.5M14.1 9.9l3.5-3.5" />
  </svg>
);

const KafkaRabbitLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#EA580C] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="12" r="2.5" fill="#EA580C" />
    <circle cx="18" cy="6" r="2.5" fill="#EA580C" />
    <circle cx="18" cy="18" r="2.5" fill="#EA580C" />
    <path d="M8.5 11l7-3.5M8.5 13l7 3.5" />
  </svg>
);

// --- Structured Data for the 4 Categories ---

interface TechCardItem {
  name: string;
  specialty: string;
  icon: React.ReactNode;
}

interface CategoryGroup {
  id: string;
  title: string;
  description: string;
  icon: any;
  containerBg: string;
  containerBorder: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  viewAllColor: string;
  items: TechCardItem[];
}

const categoriesData: CategoryGroup[] = [
  {
    id: "Frontend",
    title: "Frontend",
    description: "Modern UI frameworks for seamless experiences.",
    icon: Monitor,
    containerBg: "bg-[#f0f7ff] dark:bg-sky-950/20",
    containerBorder: "border-[#d0e5ff] dark:border-sky-800/40",
    iconBg: "bg-[#e0efff] dark:bg-sky-900/40",
    iconBorder: "border-[#bfdbfe] dark:border-sky-700/50",
    iconColor: "text-[#2563eb] dark:text-[#38bdf8]",
    viewAllColor: "text-[#2563eb] hover:text-[#1d4ed8] dark:text-[#38bdf8]",
    items: [
      {
        name: "React 19",
        specialty: "Concurrent UI & Hooks",
        icon: <ReactLogo />,
      },
      {
        name: "Next.js 16",
        specialty: "Turbopack & Edge SSR",
        icon: <NextJsLogo />,
      },
      {
        name: "TypeScript",
        specialty: "Type-Safe Architecture",
        icon: <TypeScriptLogo />,
      },
      {
        name: "Tailwind CSS",
        specialty: "Modern Design Systems",
        icon: <TailwindLogo />,
      },
    ],
  },
  {
    id: "Backend",
    title: "Backend",
    description: "Scalable and high-performance services.",
    icon: Server,
    containerBg: "bg-[#f0fdf7] dark:bg-emerald-950/20",
    containerBorder: "border-[#c6f6d5] dark:border-emerald-800/40",
    iconBg: "bg-[#dcfae6] dark:bg-emerald-900/40",
    iconBorder: "border-[#a7f3d0] dark:border-emerald-700/50",
    iconColor: "text-[#059669] dark:text-[#34d399]",
    viewAllColor: "text-[#059669] hover:text-[#047857] dark:text-[#34d399]",
    items: [
      {
        name: ".NET 9 / C#",
        specialty: "Enterprise Microservices",
        icon: <DotNetLogo />,
      },
      {
        name: "Node.js",
        specialty: "Async I/O & Event Loops",
        icon: <NodeJsLogo />,
      },
      {
        name: "gRPC & REST",
        specialty: "High-Throughput APIs",
        icon: <GrpcRestLogo />,
      },
      {
        name: "Python / AI",
        specialty: "LLM Workflows & Pipelines",
        icon: <PythonLogo />,
      },
    ],
  },
  {
    id: "Cloud & DevOps",
    title: "Cloud & DevOps",
    description: "Reliable infrastructure and automated delivery.",
    icon: Cloud,
    containerBg: "bg-[#fffbf0] dark:bg-amber-950/20",
    containerBorder: "border-[#fed7aa] dark:border-amber-800/40",
    iconBg: "bg-[#ffedd5] dark:bg-amber-900/40",
    iconBorder: "border-[#fde68a] dark:border-amber-700/50",
    iconColor: "text-[#ea580c] dark:text-[#fb923c]",
    viewAllColor: "text-[#ea580c] hover:text-[#c2410c] dark:text-[#fb923c]",
    items: [
      {
        name: "Docker",
        specialty: "Container Standards",
        icon: <DockerLogo />,
      },
      {
        name: "Kubernetes",
        specialty: "Cluster Orchestration",
        icon: <KubernetesLogo />,
      },
      {
        name: "AWS & Azure",
        specialty: "Serverless & Cloud Native",
        icon: <AwsAzureLogo />,
      },
      {
        name: "CI / CD Security",
        specialty: "Automated Deployments",
        icon: <SecurityLogo />,
      },
    ],
  },
  {
    id: "Data & AI",
    title: "Data & AI",
    description: "From data storage to intelligent applications.",
    icon: Database,
    containerBg: "bg-[#faf5ff] dark:bg-purple-950/20",
    containerBorder: "border-[#e9d5ff] dark:border-purple-800/40",
    iconBg: "bg-[#f3e8ff] dark:bg-purple-900/40",
    iconBorder: "border-[#ddd6fe] dark:border-purple-700/50",
    iconColor: "text-[#9333ea] dark:text-[#c084fc]",
    viewAllColor: "text-[#9333ea] hover:text-[#7e22ce] dark:text-[#c084fc]",
    items: [
      {
        name: "PostgreSQL",
        specialty: "Relational Core & Vector",
        icon: <PostgresLogo />,
      },
      {
        name: "Redis",
        specialty: "In-Memory Caching & PubSub",
        icon: <RedisLogo />,
      },
      {
        name: "Vector DBs",
        specialty: "RAG & Semantic Retrieval",
        icon: <VectorDbLogo />,
      },
      {
        name: "Kafka / RabbitMQ",
        specialty: "Event-Driven Streams",
        icon: <KafkaRabbitLogo />,
      },
    ],
  },
];

const filterTabs = [
  { label: "All Stacks", icon: LayoutGrid, iconColor: "text-[#2563eb]" },
  { label: "Frontend", icon: Monitor, iconColor: "text-[#2563eb]" },
  { label: "Backend", icon: Server, iconColor: "text-[#059669]" },
  { label: "Cloud & DevOps", icon: Cloud, iconColor: "text-[#ea580c]" },
  { label: "Data & AI", icon: Database, iconColor: "text-[#9333ea]" },
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("All Stacks");

  const visibleCategories =
    activeCategory === "All Stacks"
      ? categoriesData
      : categoriesData.filter((cat) => cat.title === activeCategory);

  return (
    <section className="relative py-16 sm:py-24 lg:py-28 bg-[#fafcff] dark:bg-slate-950 overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Soft Ambient Radial Background Lights */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-100/60 dark:bg-blue-900/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-12 -right-24 w-[550px] h-[550px] bg-sky-100/70 dark:bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Dotted Matrix on Left */}
      <div className="hidden xl:block absolute left-6 top-36 w-16 h-24 opacity-30 pointer-events-none">
        <svg width="64" height="96" viewBox="0 0 64 96" fill="none">
          {Array.from({ length: 24 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 4) * 16 + 8}
              cy={Math.floor(i / 4) * 16 + 8}
              r="2"
              fill="#3B82F6"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Floating Accent Card 1: Left (From Idea to Production) */}
        <div className="hidden md:flex absolute top-4 lg:top-6 left-2 sm:left-4 lg:left-8 xl:left-14 -rotate-6 items-center gap-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 pointer-events-none animate-float z-20">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-cyan-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
              From Idea
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              to Production
            </div>
          </div>
        </div>

        {/* Floating Accent Card 2: Right (Scalable, Secure, Future-Ready) */}
        <div className="hidden md:flex absolute top-2 lg:top-4 right-2 sm:right-4 lg:right-8 xl:right-14 rotate-6 items-center gap-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 pointer-events-none animate-float-delayed z-20">
          <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900 flex items-center justify-center text-rose-500">
            <Zap className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight">
              Scalable
            </div>
            <div className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight">
              Secure
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Future-Ready
            </div>
          </div>
        </div>

        {/* Curved Dotted Arrow pointing towards Right Card */}
        <div className="hidden lg:block absolute top-14 right-44 xl:right-56 pointer-events-none">
          <svg className="w-16 h-12 text-blue-400/80" viewBox="0 0 70 50" fill="none">
            <path
              d="M 6 42 Q 35 48 55 16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeDasharray="3.5 3.5"
            />
            <path
              d="M 46 14 L 56 16 L 54 26"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200/70 dark:border-blue-800/60 text-[#2563eb] dark:text-cyan-400 text-[11px] font-bold tracking-wider uppercase mb-5 backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563eb] dark:text-cyan-400" />
            <span>ENTERPRISE-GRADE TOOLKIT</span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.14] mb-4">
            Modern Technologies We{" "}
            <span className="text-[#2563eb] dark:text-[#38bdf8]">Master</span>
            <br />
            <span className="text-[#00c5a0] dark:text-[#2dd4bf]">& Deploy</span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            We build with battle-tested frameworks and modern standards designed for peak performance, rapid evolution, and enterprise security.
          </p>

          {/* Category Filter Pills (Navigation Row) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-7 sm:mt-9">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveCategory(tab.label)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-xs ${
                    isActive
                      ? "bg-[#2563eb] text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                      : "bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-[#2563eb] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  <tab.icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : tab.iconColor
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Distinct Horizontal Stack Strips / Rows */}
        <div className="space-y-4 sm:space-y-5">
          {visibleCategories.map((cat) => (
            <div
              key={cat.id}
              className={`relative rounded-3xl p-4 sm:p-5 lg:p-6 border ${cat.containerBg} ${cat.containerBorder} shadow-xs transition-all duration-300`}
            >
              {/* Top-Right "View all ->" link */}
              <div className="flex justify-end mb-2 sm:mb-1">
                <button
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === cat.title ? "All Stacks" : cat.title
                    )
                  }
                  className={`text-xs font-semibold inline-flex items-center gap-1.5 transition-all hover:translate-x-0.5 cursor-pointer group ${cat.viewAllColor}`}
                >
                  <span>View all</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* Row Body: Category Left Header + 4 Technology Cards */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                {/* Left Category Info */}
                <div className="flex items-center gap-3.5 w-full lg:w-[220px] xl:w-[240px] shrink-0">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${cat.iconBg} ${cat.iconBorder}`}
                  >
                    <cat.icon className={`w-6 h-6 ${cat.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Right Technology Cards (4 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-3.5 flex-1 w-full">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="bg-white dark:bg-slate-900/90 rounded-2xl p-3.5 sm:p-4 border border-slate-100 dark:border-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-200 flex items-center gap-3.5 group cursor-pointer hover:-translate-y-0.5"
                    >
                      {/* Authentic Brand SVG Icon */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-[#2563eb] dark:group-hover:text-cyan-400 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {item.specialty}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
