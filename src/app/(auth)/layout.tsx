import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";

export const metadata = {
  title: "Authentication | BitJunoo Enterprise Portal",
  description: "Secure login portal for BitJunoo enterprise clients, partners, and engineering teams.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 hero-grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-royal-blue/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-10 w-72 h-72 bg-cyan-blue/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/icon.png"
            alt="BitJunoo Logo"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-cyan-blue transition-colors px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Website</span>
        </Link>
      </header>

      {/* Centered Auth Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Bottom Security Footer */}
      <footer className="relative z-10 w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>256-Bit SSL Encrypted &bull; ISO/IEC 27001 Security Protocols</span>
        </div>
        <div>
          &copy; {new Date().getFullYear()} BitJunoo Engineering. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
