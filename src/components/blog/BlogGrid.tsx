"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, FileText, Search, X, Sparkles, Calendar } from "lucide-react";

export interface BlogGridPost {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  readTime?: number;
  tags?: string[];
  publishedAt?: string | Date;
  coverImage?: {
    url: string;
    alt?: string;
  };
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
    <section className="py-10 sm:py-14 bg-slate-50/70 dark:bg-slate-950 relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-royal-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shadow-2xs ${
                    isActive
                      ? "bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan text-white shadow-md shadow-royal-blue/25 scale-[1.02]"
                      : "bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-royal-blue/30 dark:hover:border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technical articles..."
              className="w-full pl-10 pr-9 py-2 text-xs rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-blue/30 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800/80 p-8 shadow-xs">
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
              className="mt-4 px-4 py-2 rounded-xl bg-royal-blue text-white text-xs font-semibold hover:bg-royal-blue/90 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => {
            const authorName = post.author?.name || "BitJunoo Engineering";
            const readTimeText = post.readTime ? `${post.readTime} min read` : "5 min read";
            const articleUrl = post.slug ? `/blog/${post.slug}` : "/blog";
            const coverUrl = post.coverImage?.url;
            const dateStr = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : undefined;

            return (
              <article
                key={post.slug || post.title}
                className="group bg-white dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-royal-blue/40 dark:hover:border-cyan-blue/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Article Card Thumbnail */}
                  {coverUrl ? (
                    <Link href={articleUrl} className="block relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  ) : (
                    <div className="h-3 bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan opacity-80 group-hover:opacity-100 transition-opacity" />
                  )}

                  <div className="p-6">
                    {/* Category & Read Time Bar */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <span className="font-bold uppercase tracking-wider text-royal-blue dark:text-cyan-blue px-2.5 py-0.5 rounded-full bg-royal-blue/10 dark:bg-cyan-blue/10 border border-royal-blue/20 dark:border-cyan-blue/20 text-[10px]">
                        {post.category || "Engineering"}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-royal-blue dark:text-cyan-blue" />
                          {readTimeText}
                        </span>
                        {dateStr && (
                          <span className="hidden sm:flex items-center gap-1">
                            • {dateStr}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Headline */}
                    <h3 className="font-heading text-lg font-bold text-slate-950 dark:text-white group-hover:text-royal-blue dark:group-hover:text-cyan-blue transition-colors mb-2.5 leading-snug line-clamp-2">
                      <Link href={articleUrl}>{post.title}</Link>
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  {/* Topic Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 mb-4">
                      {post.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Author & Read Link */}
                  <div className="flex items-center justify-between text-xs font-semibold pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-royal-blue to-brand-azure text-white text-[10px] font-bold flex items-center justify-center">
                        {authorName.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 text-xs truncate max-w-[120px]">
                        {authorName}
                      </span>
                    </div>

                    <Link
                      href={articleUrl}
                      className="inline-flex items-center gap-1 text-royal-blue dark:text-cyan-blue font-bold text-xs group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
