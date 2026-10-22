"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function BackToWebsiteLink() {
  const [targetUrl, setTargetUrl] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.host;
      const proto = window.location.protocol;
      if (host.startsWith("admin.")) {
        setTargetUrl(`${proto}//${host.slice(6)}/`);
      } else {
        setTargetUrl("/");
      }
    }
  }, []);

  return (
    <a
      href={targetUrl}
      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-royal-blue dark:hover:text-cyan-blue transition-colors px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-royal-blue/30 bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>Back to Website</span>
    </a>
  );
}
