"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronUp,
  ShieldCheck,
  Building2,
  ChevronRight,
  Send,
  Cloud,
  Users
} from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/bitjuno/",
    icon: (
      <svg className="w-4 h-4 text-[#0a66c2]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://x.com/bitjuno",
    icon: (
      <svg className="w-4 h-4 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/bitjuno",
    icon: (
      <svg className="w-4 h-4 text-[#e4405f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="w-4 h-4 text-[#ff0000]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/bitjuno",
    icon: (
      <svg className="w-4 h-4 text-[#1877f2]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/singhupen",
    icon: (
      <svg className="w-4 h-4 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Tech Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const coreServices = [
  { label: "Enterprise Web Applications", href: "/services" },
  { label: "Mobile App Development", href: "/services" },
  { label: "Scalable .NET Systems", href: "/services" },
  { label: "Cloud & DevOps Architecture", href: "/services" },
  { label: "AI Agents & Intelligent LLMs", href: "/services" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmail("");
      alert("Subscribed successfully!");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#F4F9FF] dark:bg-[#070b14] text-slate-600 dark:text-slate-300 overflow-hidden font-sans pt-12 pb-6">
      {/* Decorative Wave Background */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-50 dark:opacity-20 z-0">
        <svg
          className="relative block w-full h-[150px] lg:h-[250px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,115.35,192.36,101.44,236.42,91.56,279.7,73.5,321.39,56.44Z"
            fill="#E6F0F9"
            className="dark:fill-[#0a1122]"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10">
          
          {/* Column 1: Brand Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <img src="/icon.png" alt="Bitjuno Logo" className="h-14 md:h-16 w-auto object-contain dark:hidden" />
              <img src="/icon-dark.png" alt="Bitjuno Logo" className="h-14 md:h-16 w-auto object-contain hidden dark:block" />
            </Link>

            <p className="text-[13px] sm:text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm font-medium">
              Bitjuno combines strategic consulting with modern technology to build secure, scalable, and high-performance digital solutions that help businesses grow faster.
            </p>

            {/* SLA Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F2FC] dark:bg-[#0a1122] text-[#0869E8] dark:text-[#38bdf8] text-[11px] font-semibold border border-[#DCE8F5] dark:border-slate-800 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Enterprise SLA Guaranteed • New Delhi & Global Remote</span>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-3 tracking-wider">
                FOLLOW US
              </div>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-[#E6F0F9] dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Services (2.5 Cols) */}
          <div className="lg:col-span-3 sm:col-span-1 pl-0 lg:pl-4">
            <div className="flex items-center gap-2 mb-6 text-slate-800 dark:text-white font-bold text-[14px] tracking-wide">
              <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-[#0869E8]/10 text-[#0869E8] dark:bg-[#38bdf8]/10 dark:text-[#38bdf8]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              SERVICES
            </div>
            <ul className="space-y-4">
              {coreServices.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="flex items-center justify-between text-[14px] text-slate-500 dark:text-slate-400 hover:text-[#0869E8] dark:hover:text-[#38bdf8] transition-colors group font-medium"
                  >
                    <span>{service.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0869E8] dark:group-hover:text-[#38bdf8] transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company (2 Cols) */}
          <div className="lg:col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-6 text-slate-800 dark:text-white font-bold text-[14px] tracking-wide">
              <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-[#08B9D9]/10 text-[#08B9D9] dark:bg-[#22d3ee]/10 dark:text-[#22d3ee]">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              COMPANY
            </div>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between text-[14px] text-slate-500 dark:text-slate-400 hover:text-[#0869E8] dark:hover:text-[#38bdf8] transition-colors group font-medium"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0869E8] dark:group-hover:text-[#38bdf8] transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch Card (3.5 Cols) */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-[0_10px_40px_rgba(8,105,232,0.06)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-[#E6F0F9] dark:border-slate-800 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-5 text-slate-800 dark:text-white font-bold text-[14px] tracking-wide">
                <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-[#0869E8]/10 text-[#0869E8] dark:bg-[#38bdf8]/10 dark:text-[#38bdf8]">
                  <Send className="w-3 h-3" />
                </div>
                GET IN TOUCH
              </div>

              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F4F9FF] dark:bg-slate-800 border border-[#E6F0F9] dark:border-slate-700 flex items-center justify-center text-[#0869E8] dark:text-[#38bdf8] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Official Email</div>
                    <a href="mailto:hello@bitjunoo.com" className="text-[13px] font-bold text-slate-700 dark:text-slate-200 hover:text-[#0869E8] dark:hover:text-[#38bdf8]">hello@bitjunoo.com</a>
                  </div>
                </div>

                {/* Phone */}
                {/* 
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F4F9FF] dark:bg-slate-800 border border-[#E6F0F9] dark:border-slate-700 flex items-center justify-center text-[#0869E8] dark:text-[#38bdf8] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Phone & WhatsApp</div>
                    <a href="tel:+918882434777" className="text-[13px] font-bold text-slate-700 dark:text-slate-200 hover:text-[#0869E8] dark:hover:text-[#38bdf8]">+91- 88824 34777</a>
                  </div>
                </div>
                */}

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F4F9FF] dark:bg-slate-800 border border-[#E6F0F9] dark:border-slate-700 flex items-center justify-center text-[#0869E8] dark:text-[#38bdf8] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Headquarters</div>
                    <div className="text-[13px] font-bold text-slate-700 dark:text-slate-200">New Delhi, India</div>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-[#E6F0F9] dark:bg-slate-800 my-5" />

              <div className="text-[12px] text-slate-500 dark:text-slate-400 font-medium mb-3">
                Subscribe to our newsletter
              </div>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for updates..."
                  className="w-full h-10 pl-4 pr-12 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/50 border border-[#E6F0F9] dark:border-slate-700 text-[12px] text-slate-700 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0869E8] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 w-8 h-8 rounded-lg bg-[#0869E8] text-white flex items-center justify-center hover:bg-[#168CFF] transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar Container */}
        <div className="mt-4 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:px-6 shadow-sm border border-[#E6F0F9] dark:border-slate-800 flex flex-col xl:flex-row items-center justify-between gap-6 relative z-20">
          
          {/* Copyright */}
          <div className="text-[13px] text-slate-500 font-medium flex items-center gap-1.5 whitespace-nowrap">
            &copy; 2026 <strong className="text-slate-700 dark:text-slate-200">Bitjuno Technologies.</strong>
            <span className="text-slate-400">All rights reserved.</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 border-y xl:border-y-0 xl:border-x border-[#E6F0F9] dark:border-slate-800 py-3 xl:py-0 px-0 xl:px-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[12px] font-bold text-slate-700 dark:text-slate-200 leading-tight">ISO 27001</div>
                <div className="text-[10px] text-slate-400 font-medium leading-tight">Data Security</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#E8F2FC] dark:bg-[#0a1122] flex items-center justify-center text-[#0869E8] dark:text-[#38bdf8] shrink-0">
                <Cloud className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[12px] font-bold text-slate-700 dark:text-slate-200 leading-tight">Cloud Ready</div>
                <div className="text-[10px] text-slate-400 font-medium leading-tight">Scalable Infra</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#E8F2FC] dark:bg-[#0a1122] flex items-center justify-center text-[#0869E8] dark:text-[#38bdf8] shrink-0">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[12px] font-bold text-slate-700 dark:text-slate-200 leading-tight">Trusted Partner</div>
                <div className="text-[10px] text-slate-400 font-medium leading-tight">For Global Businesses</div>
              </div>
            </div>
          </div>

          {/* Links & Back to Top */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-5 text-[12px] font-medium text-slate-400">
              <Link href="/about" className="hover:text-[#0869E8] transition-colors">Privacy Policy</Link>
              <Link href="/about" className="hover:text-[#0869E8] transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-[#0869E8] transition-colors">Security</Link>
            </div>
            
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E6F0F9] dark:border-slate-800 text-[12px] font-bold text-slate-600 dark:text-slate-300 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors"
            >
              Back to Top
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}