"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Users,
  BarChart3,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  companyColor: string;
  avatar: string;
  companyLogo: React.ReactNode;
  quote: string;
  rating: number;
  tags: string[];
  tagStyle: string;
  quoteColor: string;
  cardBorder: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: "finsight",
    name: "Sarah Mitchell",
    role: "CEO & Co-Founder,",
    company: "FinSight Technologies",
    companyColor: "text-[#0869e8] dark:text-sky-400",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    companyLogo: (
      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-xs">
        <BarChart3 className="w-4 h-4 text-[#0869e8]" />
        <span>FinSight</span>
      </div>
    ),
    quote:
      "BitJunoo transformed our legacy financial system into a lightning-fast modern cloud platform. Their senior engineers delivered 2 weeks ahead of our strict regulatory deadline, and our user engagement doubled within the first quarter.",
    rating: 5,
    tags: ["Cloud Migration", "FinTech", "Enterprise"],
    tagStyle: "bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40",
    quoteColor: "text-blue-200 dark:text-blue-900/60",
    cardBorder: "border-slate-200/80 dark:border-slate-800",
  },
  {
    id: "shopgo",
    name: "James Okoro",
    role: "Founder & Head of Product,",
    company: "ShopGo Mobile",
    companyColor: "text-[#00c5a0] dark:text-teal-300",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    companyLogo: (
      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-xs">
        <div className="w-4 h-4 rounded bg-[#f97316] flex items-center justify-center text-white text-[9px] shadow-2xs">
          🛍
        </div>
        <span className="text-[#ea580c] font-black">shopgo</span>
      </div>
    ),
    quote:
      "The mobile application BitJunoo engineered exceeded our highest expectations. Flawless animations, native speed, zero crashes, and immediate App Store approval. They genuinely take ownership of product architecture.",
    rating: 5,
    tags: ["Mobile App", "Product Engineering", "E-Commerce"],
    tagStyle: "bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-300 border border-teal-100 dark:border-teal-900/40",
    quoteColor: "text-teal-200 dark:text-teal-900/60",
    cardBorder: "border-slate-200/80 dark:border-slate-800",
  },
  {
    id: "teamflow",
    name: "Emily Chen",
    role: "VP of Engineering,",
    company: "TeamFlow Inc.",
    companyColor: "text-[#2563eb] dark:text-blue-400",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    companyLogo: (
      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-xs">
        <div className="w-3.5 h-3.5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[8px]">
          ●
        </div>
        <span>TeamFlow</span>
      </div>
    ),
    quote:
      "We brought in BitJunoo to rebuild our core .NET backend microservices. The results were stellar: 40% reduction in query latencies and effortless auto-scaling during peak black Friday traffic. Their engineering rigor is unmatched.",
    rating: 5,
    tags: [".NET", "Microservices", "Scalability"],
    tagStyle: "bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/40",
    quoteColor: "text-amber-200 dark:text-amber-900/60",
    cardBorder: "border-amber-200/60 dark:border-amber-800/40",
  },
];

