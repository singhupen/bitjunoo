"use client";

import Link from "next/link";
import { 
  Code2, 
  Cloud, 
  Cpu, 
  ShieldCheck, 
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    desc: "Tailored web and mobile applications built for your business goals.",
    href: "/services",
    iconBg: "bg-[#EEF7FF] text-[#0869E8] dark:bg-sky-950/40 dark:text-cyan-400",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Scalable cloud infrastructure, CI/CD pipelines, and DevOps automation.",
    href: "/services",
    iconBg: "bg-[#EEF7FF] text-[#0869E8] dark:bg-sky-950/40 dark:text-cyan-400",
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    desc: "Leverage AI and automation to improve efficiency and decision making.",
    href: "/services",
    iconBg: "bg-[#DDF7FC] text-[#08B9D9] dark:bg-cyan-950/40 dark:text-cyan-300",
  },
  {
    icon: ShieldCheck,
    title: "IT Consulting",
    desc: "Strategic technology consulting to modernize and scale your business.",
    href: "/services",
    iconBg: "bg-[#EEF7FF] text-[#0869E8] dark:bg-sky-950/40 dark:text-cyan-400",
  },
];

export default function Services() {
  return (
    <section 
      id="services" 
      className="relative py-20 sm:py-24 lg:py-28 bg-[#FFFFFF] dark:bg-[#070E1E] overflow-hidden transition-colors duration-300"
    >
      {/* Background soft ambient blobs */}
      <div 
        className="absolute top-1/2 left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none dark:hidden"
        style={{
          background: "radial-gradient(circle, rgba(238, 247, 255, 0.9) 0%, rgba(221, 247, 252, 0.4) 40%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div 
        className="absolute top-1/3 right-[-10%] w-[650px] h-[650px] rounded-full pointer-events-none opacity-50 dark:opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(8, 105, 232, 0.08) 0%, rgba(8, 185, 217, 0.04) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Dark mode specific cyan ambient bloom */}
      <div 
        className="absolute top-1/2 left-[-5%] w-[550px] h-[550px] rounded-full pointer-events-none hidden dark:block opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(8, 105, 232, 0.1) 45%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0B1733] border border-[#DCE8F5] dark:border-slate-800 shadow-[0_2px_10px_rgba(8,105,232,0.06)] text-xs font-semibold mb-4 text-[#0B1733] dark:text-slate-200"
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
            className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0B1733] dark:text-white tracking-tight leading-[1.14] mb-4"
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

        {/* 4 Service Cards Grid (Matching Reference Composition) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-[22px] bg-white dark:bg-[#0B1733]/80 border border-[#DCE8F5] dark:border-slate-800 shadow-[0_10px_40px_rgba(24,88,150,0.06)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_50px_rgba(8,105,232,0.12)] dark:hover:shadow-[0_16px_50px_rgba(56,189,248,0.2)] hover:border-[#0869E8]/40 dark:hover:border-cyan-400/40 hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  {/* Icon badge */}
                  <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200 shadow-xs`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-[19px] font-bold text-[#0B1733] dark:text-white tracking-tight leading-snug mb-3 group-hover:text-[#0869E8] dark:group-hover:text-[#38bdf8] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13.5px] text-[#50627D] dark:text-slate-300 leading-relaxed font-normal mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Left Circular Action Arrow Button */}
                <div className="pt-2">
                  <Link
                    href={item.href}
                    className="w-10 h-10 rounded-full bg-[#F7FBFF] dark:bg-slate-900 border border-[#DCE8F5] dark:border-slate-800 text-[#0869E8] dark:text-[#38bdf8] flex items-center justify-center group-hover:bg-[#0869E8] dark:group-hover:bg-[#38bdf8] group-hover:text-white dark:group-hover:text-[#0B1733] group-hover:border-[#0869E8] dark:group-hover:border-[#38bdf8] group-hover:shadow-[0_4px_16px_rgba(8,105,232,0.3)] transition-all duration-200"
                    aria-label={`Learn more about ${item.title}`}
                  >
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
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
