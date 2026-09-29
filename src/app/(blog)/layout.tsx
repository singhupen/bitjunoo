import { Metadata } from "next";
import BlogDashboardShell from "@/components/dashboard/BlogDashboardShell";

export const metadata: Metadata = {
  title: "Publication Dashboard | BitJunoo Editorial Console",
  description: "Manage software engineering articles, drafts, performance benchmarks, and readership metrics.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlogDashboardShell>{children}</BlogDashboardShell>;
}
