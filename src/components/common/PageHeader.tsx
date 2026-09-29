import React from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

interface PageHeaderProps {
  badge: string;
  title: string;
  titleHighlight?: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function PageHeader({
  badge,
  title,
  titleHighlight,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 overflow-hidden bg-slate-950 text-white">
      {/* Background Grid and Brand Ambient Glows */}
      <div className="absolute inset-0 hero-grid-bg opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-royal-blue/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-blue/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumbs */}
        <nav className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 mb-6 backdrop-blur-md">
          {breadcrumbs.map((b, idx) => (
            <React.Fragment key={b.label}>
              {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-500" />}
              {b.href ? (
                <Link href={b.href} className="hover:text-cyan-blue transition-colors">
                  {b.label}
                </Link>
              ) : (
                <span className="text-cyan-blue font-semibold">{b.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Badge */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-blue/10 border border-cyan-blue/30 text-cyan-blue text-xs sm:text-sm font-semibold tracking-wide mb-5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
          {title}{" "}
          {titleHighlight && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-blue via-royal-blue to-purple">
              {titleHighlight}
            </span>
          )}
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
