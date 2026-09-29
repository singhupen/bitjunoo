"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Edit3,
  BarChart3,
  Tags,
  Settings,
  ExternalLink,
  Globe,
  LogOut,
  X,
  Sparkles,
  Bookmark,
  ChevronRight,
} from "lucide-react";

interface DashboardSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, badge: "Live" },
  { label: "All Articles", href: "/dashboard#articles", icon: FileText, count: 48 },
  { label: "Drafts & Review", href: "/dashboard#drafts", icon: Edit3, count: 5 },
  { label: "Audience Analytics", href: "/dashboard#analytics", icon: BarChart3 },
  { label: "Categories & Tags", href: "/dashboard#categories", icon: Tags },
  { label: "Platform Settings", href: "/dashboard#settings", icon: Settings },
];

export default function DashboardSidebar({ mobileOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-300 border-r border-slate-800/80">
      {/* Top Header & Logo */}
      <div className="p-5 flex items-center justify-between border-b border-slate-800/80">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <img
            src="/icon.png"
            alt="BitJunoo Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-white text-base tracking-tight leading-tight">
              BitJunoo
            </span>
            <span className="text-[10px] font-semibold text-cyan-blue uppercase tracking-wider">
              Publication Console
            </span>
          </div>
        </Link>

        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
        {/* Main Section */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Workspace
          </div>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href === "/dashboard" && pathname === "/dashboard");
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      active
                        ? "bg-gradient-to-r from-royal-blue to-deep-blue text-white shadow-md shadow-royal-blue/20 font-bold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-blue/20 text-cyan-blue border border-cyan-blue/30">
                        {item.badge}
                      </span>
                    )}

                    {item.count !== undefined && (
                      <span className="text-[11px] font-mono text-slate-400">
                        {item.count}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* External Portals Section */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Public Channels
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/blog"
                target="_blank"
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-400 hover:text-cyan-blue hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Bookmark className="w-4 h-4 text-purple group-hover:scale-110 transition-transform" />
                  <span>View Public Blog</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </Link>
            </li>
            <li>
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-400 hover:text-cyan-blue hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-royal-blue group-hover:scale-110 transition-transform" />
                  <span>Corporate Website</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Pro / Architecture Pro Tip Widget */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-royal-blue/15 to-purple/15 border border-royal-blue/30 text-white">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-blue mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Editor Active</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-normal">
            Automated SEO auditing, readability checks, and semantic keyword indexing enabled for all drafts.
          </p>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-3.5 border-t border-slate-800/80 bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-royal-blue to-purple text-white font-bold text-xs flex items-center justify-center shadow-md">
              PA
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white leading-tight">Principal Architect</span>
            <span className="text-[10px] text-slate-400">admin@bitjunoo.com</span>
          </div>
        </div>

        <Link
          href="/login"
          title="Sign Out"
          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer with Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer container */}
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
