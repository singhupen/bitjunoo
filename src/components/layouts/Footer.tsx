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
  CheckCircle2,
  Sparkles,
} from "lucide-react";

// Prominent Social Media Links with Brand Hover Glows & Custom SVGs
const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/bitjuno/",
    hoverColor: "hover:text-[#0a66c2] hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/10 dark:hover:bg-[#0a66c2]/20 hover:shadow-[0_0_16px_rgba(10,102,194,0.35)]",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://x.com/bitjuno",
    hoverColor: "hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/40 hover:bg-slate-100 dark:hover:bg-white/10 hover:shadow-[0_0_16px_rgba(255,255,255,0.2)]",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/bitjuno",
    hoverColor: "hover:text-[#e4405f] hover:border-[#e4405f]/50 hover:bg-[#e4405f]/10 dark:hover:bg-[#e4405f]/20 hover:shadow-[0_0_16px_rgba(228,64,95,0.35)]",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/bitjuno",
    hoverColor: "hover:text-[#1877f2] hover:border-[#1877f2]/50 hover:bg-[#1877f2]/10 dark:hover:bg-[#1877f2]/20 hover:shadow-[0_0_16px_rgba(24,119,242,0.35)]",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/singhupen",
    hoverColor: "hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/40 hover:bg-slate-100 dark:hover:bg-white/10 hover:shadow-[0_0_16px_rgba(0,100,218,0.3)]",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
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
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-50 dark:bg-[#070b14] text-slate-600 dark:text-slate-300 border-t border-slate-200/80 dark:border-slate-800/80 overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-royal-blue/10 dark:bg-royal-blue/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-cyan/10 dark:bg-brand-mint/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Subtle Gradient Edge */}
      <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-royal-blue/80 via-brand-cyan/80 to-transparent" />

      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-8 sm:pt-9 pb-4 sm:pb-5">
        {/* Main Footer Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-7 lg:gap-8 pb-4 sm:pb-5 border-b border-slate-200/70 dark:border-slate-800/70">
          {/* Column 1: Brand, Prominent Logo & Socials (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block group">
              {/* Light Mode Logo - Prominent & Crisp */}
              <img
                src="/icon.png"
                alt="BitJunoo Logo"
                className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105 dark:hidden"
              />
              {/* Dark Mode Logo - Prominent & Crisp */}
              <img
                src="/icon-dark.png"
                alt="BitJunoo Logo"
                className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105 hidden dark:block"
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              Bitjuno combines strategic consulting with modern technology to build secure, scalable, and high-performance digital solutions that help businesses grow faster.
            </p>

            {/* Social Media Icons (Prominent, High-Fidelity & Interactive) */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-royal-blue dark:text-cyan-blue" />
                Connect With Us
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className={`group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-300 shadow-xs hover:-translate-y-1 ${s.hoverColor}`}
                  >
                    <span className="transition-transform duration-300 group-hover:scale-115">
                      {s.icon}
                    </span>
                    {/* Tooltip */}
                    <span className="absolute -top-7 px-2 py-0.5 text-[10px] font-semibold text-white bg-slate-900 dark:bg-slate-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                      {s.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* SLA Badge */}
            <div className="inline-flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Enterprise SLA Guaranteed • New Delhi & Global Remote</span>
            </div>
          </div>

          {/* Column 2: Core Services (2.5 Cols) */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h4 className="font-heading text-slate-900 dark:text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <span className="w-1.5 h-3.5 rounded-full bg-royal-blue inline-block" />
              Services
            </h4>
            <ul className="space-y-2">
              {coreServices.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-royal-blue dark:hover:text-cyan-blue transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="text-xs text-royal-blue dark:text-cyan-blue opacity-0 group-hover:opacity-100 transition-opacity">
                      ›
                    </span>
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {service.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links (2 Cols) */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h4 className="font-heading text-slate-900 dark:text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <span className="w-1.5 h-3.5 rounded-full bg-brand-cyan inline-block" />
              Company
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-royal-blue dark:hover:text-brand-mint transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="text-xs text-brand-mint opacity-0 group-hover:opacity-100 transition-opacity">
                      ›
                    </span>
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter Card (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-heading text-slate-900 dark:text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <span className="w-1.5 h-3.5 rounded-full bg-brand-mint inline-block" />
              Get in Touch
            </h4>

            {/* Polished Glassmorphic Contact Card */}
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2.5">
              <a
                href="mailto:hello@bithunoo.com"
                className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 hover:text-royal-blue dark:hover:text-cyan-blue transition-colors group"
              >
                <div className="w-7 h-7 rounded-xl bg-royal-blue/10 dark:bg-cyan-blue/15 text-royal-blue dark:text-cyan-blue flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">Official Email</div>
                  <div className="font-semibold text-slate-900 dark:text-white">hello@bithunoo.com</div>
                </div>
              </a>

              <a
                href="tel:+918882434777"
                className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 hover:text-royal-blue dark:hover:text-cyan-blue transition-colors group"
              >
                <div className="w-7 h-7 rounded-xl bg-royal-blue/10 dark:bg-cyan-blue/15 text-royal-blue dark:text-cyan-blue flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">Phone & WhatsApp</div>
                  <div className="font-semibold text-slate-900 dark:text-white">+91-88824 34777</div>
                </div>
              </a>

              <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-7 h-7 rounded-xl bg-royal-blue/10 dark:bg-cyan-blue/15 text-royal-blue dark:text-cyan-blue flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">Headquarters</div>
                  <div className="font-semibold text-slate-900 dark:text-white">New Delhi, India</div>
                </div>
              </div>
            </div>

            {/* Newsletter Input */}
            <form onSubmit={handleSubscribe}>
              <div className="flex items-center gap-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for updates..."
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-royal-blue dark:focus:border-cyan-blue transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-royal-blue to-brand-cyan hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center shadow-xs transition-all flex-shrink-0 active:scale-95"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="mt-1.5 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Subscribed successfully!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar - Compact & Seamless */}
        <div className="pt-3.5 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-500 dark:text-slate-400">
          <p className="text-center sm:text-left flex items-center gap-1.5">
            <span>&copy; {new Date().getFullYear()}</span>
            <strong className="font-semibold text-slate-800 dark:text-slate-200">BitJunoo Technologies</strong>.
            <span>All rights reserved.</span>
          </p>

          <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-5 text-[11px] sm:text-xs">
            <Link href="/about" className="hover:text-royal-blue dark:hover:text-cyan-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-royal-blue dark:hover:text-cyan-blue transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-royal-blue dark:hover:text-cyan-blue transition-colors">
              Security
            </Link>

            {/* Back To Top Button */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-royal-blue/40 dark:hover:border-cyan-blue/40 text-slate-700 dark:text-slate-300 hover:text-royal-blue dark:hover:text-cyan-blue text-xs font-medium shadow-2xs transition-all active:scale-95"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ChevronUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}