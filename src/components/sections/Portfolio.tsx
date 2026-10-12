"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  LayoutGrid,
  Monitor,
  Smartphone,
  Briefcase,
  Cloud,
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ShoppingCart,
  Users,
  Zap,
  FileText,
  ShieldCheck,
  Check,
  Search,
  Star,
  CheckCircle2,
} from "lucide-react";

// --- Authentic Brand Tech Badges ---

const NextJsLogo = () => (
  <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center p-0.5 shrink-0">
    <svg viewBox="0 0 180 180" className="w-full h-full" fill="none">
      <path
        d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z"
        fill="white"
      />
      <rect x="115" y="54" width="12" height="72" fill="white" />
    </svg>
  </div>
);

const ReactLogo = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-4 h-4 text-[#00D8FE] shrink-0">
    <circle cx="0" cy="0" r="2.05" fill="#00D8FE" />
    <g stroke="#00D8FE" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const PostgresLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#336791] shrink-0" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 3.31 1.61 6.24 4.09 8.04l.11-.84c.1-.81.42-1.54.89-2.12-.39-.81-.6-1.7-.6-2.63 0-3.35 2.69-6.07 6-6.07 1.34 0 2.58.45 3.58 1.2.66-.46 1.45-.75 2.31-.8.29-.02.59-.01.88.03.49-1.92 1.83-3.48 3.59-4.27C20.67 4.09 16.65 2 12 2zm1.5 10.38c-1.93 0-3.5 1.57-3.5 3.5 0 .61.16 1.18.44 1.68l.94 1.65c.24.42.66.71 1.15.79l2.47.41c.88.15 1.7-.45 1.85-1.33.02-.12.02-.24.01-.36l-.36-2.16c-.14-.84-.8-1.5-1.64-1.64l-1.36-.23c-.02-.1-.03-.2-.03-.31 0-.96.79-1.75 1.75-1.75.48 0 .92.2 1.24.51l.8-.8c-.53-.53-1.25-.86-2.05-.86-.26 0-.52.04-.76.11z"/>
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#38BDF8] shrink-0" fill="currentColor">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
  </svg>
);

const TypeScriptLogo = () => (
  <div className="w-4 h-4 rounded bg-[#3178C6] flex items-center justify-center text-white font-black text-[9px] select-none shrink-0">
    TS
  </div>
);

const StripeLogo = () => (
  <div className="w-4 h-4 rounded bg-[#635BFF] flex items-center justify-center text-white font-black text-[9px] select-none shrink-0">
    S
  </div>
);

const NodeJsLogo = () => (
  <div className="w-4 h-4 rounded bg-[#417E38] flex items-center justify-center text-white font-black text-[8px] select-none shrink-0">
    JS
  </div>
);

const DotNetLogo = () => (
  <div className="w-4 h-4 rounded bg-[#512BD4] flex items-center justify-center text-white font-black text-[8px] select-none shrink-0">
    .NET
  </div>
);

const AzureLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0089D6] shrink-0" fill="currentColor">
    <path d="M13.05 4.24l-6.83 12.2H1.5l8.72-15.58 2.83 3.38zm2.41 1.77L11.7 15.65h5.18l3.12-5.46 2.5 5.46h-5.62l-1.42 2.6H22.5l-7.04-12.24z" />
  </svg>
);

const DockerLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0db7ed] shrink-0" fill="currentColor">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.954 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.145a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m5.884 2.714h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.145a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M23.76 9.89a3.7 3.7 0 00-2.323-2.05s-.37-.09-.944-.04c-.082-.67-.34-1.3-.77-1.83l-.36-.43-.44.35a3.86 3.86 0 00-1.4 2.29 4.3 4.3 0 00-.91-.1H.56a.56.56 0 00-.56.56c0 3.59 1.15 6.84 3.32 9.04C5.4 19.8 8.43 20.9 12.08 20.9c7.62 0 11.23-4.22 11.68-7.98.05-.44.07-.88.07-1.32 0-.58-.02-1.15-.07-1.71"/>
  </svg>
);

const GrpcLogo = () => (
  <span className="font-bold text-[9px] text-[#2563EB] tracking-tight shrink-0">gRPC</span>
);

