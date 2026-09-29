"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

export default function BlogDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex relative overflow-hidden">
      {/* Subtle brand ambient glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-royal-blue/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[350px] bg-purple/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Sidebar */}
      <DashboardSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <DashboardHeader
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 overflow-y-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1560px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
