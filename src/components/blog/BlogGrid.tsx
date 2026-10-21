"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, FileText, Search } from "lucide-react";

export interface BlogGridPost {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  readTime?: number;
  tags?: string[];
  publishedAt?: string | Date;
  author?: {
    name?: string;
    avatar?: string;
    headline?: string;
  };
}

interface BlogGridProps {
  initialArticles?: BlogGridPost[];
  categories?: string[];
}

const DEFAULT_POSTS: BlogGridPost[] = [
  {
    title: "Optimizing Next.js 16 Server Components for Sub-500ms First Contentful Paint",
    slug: "optimizing-nextjs-16-server-components",
    category: "Full-Stack Web",
    readTime: 6,
    author: { name: "Senior Frontend Lead" },
    excerpt: "Why bundle size budgets, streaming SSR, and edge caching strategies are essential for achieving perfect Core Web Vitals across complex enterprise dashboards.",
    tags: ["Next.js 16", "React 19", "Web Performance"],
  },
  {
    title: "Zero-Downtime Database Migrations with EF Core & PostgreSQL at Scale",
    slug: "zero-downtime-database-migrations-ef-core",
    category: "Enterprise .NET",
    readTime: 9,
    author: { name: "Database Architect" },
    excerpt: "How to safely perform table renames, foreign key index generation, and column backfills on tables with 100M+ rows without table locks or latency spikes.",
    tags: [".NET 9", "PostgreSQL", "Database Architecture"],
  },
  {
    title: "Building Deterministic AI Pipelines with RAG, pgvector, and Claude 3.5 Sonnet",
    slug: "building-deterministic-ai-pipelines-rag",
    category: "AI & Cloud",
    readTime: 7,
    author: { name: "AI Systems Engineer" },
    excerpt: "A practical guide to chunking strategies, vector embeddings, contextual re-ranking, and metadata filtering to prevent hallucinations in mission-critical RAG apps.",
    tags: ["RAG", "LLM", "pgvector", "Python"],
  },
  {
    title: "React Native in 2026: Achieving True 60fps Native Performance",
    slug: "react-native-2026-60fps-performance",
    category: "Mobile Engineering",
    readTime: 5,
    author: { name: "Mobile Platform Lead" },
    excerpt: "Leveraging the New Architecture, TurboModules, and Fabric renderer to eliminate bridge bottlenecks and build silky-smooth native gesture interactions.",
    tags: ["React Native", "Expo", "iOS & Android"],
  },
  {
    title: "Kubernetes Multi-Region Failover Architecture on AWS EKS",
    slug: "kubernetes-multi-region-failover-architecture",
    category: "AI & Cloud",
    readTime: 8,
    author: { name: "DevOps & Cloud Lead" },
    excerpt: "Designing active-active multi-region Kubernetes clusters with Route53 latency routing, automated DNS cutover, and distributed database replication.",
    tags: ["Kubernetes", "AWS", "DevOps"],
  },
  {
    title: "Microservices Anti-Patterns: When Monoliths Win and When to Split",
    slug: "microservices-anti-patterns-monolith-vs-microservices",
    category: "Enterprise .NET",
    readTime: 11,
    author: { name: "Principal Architect" },
    excerpt: "A candid assessment of distributed transaction complexity, network hops, and why modular monoliths often outpace microservices for early to mid-stage companies.",
    tags: ["Software Architecture", "Microservices", "System Design"],
  },
];

export default function BlogGrid({
  initialArticles,
  categories: propCategories,
}: BlogGridProps) {
  const posts = initialArticles && initialArticles.length > 0 ? initialArticles : DEFAULT_POSTS;
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All Articles",
    ...(propCategories && propCategories.length > 0
      ? propCategories
      : Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))),
  ];

  const filtered = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All Articles" ||
      post.category?.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-8 sm:py-10 bg-slate-50/70 dark:bg-slate-950 relative overflow-hidden border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-royal-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-3 sm:px-5 lg:px-7 xl:px-8 relative z-10">
        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan text-white shadow-md shadow-royal-blue/20 scale-105"
                      : "bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search engineering papers..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-blue/30 shadow-xs"
            />
          </div>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-8">
            <div className="w-12 h-12 rounded-2xl bg-royal-blue/10 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-royal-blue" />
            </div>
            <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
              No technical dispatches found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              No articles matched your criteria. Try adjusting your search term or select another category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All Articles");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-royal-blue text-white text-xs font-semibold hover:bg-royal-blue/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((post) => {
            const authorName = post.author?.name || "Senior Engineering Lead";
            const readTimeText = post.readTime ? `${post.readTime} min read` : "6 min read";
            const articleUrl = post.slug ? `/blog/${post.slug}` : "/blog";

            return (
              <article
                key={post.slug || post.title}
                className="group bg-white dark:bg-slate-900/60 hover:bg-slate-50/60 dark:hover:bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 hover:border-royal-blue/40 dark:hover:border-cyan-blue/40 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between backdrop-blur-sm"
              >
                <div>
                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <span className="font-bold uppercase tracking-wider text-royal-blue dark:text-cyan-blue px-2 py-0.5 rounded-md bg-royal-blue/10 dark:bg-cyan-blue/10 border border-royal-blue/20 dark:border-cyan-blue/20 text-[10px]">
                      {post.category || "Engineering"}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <Clock className="w-3 h-3 text-royal-blue/70 dark:text-cyan-blue/70" />
                        {readTimeText}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-royal-blue dark:group-hover:text-cyan-blue transition-colors mb-2 leading-snug">
                    <Link href={articleUrl}>{post.title}</Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 mb-3.5">
                      {post.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read Action */}
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="text-[11px]">By {authorName}</span>
                    <Link
                      href={articleUrl}
                      className="inline-flex items-center gap-1 text-royal-blue dark:text-cyan-blue group-hover:text-brand-azure dark:group-hover:text-white font-bold transition-colors text-xs"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
