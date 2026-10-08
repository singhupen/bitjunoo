"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Search } from "lucide-react";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div
        className={`max-w-[1360px] mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
          scrolled
            ? "bg-white/95 dark:bg-[#0B1733]/90 backdrop-blur-xl border border-[#DCE8F5] dark:border-slate-800/80 shadow-[0_12px_40px_rgba(11,23,51,0.08)]"
            : "bg-white/85 dark:bg-[#0B1733]/70 backdrop-blur-lg border border-[#DCE8F5]/80 dark:border-slate-800/60 shadow-[0_8px_30px_rgba(11,23,51,0.04)]"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center">
            {/* High fidelity Bitjuno B-mark */}
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9 transition-transform group-hover:scale-105"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="10" fill="url(#b-bg-grad)" fillOpacity="0.1" />
              <circle cx="15" cy="14" r="5" fill="#08B9D9" />
              <path
                d="M15 13C15 10.7909 16.7909 9 19 9H24C27.3137 9 30 11.6863 30 15C30 17.5 28.5 19.6 26.2 20.5C28.9 21.4 31 23.9 31 27C31 30.866 27.866 34 24 34H18C15.7909 34 14 32.2091 14 30V15"
                stroke="url(#b-stroke-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="21" cy="27" r="3" fill="#0869E8" />
              <defs>
                <linearGradient id="b-bg-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0869E8" />
                  <stop offset="1" stopColor="#08B9D9" />
                </linearGradient>
                <linearGradient id="b-stroke-grad" x1="14" y1="9" x2="31" y2="34" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0869E8" />
                  <stop offset="0.5" stopColor="#168CFF" />
                  <stop offset="1" stopColor="#08B9D9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-heading font-extrabold text-xl sm:text-2xl text-[#0B1733] dark:text-white tracking-tight flex items-baseline">
            Bitjuno<span className="text-[#0869E8]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[14px] font-semibold transition-all relative py-1 ${
                  active
                    ? "text-[#0869E8] dark:text-[#38bdf8]"
                    : "text-[#50627D] hover:text-[#0B1733] dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#0869E8] dark:bg-[#38bdf8]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA and Search */}
        <div className="hidden md:flex items-center gap-3">
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 rounded-xl border border-[#DCE8F5] dark:border-slate-800 bg-white dark:bg-slate-900/60 text-[#50627D] dark:text-slate-400 hover:text-[#0869E8] dark:hover:text-cyan-400 hover:border-[#0869E8]/30 flex items-center justify-center transition-all shadow-xs"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme switcher */}
          <ThemeSwitcher />

          {/* Primary CTA Button */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0869E8] via-[#168CFF] to-[#08B9D9] text-white text-sm font-semibold shadow-[0_10px_25px_rgba(8,105,232,0.22)] hover:shadow-[0_14px_30px_rgba(8,105,232,0.32)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Toggle Controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeSwitcher />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-xl text-[#0B1733] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Search Input Dropdown */}
      {searchOpen && (
        <div className="max-w-[1360px] mx-auto mt-2 px-4">
          <div className="p-3 bg-white dark:bg-[#0B1733] rounded-2xl border border-[#DCE8F5] dark:border-slate-800 shadow-xl flex items-center gap-3">
            <Search className="w-4 h-4 text-[#0869E8] ml-2" />
            <input
              type="text"
              placeholder="Search services, case studies, technologies..."
              className="w-full bg-transparent border-none text-sm text-[#0B1733] dark:text-white placeholder-[#718198] focus:outline-hidden"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs text-[#718198] hover:text-[#0B1733] px-2 py-1 rounded-md"
            >
              ESC
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden mt-2 max-w-[1360px] mx-auto bg-white/95 dark:bg-[#0B1733]/95 backdrop-blur-2xl border border-[#DCE8F5] dark:border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-800 dark:text-slate-100">
          <ul className="space-y-2">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                      active
                        ? "bg-[#EEF7FF] text-[#0869E8] dark:bg-sky-950/50 dark:text-cyan-400 border border-[#DCE8F5] dark:border-slate-800"
                        : "text-[#50627D] hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-3 border-t border-[#DCE8F5] dark:border-slate-800 flex flex-col gap-2.5">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-[#0869E8] to-[#08B9D9] text-white text-sm font-semibold shadow-md shadow-[#0869E8]/25"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
