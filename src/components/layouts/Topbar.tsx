"use client";

import React from "react";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/bitjuno/",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://x.com/bitjuno",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/bitjuno",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/bitjuno",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/singhupen",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017C2 16.446 4.87 20.198 8.84 21.52C9.34 21.61 9.52 21.3 9.52 21.03C9.52 20.79 9.51 20.01 9.51 19.16C6.73 19.76 6.14 17.82 6.14 17.82C5.69 16.67 5.04 16.36 5.04 16.36C4.13 15.74 5.11 15.75 5.11 15.75C6.12 15.82 6.65 16.79 6.65 16.79C7.54 18.33 8.99 17.88 9.56 17.62C9.65 16.97 9.91 16.53 10.2 16.28C7.98 16.03 5.65 15.17 5.65 11.33C5.65 10.24 6.04 9.34 6.68 8.64C6.58 8.39 6.24 7.37 6.78 6C6.78 6 7.62 5.73 9.53 7.02C10.33 6.8 11.19 6.69 12.04 6.69C12.89 6.69 13.75 6.8 14.55 7.02C16.46 5.73 17.3 6 17.3 6C17.84 7.37 17.5 8.39 17.4 8.64C18.04 9.34 18.43 10.24 18.43 11.33C18.43 15.18 16.09 16.02 13.86 16.27C14.22 16.58 14.54 17.2 14.54 18.15C14.54 19.51 14.53 20.61 14.53 20.95C14.53 21.22 14.71 21.54 15.22 21.44C19.18 20.11 22.04 16.39 22.04 12.017C22.04 6.484 17.523 2 12 2Z" />
      </svg>
    ),
  },
];

export default function Topbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-8 sm:h-9 bg-[#F7FBFF] dark:bg-[#060c1a] border-b border-[#DCE8F5] dark:border-slate-800/80 text-[#50627D] dark:text-slate-400 text-[11px] sm:text-xs transition-colors duration-300">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-8 sm:h-9 flex items-center justify-between">
        
        {/* Left Side: Contact Information & Status */}
        <div className="flex items-center gap-3 sm:gap-5 overflow-hidden">
          {/* Email */}
          <a
            href="mailto:hello@bitjunoo.com"
            className="flex items-center gap-1.5 hover:text-[#0869E8] dark:hover:text-[#38bdf8] transition-colors truncate"
            title="Email us"
          >
            <Mail className="w-3.5 h-3.5 text-[#0869E8] dark:text-[#38bdf8] shrink-0" />
            <span className="font-medium">hello@bitjunoo.com</span>
          </a>

          {/* Separator */}
          <span className="w-px h-3 bg-[#DCE8F5] dark:bg-slate-800 shrink-0 hidden xs:inline-block" />

          {/* Phone */}
          {/* 
          <a
            href="tel:+918882434777"
            className="hidden xs:flex items-center gap-1.5 hover:text-[#0869E8] dark:hover:text-[#38bdf8] transition-colors whitespace-nowrap"
            title="Call us"
          >
            <Phone className="w-3.5 h-3.5 text-[#0869E8] dark:text-[#38bdf8] shrink-0" />
            <span className="font-medium">+91-88824 34777</span>
          </a>
          */}

          {/* Location (Desktop) */}
          <span className="hidden md:flex items-center gap-1.5 text-[#718198] dark:text-slate-500 whitespace-nowrap">
            <span className="w-px h-3 bg-[#DCE8F5] dark:bg-slate-800 mr-2 shrink-0" />
            <MapPin className="w-3 h-3 text-[#0869E8] dark:text-[#38bdf8] shrink-0" />
            <span>New Delhi, India</span>
          </span>

          {/* 24/7 SLA Indicator */}
          <span className="hidden lg:flex items-center gap-1.5 text-[10.5px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            24/7 Enterprise Support
          </span>
        </div>

        {/* Right Side: Social Media Icons & Global remote note */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <span className="hidden xl:inline-block text-[11px] text-[#718198] dark:text-slate-500 font-medium">
            Global Remote Engineering
          </span>

          <span className="hidden xl:inline-block w-px h-3 bg-[#DCE8F5] dark:bg-slate-800" />

          {/* Social Links */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center text-[#50627D] dark:text-slate-400 hover:text-[#0869E8] dark:hover:text-[#38bdf8] hover:bg-[#EEF7FF] dark:hover:bg-slate-800/60 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
