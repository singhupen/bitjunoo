"use client";

import { useState, useRef, useEffect } from "react";
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
  X,
  Command,
} from "lucide-react";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const routeMetadata: Record<string, { section: string; title: string; icon: any }> = {
  "/dashboard": { section: "Console", title: "Overview", icon: LayoutDashboard },
  "/articles": { section: "Editorial", title: "Articles", icon: FileText },
  "/add-articles": { section: "Editorial", title: "New Publication", icon: PlusCircle },
  "/analytics": { section: "Intelligence", title: "Analytics", icon: BarChart3 },
  "/categories": { section: "Taxonomy", title: "Categories & Tags", icon: Tags },
  "/settings": { section: "System", title: "Settings", icon: Settings },
  "/profile": { section: "Account", title: "Profile", icon: User },
};

export default function DashboardHeader({
  onMenuClick,
  collapsed = false,
  onToggleCollapse,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentRoute = routeMetadata[pathname] || {
    section: "Editorial",
    title: "Console",
    icon: Sparkles,
  };

  const Icon = currentRoute.icon;

  return (
    <header className="flex-shrink-0 w-full z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-4 lg:px-6 h-12 sm:h-13 flex items-center justify-between gap-2.5 transition-colors duration-300">
      {/* ── LEFT: Navigation & Dynamic Route ──────────────────────────── */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Desktop Collapse / Expand Sidebar Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center justify-center p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-royal-blue dark:hover:text-cyan-blue hover:bg-royal-blue/10 border border-slate-200/70 dark:border-slate-800 hover:border-royal-blue/30 transition-all cursor-pointer"
          title={collapsed ? "Expand sidebar (Ctrl+\\)" : "Collapse sidebar (Ctrl+\\)"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="w-3.5 h-3.5 text-royal-blue dark:text-cyan-blue" />
          ) : (
            <PanelLeftClose className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
          )}
        </button>

        {/* Route Icon & Breadcrumb */}
        <div className="flex items-center gap-1.5 pl-0.5">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-royal-blue/10 text-royal-blue dark:text-cyan-blue border border-royal-blue/20 shrink-0">
            <Icon className="w-3 h-3" />
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="font-medium text-slate-400 dark:text-slate-500 hidden md:inline">
              {currentRoute.section}
            </span>
            <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600 hidden md:inline" />
            <span className="font-heading font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate max-w-[130px] sm:max-w-none">
              {currentRoute.title}
            </span>
          </div>
        </div>
      </div>

      {/* ── CENTER: Centered Global Search Bar ─────────────────────────── */}
      <div className="flex-1 max-w-sm lg:max-w-md mx-auto px-2 hidden sm:flex items-center justify-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search console..."
            className="w-full pl-8 pr-14 py-1 text-xs rounded-lg border border-slate-200/80 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/80 hover:bg-slate-100/90 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue text-slate-900 dark:text-white transition-all placeholder:text-slate-400 h-8"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold text-slate-400 bg-white dark:bg-slate-700 border border-slate-200/80 dark:border-slate-600 shadow-2xs">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Quick Actions & Profile ─────────────────────────────── */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Mobile Search Toggle */}
        <button
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          className="sm:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle search"
        >
          {mobileSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
        </button>

        {/* Live Blog Public Link */}
        <Link
          href="/blog"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-royal-blue dark:hover:text-cyan-blue hover:border-royal-blue/30 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors h-7.5"
          title="Open live public publication hub"
        >
          <span>Live Blog</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Link>

        {/* Reusable ThemeSwitcher Component */}
        <ThemeSwitcher />

        {/* Notifications Icon with Indicator */}
        <button
          onClick={() => alert("Notification center: All publishing workers and webhooks operational.")}
          className="relative p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="View notifications"
          title="Notifications"
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-blue" />
        </button>

        {/* Profile Pill */}
        <Link
          href="/profile"
          className={`flex items-center gap-1.5 p-1 pl-1.5 pr-2 rounded-lg border transition-all cursor-pointer h-7.5 ${
            pathname === "/profile"
              ? "bg-royal-blue/10 border-royal-blue/30 text-royal-blue dark:text-cyan-blue font-bold"
              : "border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
          title="Account Profile"
        >
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-royal-blue to-brand-azure text-white text-[9px] font-bold flex items-center justify-center shadow-2xs">
            PA
          </div>
          <span className="text-xs font-semibold hidden xl:inline">
            Profile
          </span>
        </Link>

        {/* Dynamic New Article / View All Button */}
        {pathname === "/add-articles" ? (
          <Link
            href="/articles"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors shadow-2xs whitespace-nowrap h-7.5"
          >
            <span>View All</span>
          </Link>
        ) : (
          <Link
            href="/add-articles"
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-lg bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan text-white text-xs font-bold shadow-xs shadow-royal-blue/20 hover:shadow-sm hover:shadow-royal-blue/35 transition-all cursor-pointer whitespace-nowrap h-7.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Article</span>
          </Link>
        )}
      </div>

      {/* Mobile Search Overlay Bar */}
      {mobileSearchOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 p-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-md flex items-center gap-2 animate-in slide-in-from-top-1 duration-200 z-50">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search console..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-royal-blue"
            />
          </div>
          <button
            onClick={() => setMobileSearchOpen(false)}
            className="p-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Cancel
          </button>
        </div>
      )}
    </header>
  );
}
