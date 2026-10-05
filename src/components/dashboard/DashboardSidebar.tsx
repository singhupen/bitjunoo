"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  BarChart3,
  Tags,
  Settings,
  User,
  ExternalLink,
  Globe,
  LogOut,
  X,
  Sparkles,
  Bookmark,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface DashboardSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Articles", href: "/articles", icon: FileText, count: 48 },
  { label: "Add Article", href: "/add-articles", icon: PlusCircle, badge: "Create" },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Categories", href: "/categories", icon: Tags, count: 6 },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardSidebar({
  mobileOpen,
  onClose,
  collapsed = false,
  onToggleCollapse,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const renderContent = (isCollapsedMode: boolean) => (
    <div className="flex flex-col h-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-700 dark:text-slate-200 border-r border-slate-200/90 dark:border-slate-800 select-none transition-colors duration-300">
      {/* Top Header & Logo */}
      <div
        className={`flex items-center border-b border-slate-200/80 dark:border-slate-800 transition-all ${
          isCollapsedMode ? "p-3 justify-center" : "px-4 py-3 justify-between"
        }`}
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 group focus:outline-none"
          title="BitJunoo Editorial Console"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon.png"
            alt="BitJunoo Logo"
            className="h-7 w-auto object-contain transition-transform group-hover:scale-105 dark:hidden"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon-dark.png"
            alt="BitJunoo Logo"
            className="h-7 w-auto object-contain transition-transform group-hover:scale-105 hidden dark:block"
          />
          {!isCollapsedMode && (
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-extrabold text-slate-950 dark:text-white text-sm tracking-tight leading-tight">
                BitJunoo
              </span>
              <span className="text-[10px] font-bold text-royal-blue dark:text-cyan-blue uppercase tracking-wider">
                Editorial Studio
              </span>
            </div>
          )}
        </Link>

        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close navigation drawer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
        {/* Main Section */}
        <div>
          {!isCollapsedMode && (
            <div className="px-2 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Workspace
            </div>
          )}
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    title={isCollapsedMode ? item.label : undefined}
                    className={`flex items-center rounded-xl text-xs sm:text-sm font-semibold transition-all relative group ${
                      isCollapsedMode
                        ? "justify-center p-2.5"
                        : "justify-between px-3 py-2"
                    } ${
                      active
                        ? "bg-gradient-to-r from-royal-blue to-brand-azure text-white shadow-xs font-bold"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          active
                            ? "text-white"
                            : "text-slate-400 group-hover:text-royal-blue dark:group-hover:text-cyan-blue group-hover:scale-105"
                        }`}
                      />
                      {!isCollapsedMode && <span>{item.label}</span>}
                    </div>

                    {!isCollapsedMode && item.badge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-royal-blue/10 dark:bg-royal-blue/20 text-royal-blue dark:text-cyan-blue border border-royal-blue/20"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {!isCollapsedMode && item.count !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}

                    {/* Tooltip in collapsed mode */}
                    {isCollapsedMode && (
                      <span className="absolute left-full ml-2.5 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-lg whitespace-nowrap z-50">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Public Portals Section */}
        <div>
          {!isCollapsedMode && (
            <div className="px-2 mb-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Public Channels
            </div>
          )}
          <ul className="space-y-1">
            <li>
              <Link
                href="/blog"
                target="_blank"
                title={isCollapsedMode ? "Live Blog" : undefined}
                className={`flex items-center rounded-xl text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:text-royal-blue dark:hover:text-cyan-blue hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors group relative ${
                  isCollapsedMode
                    ? "justify-center p-2.5"
                    : "justify-between px-3 py-1.5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bookmark className="w-4 h-4 text-brand-azure group-hover:scale-105 transition-transform" />
                  {!isCollapsedMode && <span>Live Blog</span>}
                </div>
                {!isCollapsedMode && (
                  <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-90" />
                )}
                {isCollapsedMode && (
                  <span className="absolute left-full ml-2.5 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap z-50">
                    Live Blog
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/"
                target="_blank"
                title={isCollapsedMode ? "Main Website" : undefined}
                className={`flex items-center rounded-xl text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:text-royal-blue dark:hover:text-cyan-blue hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors group relative ${
                  isCollapsedMode
                    ? "justify-center p-2.5"
                    : "justify-between px-3 py-1.5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-royal-blue dark:text-cyan-blue group-hover:scale-105 transition-transform" />
                  {!isCollapsedMode && <span>Main Website</span>}
                </div>
                {!isCollapsedMode && (
                  <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-90" />
                )}
                {isCollapsedMode && (
                  <span className="absolute left-full ml-2.5 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap z-50">
                    Main Website
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>

        {/* AI & Readability Badge (Expanded only) */}
        {!isCollapsedMode && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-royal-blue/5 via-brand-azure/5 to-brand-cyan/5 border border-royal-blue/15 dark:border-royal-blue/30 text-slate-800 dark:text-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-royal-blue dark:text-cyan-blue mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-royal-blue dark:text-cyan-blue animate-pulse" />
              <span>AI Writing Assistant</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Markdown validation, SEO checks, and live code highlighting active.
            </p>
          </div>
        )}
      </div>

      {/* User Profile Footer */}
      <div
        className={`border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 transition-all ${
          isCollapsedMode
            ? "p-2.5 flex items-center justify-center"
            : "p-2.5 px-3 flex items-center justify-between"
        }`}
      >
        <Link
          href="/profile"
          onClick={onClose}
          className="flex items-center gap-2 group min-w-0"
          title="Account Profile"
        >
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-royal-blue to-brand-azure text-white font-bold text-xs flex items-center justify-center shadow-2xs group-hover:ring-2 group-hover:ring-royal-blue/40 transition-all">
              PA
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
          </div>
          {!isCollapsedMode && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate leading-tight group-hover:text-royal-blue dark:group-hover:text-cyan-blue transition-colors">
                Principal Architect
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                admin@bitjunoo.com
              </span>
            </div>
          )}
        </Link>

        {!isCollapsedMode && (
          <Link
            href="/login"
            title="Sign Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Fixed / Collapsible Sidebar */}
      <aside
        className={`hidden lg:block flex-shrink-0 h-full overflow-hidden z-30 transition-all duration-300 ease-in-out ${
          collapsed ? "w-[68px]" : "w-60 xl:w-64"
        }`}
      >
        {renderContent(collapsed)}
      </aside>

      {/* Mobile Drawer with Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer container (always expanded on mobile) */}
          <div className="relative w-64 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-250 shadow-2xl">
            {renderContent(false)}
          </div>
        </div>
      )}
    </>
  );
}
