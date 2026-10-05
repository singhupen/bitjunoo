"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
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
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-md shadow-slate-900/5 dark:shadow-black/50 py-3 sm:py-3.5"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <nav className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between">
        {/* Brand Logo with High Contrast Support for Light & Dark Modes */}
        <Link href="/" className="flex items-center gap-2 group relative">
          {/* Light Mode Logo (Dark Navy Wordmark) */}
          <img
            src="/icon.png"
            alt="BitJunoo Logo"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-105 dark:hidden"
          />
          {/* Dark Mode Logo (Pristine White Wordmark with Mint/Cyan Preserved) */}
          <img
            src="/icon-dark.png"
            alt="BitJunoo Logo"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-105 hidden dark:block"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-7 lg:gap-8">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-sm font-semibold transition-all relative py-1 ${
                    active
                      ? "text-royal-blue dark:text-cyan-blue"
                      : "text-slate-600 hover:text-navy-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-royal-blue via-cyan-blue to-brand-mint shadow-[0_0_8px_rgba(0,100,218,0.4)] dark:shadow-[0_0_8px_rgba(0,168,217,0.8)]"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right CTA & Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Reusable Theme Switcher */}
          <ThemeSwitcher />

          {/* Console button temporarily commented out */}
          {/*
          <Link
            href="/login"
            className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-navy-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 px-3.5 py-2 rounded-xl transition-colors"
          >
            Console
          </Link>
          */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan text-white text-xs sm:text-sm font-semibold shadow-md shadow-royal-blue/25 hover:shadow-royal-blue/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Controls (Theme Switcher + Hamburger) */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeSwitcher />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-xl text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-t border-slate-200 dark:border-slate-800/80 shadow-2xl px-5 py-5 transition-all text-slate-800 dark:text-slate-100">
          <ul className="space-y-2">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                      active
                        ? "bg-royal-blue/10 text-royal-blue dark:bg-royal-blue/15 dark:text-cyan-blue font-bold border border-royal-blue/20 dark:border-cyan-blue/20"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col gap-2.5">
              {/* Console button temporarily commented out */}
              {/*
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-navy-900 dark:hover:text-white transition-colors"
              >
                Sign In to Console
              </Link>
              */}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-royal-blue to-brand-cyan text-white text-sm font-bold shadow-md shadow-royal-blue/30"
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
