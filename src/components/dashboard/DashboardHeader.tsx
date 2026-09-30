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
  PanelLeftClose,
  PanelLeftOpen,
  User,
} from "lucide-react";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const routeMetadata: Record<string, { section: string; title: string; icon: any }> = {
  "/dashboard": { section: "Console", title: "Overview Dashboard", icon: LayoutDashboard },
  "/articles": { section: "Editorial", title: "Articles Catalog", icon: FileText },
  "/add-articles": { section: "Editorial", title: "New Publication", icon: PlusCircle },
  "/analytics": { section: "Intelligence", title: "Audience Analytics", icon: BarChart3 },
  "/categories": { section: "Taxonomy", title: "Categories & Tags", icon: Tags },
  "/settings": { section: "System", title: "Platform Settings", icon: Settings },
  "/profile": { section: "Account", title: "Author Profile", icon: User },
};

export default function DashboardHeader({
  onMenuClick,
  collapsed = false,
  onToggleCollapse,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const currentRoute = routeMetadata[pathname] || {
    section: "Editorial",
    title: "Console",
    icon: Sparkles,
  };

  const Icon = currentRoute.icon;

  return (
    <header className="flex-shrink-0 w-full z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-3.5 sm:px-5 lg:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
      {/* Left: Mobile hamburger & Desktop Collapse Toggle + Breadcrumb Route Info */}
      <div className="flex items-center gap-2.5">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Collapse / Expand Sidebar Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-royal-blue hover:bg-royal-blue/10 border border-slate-200/70 hover:border-royal-blue/30 transition-all cursor-pointer"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4 text-royal-blue" />
          ) : (
            <PanelLeftClose className="w-4 h-4 text-slate-600" />
          )}
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
      <div className="flex items-center gap-2 sm:gap-2.5 flex-1 justify-end max-w-xl">
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

        {/* Profile Quick Pill */}
        <Link
          href="/profile"
          className={`flex items-center gap-1.5 p-1 pl-1.5 pr-2.5 rounded-xl border transition-all cursor-pointer ${
            pathname === "/profile"
              ? "bg-royal-blue/10 border-royal-blue/30 text-royal-blue font-bold"
              : "border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          }`}
          title="Account Profile"
        >
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-royal-blue to-purple text-white text-[10px] font-bold flex items-center justify-center shadow-2xs">
            PA
          </div>
          <span className="text-xs font-semibold hidden sm:inline">
            Profile
          </span>
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
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs whitespace-nowrap"
          >
            <span>View All</span>
          </Link>
        ) : (
          <Link
            href="/add-articles"
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-royal-blue to-purple text-white text-xs font-bold shadow-sm shadow-royal-blue/20 hover:shadow-md hover:shadow-royal-blue/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Article</span>
          </Link>
        )}
      </div>
    </header>
  );
}
