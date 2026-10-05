import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | BitJunoo Enterprise Portal",
  description: "Secure login portal for BitJunoo enterprise clients, partners, and engineering teams.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {children}
    </div>
  );
}
