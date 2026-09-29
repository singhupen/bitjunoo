import React from "react";
import { Sparkles } from "lucide-react";

interface PageHeaderProps {
  badge: string;
  title: string;
  titleHighlight?: string;
  description: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHeader({
  badge,
  title,
  titleHighlight,
  description,
}: PageHeaderProps) {
  return (
    <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-12 overflow-hidden bg-slate-950 text-white">
      {/* Background Grid and Brand Ambient Glows */}
      <div className="absolute inset-0 hero-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-royal-blue/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-6 right-10 w-60 h-60 bg-cyan-blue/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-blue/10 border border-cyan-blue/30 text-cyan-blue text-xs font-semibold tracking-wide mb-3.5 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{badge}</span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 max-w-3xl mx-auto leading-tight">
          {title}{" "}
          {titleHighlight && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-blue via-royal-blue to-purple">
              {titleHighlight}
            </span>
          )}
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