const PythonLogo = () => (
  <svg viewBox="0 0 110 110" className="w-4 h-4 shrink-0">
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

const FastApiLogo = () => (
  <div className="w-4 h-4 rounded-full bg-[#009688] flex items-center justify-center text-white shrink-0">
    <Zap className="w-2.5 h-2.5 fill-white text-white" />
  </div>
);

const VectorDbLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#7C3AED] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="3" fill="#7C3AED" />
    <circle cx="19" cy="5" r="2" fill="#7C3AED" />
    <circle cx="5" cy="5" r="2" fill="#7C3AED" />
    <circle cx="5" cy="19" r="2" fill="#7C3AED" />
    <circle cx="19" cy="19" r="2" fill="#7C3AED" />
    <path d="M12 9V5M12 15v4M9 12H5M15 12h4" />
  </svg>
);

const AwsLogo = () => (
  <div className="flex items-center gap-0.5 shrink-0">
    <span className="font-bold text-[9px] text-[#232F3E] dark:text-white leading-none">aws</span>
    <span className="text-[8px] text-[#FF9900] font-bold">▾</span>
  </div>
);

// --- Structured Projects Data ---

interface TechBadge {
  name: string;
  icon: React.ReactNode;
}

interface CaseStudyProject {
  id: string;
  category: "Web App" | "Mobile App" | "Enterprise" | "AI & Cloud";
  categoryIcon: any;
  categoryBg: string;
  categoryText: string;
  categoryBorder: string;
  title: string;
  description: string;
  metric1: {
    icon: any;
    iconBg: string;
    iconColor: string;
    value: string;
    label: string;
  };
  metric2: {
    icon: any;
    iconBg: string;
    iconColor: string;
    value: string;
    label: string;
  };
  techStack: TechBadge[];
  renderMockup: () => React.ReactNode;
}

