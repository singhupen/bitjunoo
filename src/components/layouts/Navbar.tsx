"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

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

  // When on the homepage at the top, header is transparent over the dark hero.
  // On interior pages or after scroll, use a crisp white frosted glass header.
  const isDarkTop = pathname === "/" && !scrolled;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkTop
          ? "bg-transparent py-5"
          : "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/70 py-3.5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/icon.png"
            alt="BitJunoo Logo"
            className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
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
                    isDarkTop
                      ? active
                        ? "text-cyan-blue"
                        : "text-slate-200 hover:text-white"
                      : active
                      ? "text-royal-blue font-bold"
                      : "text-slate-600 hover:text-royal-blue"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                        isDarkTop
                          ? "bg-gradient-to-r from-cyan-blue to-royal-blue"
                          : "bg-gradient-to-r from-royal-blue to-purple"
                      }`}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-royal-blue via-deep-blue to-indigo text-white text-sm font-semibold shadow-md shadow-royal-blue/25 hover:shadow-lg hover:shadow-royal-blue/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isDarkTop
              ? "text-white hover:bg-white/10"
              : "text-slate-800 hover:bg-slate-100"
          }`}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-xl px-5 py-4 transition-all">
          <ul className="space-y-2">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      active
                        ? "bg-royal-blue/10 text-royal-blue font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-royal-blue"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-3 border-t border-slate-100">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-royal-blue to-purple text-white text-sm font-bold shadow-md shadow-royal-blue/20"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
