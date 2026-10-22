"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { Clock, ShieldAlert } from "lucide-react";
import { getClientSession } from "@/lib/auth/clientSession";

export default function BlogDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    async function checkAccount() {
      try {
        const user = await getClientSession();
        if (user?.accountStatus === "pending") {
          setIsPending(true);
        }
      } catch {
        // ignore
      }
    }
    checkAccount();
  }, []);

  return (
    <div className="h-screen h-[100dvh] w-screen max-w-full bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex relative overflow-hidden transition-colors duration-300">
      {/* Subtle brand ambient glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-royal-blue/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[350px] bg-cyan-blue/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Fixed Sidebar */}
      <DashboardSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      {/* Main Column: Header fixed at top, View Area scrolls underneath */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative z-10">
        <DashboardHeader
          onMenuClick={() => setMobileOpen(true)}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />

        <main className="flex-1 min-h-0 overflow-y-auto px-2.5 sm:px-4 lg:px-6 py-2 sm:py-3 w-full">
          <div className="max-w-[1780px] mx-auto w-full">
            {isPending && (
              <div className="mb-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 shadow-xs flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
                    <Clock className="w-4 h-4 animate-spin text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-amber-900 dark:text-amber-200">
                      Author Account Pending Approval
                    </h4>
                    <p className="text-amber-700 dark:text-amber-300/80 mt-0.5">
                      Your profile has been registered. An administrator must verify and grant article compose permissions before you can publish.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