const metrics = [
  {
    icon: Star,
    iconBg: "bg-blue-50 dark:bg-blue-950/50 text-[#0869e8] dark:text-sky-400",
    value: "4.9 / 5.0",
    valueColor: "text-slate-900 dark:text-white",
    label: "Average Client Rating",
  },
  {
    icon: Zap,
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50 text-[#00c5a0] dark:text-teal-300",
    value: "100%",
    valueColor: "text-slate-900 dark:text-white",
    label: "On-Time Sprint Completion",
  },
  {
    icon: Users,
    iconBg: "bg-purple-50 dark:bg-purple-950/50 text-[#7c3aed] dark:text-purple-400",
    value: "92%",
    valueColor: "text-slate-900 dark:text-white",
    label: "Repeat & Retainer Clients",
  },
  {
    icon: Shield,
    iconBg: "bg-amber-50 dark:bg-amber-950/50 text-[#ea580c] dark:text-orange-400",
    value: "0 Breaches",
    valueColor: "text-[#00c5a0] dark:text-[#2dd4bf]",
    label: "Enterprise Compliance Track Record",
  },
];

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="testimonials"
      className="relative py-10 sm:py-12 lg:py-14 bg-[#fafcff] dark:bg-slate-950 overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Ambient Radial Background Lights */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-12 -right-24 w-[550px] h-[550px] bg-sky-100/60 dark:bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Matrix Dots - Left Top */}
      <div className="hidden xl:block absolute left-8 top-32 w-16 h-20 opacity-30 pointer-events-none">
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

      {/* Decorative Matrix Dots - Right Side */}
      <div className="hidden xl:block absolute right-8 top-64 w-16 h-20 opacity-25 pointer-events-none">
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
        {/* Floating Accent Card 1: Left (Trusted by Global Leaders) */}
        <div className="hidden md:flex absolute top-4 lg:top-6 left-2 sm:left-4 lg:left-8 xl:left-14 -rotate-6 items-center gap-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 pointer-events-none animate-float z-20">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight">
              Trusted by
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
              Global Leaders
            </div>
          </div>
        </div>

        {/* Hand-drawn Arrow pointing to Header */}
        <div className="hidden lg:block absolute top-16 left-48 xl:left-64 pointer-events-none">
          <svg className="w-16 h-12 text-blue-400/80" viewBox="0 0 60 40" fill="none">
            <path
              d="M 10 35 Q 35 35 48 10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M 40 10 L 48 10 L 50 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Floating Accent Card 2: Right (Real People, Real Results) */}
        <div className="hidden md:flex absolute top-2 lg:top-4 right-2 sm:right-4 lg:right-8 xl:right-14 rotate-6 items-center gap-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 pointer-events-none animate-float-delayed z-20">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-[#0869e8]">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
              Real People
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
              Real Results
            </div>
          </div>
        </div>

        {/* Curved Line with Dot on Right */}
        <div className="hidden lg:block absolute top-14 right-44 xl:right-60 pointer-events-none">
          <svg className="w-20 h-16 text-blue-500/80" viewBox="0 0 80 60" fill="none">
            <path
              d="M 5 55 Q 40 45 70 8"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle cx="70" cy="8" r="4" fill="#0869e8" />
          </svg>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200/70 dark:border-blue-800/60 text-[#0869e8] dark:text-cyan-400 text-[11px] font-bold tracking-wider uppercase mb-5 backdrop-blur-md shadow-xs">
            <Star className="w-3.5 h-3.5 text-[#0869e8] dark:text-cyan-400 fill-blue-500/20" />
            <span>REAL CLIENT TESTIMONIALS</span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.14] mb-4">
            Endorsed by Technical Leaders &
            <br />
            <span className="text-[#0869e8] dark:text-[#38bdf8]">Founders </span>
            <span className="text-[#00c5a0] dark:text-[#2dd4bf]">Worldwide</span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Discover why growth-stage companies and global enterprises trust{" "}
            <span className="font-bold text-slate-900 dark:text-white">Bitjunoo</span>{" "}
            with their critical software initiatives.
          </p>
        </div>

        {/* Testimonials Carousel / Grid Wrapper with Navigation Arrows */}
        <div className="relative">
          {/* Left Navigation Chevron Button */}
          <button
            onClick={handlePrev}
            className="hidden lg:flex absolute -left-5 xl:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-lg text-slate-700 dark:text-slate-200 items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-all z-20 cursor-pointer"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Navigation Chevron Button */}
          <button
            onClick={handleNext}
            className="hidden lg:flex absolute -right-5 xl:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-lg text-slate-700 dark:text-slate-200 items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-all z-20 cursor-pointer"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* 3 Testimonials Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsData.map((t) => (
              <div
                key={t.id}
                className={`bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-7 border ${t.cardBorder} shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  {/* Top Row: 5 Stars + Verified Project Pill Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Verified Project</span>
                    </span>
                  </div>

                  {/* Large Subtle Quote Icon */}
                  <div className={`text-4xl font-serif select-none ${t.quoteColor} leading-none mb-1`}>
                    “
                  </div>

                  {/* Quote Text */}
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed italic mb-5">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Category / Scope Pill Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-6">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${t.tagStyle}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Avatar + Name / Role + Company Logo */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate">
                        {t.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-tight">
                        {t.role}{" "}
                        <span className={`font-semibold ${t.companyColor}`}>
                          {t.company}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Company Logo on Right */}
                  <div className="shrink-0">
                    {t.companyLogo}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Pagination Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <span className="w-6 h-2 rounded-full bg-blue-600 transition-all cursor-pointer" />
            <span className="w-2 h-2 rounded-full bg-blue-200 dark:bg-blue-800 transition-all cursor-pointer" />
            <span className="w-2 h-2 rounded-full bg-blue-200 dark:bg-blue-800 transition-all cursor-pointer" />
          </div>
        </div>

        {/* Bottom Trust & Verification Stats Bar */}
        <div className="mt-6 sm:mt-8 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 lg:p-7 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
            {metrics.map((m, idx) => (
              <div
                key={m.label}
                className={`flex items-center gap-4 ${
                  idx !== 0 ? "pt-4 sm:pt-0 lg:pl-6" : ""
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${m.iconBg}`}
                >
                  <m.icon className="w-6 h-6" />
                </div>
                <div>
                  <div
                    className={`text-xl sm:text-2xl font-extrabold tracking-tight leading-none ${m.valueColor}`}
                  >
                    {m.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-snug">
                    {m.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

