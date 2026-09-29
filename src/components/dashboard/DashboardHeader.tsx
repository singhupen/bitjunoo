"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  Plus,
  ExternalLink,
  ChevronRight,
  Sparkles,
  FileText,
  BarChart3,
  Tags,
  Settings,
  LayoutDashboard,
  PlusCircle,
} from "lucide-react";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const routeMetadata: Record<string, { section: string; title: string; icon: any }> = {
  "/dashboard": { section: "Console", title: "Overview Dashboard", icon: LayoutDashboard },
  "/articles": { section: "Editorial", title: "Articles Catalog", icon: FileText },
  "/add-articles": { section: "Editorial", title: "New Publication", icon: PlusCircle },
  "/analytics": { section: "Intelligence", title: "Audience Analytics", icon: BarChart3 },
  "/categories": { section: "Taxonomy", title: "Categories & Tags", icon: Tags },
  "/settings": { section: "System", title: "Platform Settings", icon: Settings },
};

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const currentRoute = routeMetadata[pathname] || {
    section: "Editorial",
    title: "Console",
    icon: Sparkles,
  };

  const Icon = currentRoute.icon;

  return (
    <header className="flex-shrink-0 w-full z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & Breadcrumb Route Info */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Dynamic Route Indicator */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-xl bg-royal-blue/10 text-royal-blue border border-royal-blue/20">
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-400 hidden md:inline">
              {currentRoute.section}
            </span>
            <ChevronRight className="w-3 h-3 text-slate-300 hidden md:inline" />
            <span className="font-heading font-bold text-slate-900 text-sm sm:text-base">
              {currentRoute.title}
            </span>
          </div>
        </div>
      </div>

      {/* Center/Right: Search and Contextual Actions */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end max-w-xl">
        {/* Search Input */}
        <div className="relative w-full max-w-xs hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search console..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue text-slate-900 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* View Live Blog Link */}
        <Link
          href="/blog"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-royal-blue hover:border-royal-blue/30 bg-white hover:bg-slate-50 transition-colors"
        >
          <span>Live Blog</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Notifications Icon with Indicator */}
        <button
          onClick={() => alert("Notification center: All publishing workers and webhooks operational.")}
          className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-blue" />
        </button>

        {/* Dynamic Action Button */}
        {pathname === "/add-articles" ? (
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap"
          >
            <span>View All</span>
          </Link>
        ) : (
          <Link
            href="/add-articles"
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-royal-blue to-purple text-white text-xs font-bold shadow-md shadow-royal-blue/20 hover:shadow-lg hover:shadow-royal-blue/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Article</span>
          </Link>
        )}
      </div>
    </header>
  );
}
