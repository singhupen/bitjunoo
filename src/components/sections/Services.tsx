"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Code2, 
  Cloud, 
  Cpu, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Code2,
    badgeBg: "bg-[#EEF7FF] text-[#0869E8] dark:bg-sky-950/60 dark:text-[#38bdf8]",
    graphic3d: "/services/Glossy-Isometric.png",
    graphicAlt: "3D Custom Software & Mobile Mockups",
    title: "Custom Software Development",
    desc: "Tailored web and mobile applications built for your business goals.",
    features: [
      "Web & Mobile Applications",
      "Scalable Architecture",
      "Product Engineering",
    ],
    href: "/services",
  },
  {
    icon: Cloud,
    badgeBg: "bg-[#EEF7FF] text-[#0869E8] dark:bg-sky-950/60 dark:text-[#38bdf8]",
    graphic3d: "/services/Glossy-Cloud.png",
    graphicAlt: "3D Cloud & DevOps Server Infrastructure",
    title: "Cloud & DevOps",
    desc: "Scalable cloud infrastructure, CI/CD pipelines, and DevOps automation.",
    features: [
      "Cloud Infrastructure",
      "CI/CD Automation",
      "Monitoring & Optimization",
    ],
    href: "/services",
  },
  {
    icon: Cpu,
    badgeBg: "bg-[#EEF7FF] text-[#0869E8] dark:bg-sky-950/60 dark:text-[#38bdf8]",
    graphic3d: "/services/Neon-Brain.png",
    graphicAlt: "3D AI & Neural Automation Network",
    title: "AI & Automation",
    desc: "Leverage AI and automation to improve efficiency and decision making.",
    features: [
      "AI-Powered Solutions",
      "Workflow Automation",
      "Data Intelligence",
    ],
    href: "/services",
  },
  {
    icon: ShieldCheck,
    badgeBg: "bg-[#DDF7FC] text-[#08B9D9] dark:bg-cyan-950/60 dark:text-cyan-300",
    graphic3d: "/services/Growth-Chart.png",
    graphicAlt: "3D IT Consulting Growth Charts",
    title: "IT Consulting",
    desc: "Strategic technology consulting to modernize and scale your business.",
    features: [
      "Technology Strategy",
      "Digital Transformation",
      "Enterprise Architecture",
    ],
    href: "/services",
  },
];

export default function Services() {
  return (
    <section 
      id="services" 
      className="relative pt-10 pb-8 sm:pt-12 sm:pb-10 lg:pt-14 lg:pb-12 bg-[#FFFFFF] dark:bg-[#070E1E] overflow-hidden transition-colors duration-300"
    >
      {/* ── Background Atmospheric Curved Waves & Gradients ── */}
      <div 
        className="absolute top-0 left-[-15%] w-[850px] h-[850px] rounded-full pointer-events-none opacity-60 dark:opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(221, 247, 252, 0.7) 0%, rgba(238, 247, 255, 0.3) 50%, transparent 75%)",
          filter: "blur(90px)",
        }}
      />
      <div 
        className="absolute bottom-0 right-[-15%] w-[900px] h-[900px] rounded-full pointer-events-none opacity-60 dark:opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(238, 247, 255, 0.8) 0%, rgba(8, 105, 232, 0.05) 45%, transparent 75%)",
          filter: "blur(90px)",
        }}
      />

      {/* Floating Translucent Ambient Circle Orbs (Matching Reference Image) */}
      <div className="absolute top-16 left-[18%] w-12 h-12 rounded-full bg-[#0869E8]/10 dark:bg-[#38bdf8]/15 blur-xs pointer-events-none hidden md:block" />
      <div className="absolute top-10 right-[22%] w-16 h-16 rounded-full bg-[#08B9D9]/15 dark:bg-[#22d3ee]/20 blur-xs pointer-events-none hidden md:block" />

      {/* Decorative Dot Matrix on Left & Right Sides (Matching Reference Image) */}
      <div className="absolute left-6 lg:left-14 top-20 pointer-events-none opacity-35 dark:opacity-20 hidden lg:block">
        <svg width="60" height="60" fill="none" viewBox="0 0 60 60">
          <pattern id="services-dots-left" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.5" fill="#0869E8" />
          </pattern>
          <rect width="60" height="60" fill="url(#services-dots-left)" />
        </svg>
      </div>

      <div className="absolute right-6 lg:right-14 top-24 pointer-events-none opacity-35 dark:opacity-20 hidden lg:block">
        <svg width="60" height="60" fill="none" viewBox="0 0 60 60">
          <pattern id="services-dots-right" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.5" fill="#0869E8" />
          </pattern>
          <rect width="60" height="60" fill="url(#services-dots-right)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0B1733] border border-[#DCE8F5] dark:border-slate-800 shadow-[0_2px_12px_rgba(8,105,232,0.06)] text-xs font-semibold mb-4 text-[#0B1733] dark:text-slate-200"
          >
            <span className="w-2 h-2 rounded-full bg-[#0869E8] dark:bg-[#38bdf8]" />
            <span>Our Services</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#0B1733] dark:text-white tracking-tight leading-[1.12] mb-4"
          >
            End-to-End <span className="text-[#0869E8] dark:text-[#38bdf8]">IT Solutions</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm sm:text-base text-[#50627D] dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal"
          >
            We help businesses design, build, and scale digital products with modern technologies and industry best practices.
          </motion.p>
        </div>

        {/* 4 Service Cards Grid (Exact Composition Matching Reference Image) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * index, duration: 0.6 }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-[26px] bg-white dark:bg-[#0B1733]/85 border border-[#DCE8F5] dark:border-slate-800 shadow-[0_12px_40px_rgba(24,88,150,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(8,105,232,0.12)] hover:border-[#0869E8]/40 dark:hover:border-[#38bdf8]/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Top Row: Icon Badge (Left) & 3D Illustration Graphic (Right) */}
                  <div className="flex items-start justify-between gap-3 mb-6 min-h-[90px]">
                    {/* Small Icon Badge */}
                    <div className={`w-12 h-12 rounded-2xl ${item.badgeBg} border border-[#DCE8F5]/80 dark:border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-2xs`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* 3D Isometric Illustration Graphic */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 -mt-2 -mr-1 shrink-0 flex items-center justify-center pointer-events-none">
                      <Image
                        src={item.graphic3d}
                        alt={item.graphicAlt}
                        width={120}
                        height={110}
                        className="w-full h-auto object-contain drop-shadow-[0_8px_18px_rgba(8,105,232,0.15)] dark:drop-shadow-[0_8px_25px_rgba(56,189,248,0.22)] group-hover:scale-108 group-hover:-translate-y-1 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-[20px] font-bold text-[#0B1733] dark:text-white tracking-tight leading-snug mb-2.5 group-hover:text-[#0869E8] dark:group-hover:text-[#38bdf8] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13.5px] text-[#50627D] dark:text-slate-300 leading-relaxed font-normal mb-6">
                    {item.desc}
                  </p>

                  {/* Checklist (3 bullet points per card with blue checkmarks) */}
                  <ul className="space-y-2.5 mb-7">
                    {item.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-[13px] text-[#50627D] dark:text-slate-200 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#0869E8] dark:text-[#38bdf8] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action: "Learn More →" link */}
                <div className="pt-2 border-t border-[#DCE8F5]/70 dark:border-slate-800/80">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0869E8] dark:text-[#38bdf8] hover:text-[#168CFF] transition-colors group/link py-1"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
