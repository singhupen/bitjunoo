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
    <header
      className={`fixed left-0 right-0 z-40 px-3 sm:px-6 lg:px-8 transition-all duration-300 ${
        scrolled ? "top-2 sm:top-2.5 pt-0" : "top-8 sm:top-9 pt-1.5 sm:pt-2"
      }`}
    >
      <div
        className={`max-w-[1536px] mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between ${
          scrolled
            ? "bg-white/95 dark:bg-[#070E1E]/95 backdrop-blur-xl border border-[#DCE8F5] dark:border-slate-800/80 shadow-[0_12px_40px_rgba(11,23,51,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            : "bg-white/85 dark:bg-[#070E1E]/85 backdrop-blur-lg border border-[#DCE8F5]/80 dark:border-slate-800/60 shadow-[0_8px_30px_rgba(11,23,51,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
        }`}
      >
        {/* Brand Logo - Uses icon.png from public folder */}
        <Link href="/" className="flex items-center group py-0.5">
          <img
            src="/icon.png"
            alt="Bitjuno Logo"
            className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105 dark:hidden"
          />
          <img
            src="/icon-dark.png"
            alt="Bitjuno Logo"
            className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105 hidden dark:block"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
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