const caseStudies: CaseStudyProject[] = [
  {
    id: "finsight",
    category: "Web App",
    categoryIcon: Monitor,
    categoryBg: "bg-sky-50 dark:bg-sky-950/40",
    categoryText: "text-sky-600 dark:text-sky-400",
    categoryBorder: "border-sky-200/70 dark:border-sky-800/50",
    title: "FinSight Real-Time Analytics",
    description:
      "A sub-second financial intelligence dashboard delivering streaming market insights, automated report generation, and role-based access control.",
    metric1: {
      icon: TrendingUp,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
      iconColor: "text-emerald-500",
      value: "+180%",
      label: "User Engagement",
    },
    metric2: {
      icon: Clock,
      iconBg: "bg-purple-50 dark:bg-purple-950/50",
      iconColor: "text-purple-500",
      value: "60%",
      label: "Faster Reporting",
    },
    techStack: [
      { name: "Next.js 16", icon: <NextJsLogo /> },
      { name: "React 19", icon: <ReactLogo /> },
      { name: "PostgreSQL", icon: <PostgresLogo /> },
      { name: "Tailwind CSS", icon: <TailwindLogo /> },
    ],
    renderMockup: () => (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800 p-2.5 sm:p-3 shadow-xs h-full flex flex-col justify-between">
        <div className="flex gap-2.5 h-full">
          {/* Mini Sidebar */}
          <div className="w-20 shrink-0 border-r border-slate-100 dark:border-slate-800 pr-2 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-slate-800 dark:text-white flex items-center gap-1 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> FinSight
              </div>
              <div className="space-y-1">
                <div className="px-1.5 py-1 rounded bg-blue-600 text-white text-[8px] font-semibold flex items-center gap-1">
                  <LayoutGrid className="w-2.5 h-2.5" /> Dashboard
                </div>
                <div className="px-1.5 py-1 text-slate-500 dark:text-slate-400 text-[8px] font-medium flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5" /> Analytics
                </div>
                <div className="px-1.5 py-1 text-slate-500 dark:text-slate-400 text-[8px] font-medium flex items-center gap-1">
                  <FileText className="w-2.5 h-2.5" /> Reports
                </div>
                <div className="px-1.5 py-1 text-slate-500 dark:text-slate-400 text-[8px] font-medium flex items-center gap-1">
                  <Users className="w-2.5 h-2.5" /> Users
                </div>
              </div>
            </div>
            <div className="text-[7px] text-slate-400">Settings</div>
          </div>

          {/* Main Dashboard Panel */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Search Input */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 rounded px-2 py-1 text-[8px] text-slate-400 border border-slate-100 dark:border-slate-700/50 mb-2">
              <Search className="w-2.5 h-2.5" /> Search forecasts...
            </div>

            {/* Metric widget */}
            <div className="bg-slate-50/80 dark:bg-slate-800/40 rounded-lg p-2 border border-slate-100 dark:border-slate-700/50 mb-2 flex items-center justify-between">
              <div>
                <span className="text-[8px] text-slate-400 font-medium">Total Revenue</span>
                <div className="text-xs font-bold text-slate-900 dark:text-white">$12,4M</div>
              </div>
              <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-full border border-emerald-200/50">
                +18%
              </span>
            </div>

            {/* Area Chart SVG */}
            <div className="h-16 w-full relative">
              <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 32 Q15 28 30 20 T60 18 T85 10 T100 4 L100 40 L0 40 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M0 32 Q15 28 30 20 T60 18 T85 10 T100 4"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "shopgo",
    category: "Mobile App",
    categoryIcon: Smartphone,
    categoryBg: "bg-emerald-50 dark:bg-emerald-950/40",
    categoryText: "text-emerald-600 dark:text-emerald-400",
    categoryBorder: "border-emerald-200/70 dark:border-emerald-800/50",
    title: "ShopGo Omnichannel Commerce",
    description:
      "Cross-platform mobile e-commerce application with 1-click biometrics checkout, real-time order tracking, and offline inventory caching.",
    metric1: {
      icon: ShoppingCart,
      iconBg: "bg-cyan-50 dark:bg-cyan-950/50",
      iconColor: "text-cyan-500",
      value: "2.4 ×",
      label: "Checkout Conversion",
    },
    metric2: {
      icon: Users,
      iconBg: "bg-purple-50 dark:bg-purple-950/50",
      iconColor: "text-purple-500",
      value: "3M+",
      label: "Happy Users",
    },
    techStack: [
      { name: "React Native", icon: <ReactLogo /> },
      { name: "TypeScript", icon: <TypeScriptLogo /> },
      { name: "Stripe API", icon: <StripeLogo /> },
      { name: "Node.js", icon: <NodeJsLogo /> },
    ],
    renderMockup: () => (
      <div className="relative h-full flex items-center justify-center overflow-hidden py-1">
        {/* Front Phone */}
        <div className="w-[125px] sm:w-[135px] bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-800 shadow-xl p-2 z-10">
          <div className="flex items-center justify-between text-[7px] text-slate-400 mb-1 px-1">
            <span>9:41</span>
            <span className="font-bold text-slate-800 dark:text-white">shopgo</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 rounded px-1.5 py-0.5 text-[7px] text-slate-400 mb-2 flex items-center gap-1">
            <Search className="w-2 h-2" /> Search products...
          </div>
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-2 mb-2 shadow-xs">
            <div className="text-[7px] font-bold leading-tight">New Collection</div>
            <div className="text-[6px] text-blue-200">Up to 40% off</div>
            <div className="mt-1 inline-block bg-white text-blue-600 text-[6px] font-bold px-1.5 py-0.5 rounded">
              Shop Now
            </div>
          </div>
          {/* Category Icons */}
          <div className="flex justify-between text-[6px] text-slate-600 dark:text-slate-300 font-medium">
            <span className="bg-slate-50 dark:bg-slate-800 px-1 py-0.5 rounded">Electronics</span>
            <span className="bg-slate-50 dark:bg-slate-800 px-1 py-0.5 rounded">Fashion</span>
            <span className="bg-slate-50 dark:bg-slate-800 px-1 py-0.5 rounded">Home</span>
          </div>
        </div>

        {/* Slanted Back Phone */}
        <div className="w-[115px] sm:w-[125px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-lg p-2 absolute right-2 sm:right-4 rotate-6 opacity-95">
          <div className="w-full h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 text-[8px] mb-2 font-medium">
            👟 Air Max $129
          </div>
          <div className="text-[7px] font-bold text-slate-900 dark:text-white">Nike Air Max</div>
          <div className="flex items-center text-[6px] text-amber-500 mb-1">
            <Star className="w-2 h-2 fill-amber-400 text-amber-400" /> 4.8 (2.1k)
          </div>
          <div className="flex gap-1 text-[6px] mb-2">
            <span className="border border-slate-200 px-1 rounded">8</span>
            <span className="border border-slate-200 px-1 rounded bg-blue-50 text-blue-600 font-bold">9</span>
            <span className="border border-slate-200 px-1 rounded">10</span>
          </div>
          <div className="w-full bg-blue-600 text-white text-[7px] font-bold py-1 rounded text-center">
            Add to Cart
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "teamflow",
    category: "Enterprise",
    categoryIcon: Briefcase,
    categoryBg: "bg-purple-50 dark:bg-purple-950/40",
    categoryText: "text-purple-600 dark:text-purple-400",
    categoryBorder: "border-purple-200/70 dark:border-purple-800/50",
    title: "TeamFlow Enterprise Hub",
    description:
      "Robust .NET microservices architecture managing multi-tenant team workflows, real-time document collaboration, and compliance auditing for 50,000+ seats.",
    metric1: {
      icon: Users,
      iconBg: "bg-blue-50 dark:bg-blue-950/50",
      iconColor: "text-blue-500",
      value: "50,000+",
      label: "Active Users",
    },
    metric2: {
      icon: Zap,
      iconBg: "bg-purple-50 dark:bg-purple-950/50",
      iconColor: "text-purple-500",
      value: "40%",
      label: "Server Latency Reduction",
    },
    techStack: [
      { name: ".NET 9 / C#", icon: <DotNetLogo /> },
      { name: "Azure Cloud", icon: <AzureLogo /> },
      { name: "Docker", icon: <DockerLogo /> },
      { name: "gRPC", icon: <GrpcLogo /> },
    ],
    renderMockup: () => (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800 p-2.5 sm:p-3 shadow-xs h-full flex flex-col justify-between">
        <div className="flex gap-2.5 h-full">
          {/* Mini Sidebar */}
          <div className="w-18 shrink-0 border-r border-slate-100 dark:border-slate-800 pr-2 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-slate-800 dark:text-white flex items-center gap-1 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" /> TeamFlow
              </div>
              <div className="space-y-1">
                <div className="px-1.5 py-1 rounded bg-indigo-600 text-white text-[8px] font-semibold flex items-center gap-1">
                  Home
                </div>
                <div className="px-1.5 py-1 text-slate-500 text-[8px] font-medium">Projects</div>
                <div className="px-1.5 py-1 text-slate-500 text-[8px] font-medium">Teams</div>
                <div className="px-1.5 py-1 text-slate-500 text-[8px] font-medium">Documents</div>
              </div>
            </div>
            <div className="text-[7px] text-slate-400">Audit Logs</div>
          </div>

          {/* Main Dashboard Panel */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold text-slate-800 dark:text-white">Project Overview</span>
              <span className="text-[7px] text-slate-400">Oct 2026</span>
            </div>

            {/* 2 Stat Cards */}
            <div className="grid grid-cols-2 gap-1.5 mb-2">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-1.5 rounded border border-slate-100 dark:border-slate-700/50">
                <div className="text-[10px] font-extrabold text-slate-900 dark:text-white leading-none">234</div>
                <div className="text-[7px] text-slate-400 mt-0.5">Active Projects</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-1.5 rounded border border-slate-100 dark:border-slate-700/50">
                <div className="text-[10px] font-extrabold text-slate-900 dark:text-white leading-none">50,000+</div>
                <div className="text-[7px] text-slate-400 mt-0.5">Team Members</div>
              </div>
            </div>

            {/* Task Checklist Rows */}
            <div className="space-y-1 text-[7px]">
              <div className="flex items-center justify-between p-1 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/40">
                <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                  <Check className="w-2 h-2 text-indigo-600" /> Design new workflow
                </span>
                <span className="text-blue-600 bg-blue-50 px-1 rounded font-semibold">In Progress</span>
              </div>
              <div className="flex items-center justify-between p-1 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/40">
                <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                  <Check className="w-2 h-2 text-emerald-600" /> API Integration
                </span>
                <span className="text-emerald-600 bg-emerald-50 px-1 rounded font-semibold">Completed</span>
              </div>
              <div className="flex items-center justify-between p-1 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/40">
                <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                  <Check className="w-2 h-2 text-amber-600" /> Security audit
                </span>
                <span className="text-amber-600 bg-amber-50 px-1 rounded font-semibold">In Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "nexusai",
    category: "AI & Cloud",
    categoryIcon: Cloud,
    categoryBg: "bg-amber-50 dark:bg-amber-950/40",
    categoryText: "text-amber-600 dark:text-amber-400",
    categoryBorder: "border-amber-200/70 dark:border-amber-800/50",
    title: "NexusAI Process Automator",
    description:
      "An intelligent document parsing and anomaly detection engine powered by custom LLM pipelines, vector databases, and automated compliance verification.",
    metric1: {
      icon: FileText,
      iconBg: "bg-cyan-50 dark:bg-cyan-950/50",
      iconColor: "text-cyan-500",
      value: "85%",
      label: "Time Saved on Audits",
    },
    metric2: {
      icon: ShieldCheck,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
      iconColor: "text-emerald-500",
      value: "99.9%",
      label: "Accuracy Rate",
    },
    techStack: [
      { name: "Python", icon: <PythonLogo /> },
      { name: "FastAPI", icon: <FastApiLogo /> },
      { name: "Vector DB", icon: <VectorDbLogo /> },
      { name: "AWS Fargate", icon: <AwsLogo /> },
    ],
    renderMockup: () => (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800 p-2.5 sm:p-3 shadow-xs h-full flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-2 h-full">
          {/* Flowchart Pipeline */}
          <div className="flex flex-col justify-between space-y-1">
            <div className="px-2 py-1 rounded bg-sky-50 dark:bg-sky-950/50 border border-sky-200/60 text-[7px] font-semibold text-sky-700 dark:text-sky-300 flex items-center gap-1">
              <FileText className="w-2.5 h-2.5" /> Document Ingestion
            </div>
            <div className="text-center text-[7px] text-slate-400 leading-none">↓</div>
            <div className="px-2 py-1 rounded bg-purple-50 dark:bg-purple-950/50 border border-purple-200/60 text-[7px] font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" /> AI Processing (LLM + Vector)
            </div>
            <div className="text-center text-[7px] text-slate-400 leading-none">↓</div>
            <div className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-950/50 border border-amber-200/60 text-[7px] font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5" /> Anomaly Detection
            </div>
            <div className="text-center text-[7px] text-slate-400 leading-none">↓</div>
            <div className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 text-[7px] font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" /> Compliance Report
            </div>
          </div>

          {/* Mini Report Card */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-2 border border-slate-100 dark:border-slate-700/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[8px] font-bold text-slate-800 dark:text-white">Audit Report</span>
                <span className="text-[6px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-1 py-0.5 rounded-full">
                  ✔ Verified
                </span>
              </div>
              <div className="space-y-1 text-[7px] text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1">
                  <Check className="w-2 h-2 text-emerald-500" /> Document Valid
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-2 h-2 text-emerald-500" /> No Anomalies Found
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-2 h-2 text-emerald-500" /> Compliance Ready
                </div>
              </div>
            </div>
            <div className="w-full bg-emerald-600 text-white text-[7px] font-bold py-1 rounded text-center">
              Export Verified PDF
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const filterCategories = [
  { label: "All Projects", icon: LayoutGrid, iconColor: "text-blue-600" },
  { label: "Web App", icon: Monitor, iconColor: "text-sky-600" },
  { label: "Mobile App", icon: Smartphone, iconColor: "text-emerald-600" },
  { label: "Enterprise", icon: Briefcase, iconColor: "text-purple-600" },
  { label: "AI & Cloud", icon: Cloud, iconColor: "text-amber-600" },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<string>("All Projects");

  const filtered =
    activeTab === "All Projects"
      ? caseStudies
      : caseStudies.filter((p) => p.category === activeTab);

  return (
    <section
      id="portfolio"
      className="relative py-16 sm:py-24 lg:py-28 bg-[#fafcff] dark:bg-slate-950 overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Soft Ambient Radial Background Glows */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-12 -right-24 w-[550px] h-[550px] bg-sky-100/60 dark:bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Matrix Dots - Far Right Top */}
      <div className="hidden xl:block absolute right-8 top-16 w-16 h-20 opacity-30 pointer-events-none">
        <svg width="64" height="80" viewBox="0 0 64 80" fill="none">
          {Array.from({ length: 20 }).map((_, i) => (
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
        {/* Floating Accent Card & Callout - Top Right */}
        <div className="hidden lg:flex absolute top-0 right-28 xl:right-36 items-center gap-3 z-20 pointer-events-none">
          {/* 50+ Projects Delivered Glass Card */}
          <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3.5 animate-float">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-[#0869e8] dark:text-cyan-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white leading-none">
                50+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                Projects Delivered
              </div>
            </div>
          </div>

          {/* Playful Handwritten Callout & Arrow */}
          <div className="flex flex-col items-start translate-y-4">
            <div className="text-blue-600 dark:text-cyan-400 font-sans italic font-bold text-xs tracking-tight leading-tight rotate-[-4deg]">
              Real Impact
              <br />
              Real Results
            </div>
            <svg
              className="w-10 h-8 text-blue-500 -ml-2 -mt-1"
              viewBox="0 0 50 40"
              fill="none"
            >
              <path
                d="M 10 5 Q 35 15 25 35"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M 20 28 L 25 35 L 32 30"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200/70 dark:border-blue-800/60 text-[#0869e8] dark:text-cyan-400 text-[11px] font-bold tracking-wider uppercase mb-5 backdrop-blur-md shadow-xs">
            <BarChart3 className="w-3.5 h-3.5 text-[#0869e8] dark:text-cyan-400" />
            <span>PROVEN CLIENT RESULTS</span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.14] mb-4">
            Featured Case Studies &
            <br />
            <span className="text-[#0869e8] dark:text-[#38bdf8]">Shipped </span>
            <span className="text-[#00c5a0] dark:text-[#2dd4bf]">Systems</span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Explore how we engineer scalable architectures that drive measurable business impact for global enterprise clients.
          </p>
        </div>

        {/* Filter Pills & CTA Button Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 sm:mb-10">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {filterCategories.map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-xs ${
                    isActive
                      ? "bg-[#0869e8] text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                      : "bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-[#0869e8] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800"
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

          {/* "Start Your Project ->" CTA Button */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-[#0869e8] hover:bg-[#0052cc] text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all self-start md:self-auto cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Case Studies (2x2 Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
          {filtered.map((cs) => (
            <article
              key={cs.id}
              className="relative bg-white dark:bg-slate-900/90 rounded-3xl p-5 sm:p-6 lg:p-7 border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col xl:flex-row gap-6 group"
            >
              {/* Left Column: Details, Metrics, Tech Stack */}
              <div className="xl:w-[48%] flex flex-col justify-between">
                <div>
                  {/* Category Pill Badge */}
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cs.categoryBg} ${cs.categoryText} ${cs.categoryBorder} mb-3`}
                  >
                    <cs.categoryIcon className="w-3.5 h-3.5" />
                    <span>{cs.category}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-[#0869e8] dark:group-hover:text-cyan-400 transition-colors">
                    {cs.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                    {cs.description}
                  </p>
                </div>

                <div>
                  {/* Two Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${cs.metric1.iconBg} ${cs.metric1.iconColor}`}
                      >
                        <cs.metric1.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-none">
                          {cs.metric1.value}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                          {cs.metric1.label}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${cs.metric2.iconBg} ${cs.metric2.iconColor}`}
                      >
                        <cs.metric2.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-none">
                          {cs.metric2.value}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                          {cs.metric2.label}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    {cs.techStack.map((tech) => (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200/70 dark:border-slate-700/60 text-[11px] font-semibold text-slate-700 dark:text-slate-300 shadow-2xs"
                      >
                        {tech.icon}
                        <span>{tech.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Realistic Browser UI Mockup */}
              <div className="xl:w-[52%] relative bg-slate-50/70 dark:bg-slate-950/60 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 p-3 sm:p-4 flex flex-col justify-between min-h-[260px] overflow-hidden">
                {/* Browser URL Bar */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pb-2 border-b border-slate-200/50 dark:border-slate-800/60 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>production.bitjunoo.app</span>
                  </div>
                  <span className="tracking-widest">•••</span>
                </div>

                {/* Mockup Screen Content */}
                <div className="flex-1">
                  {cs.renderMockup()}
                </div>

                {/* Dark Navy Circle Button with Arrow Up Right */}
                <Link
                  href="/contact"
                  className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0a142f] text-white flex items-center justify-center shadow-lg group-hover:bg-[#0869e8] group-hover:scale-110 transition-all duration-300 cursor-pointer z-20"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

