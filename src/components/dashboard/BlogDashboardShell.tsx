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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <DashboardSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader
          onMenuClick={() => setMobileOpen(true)}
          onNewArticleClick={() => {
            const el = document.getElementById("new-draft-section");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />

        <main className="flex-1 overflow-y-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1560px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
