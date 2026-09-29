"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, Tag } from "lucide-react";

const categories = [
  "All Articles",
  "Full-Stack Web",
  "Enterprise .NET",
  "Mobile Engineering",
  "AI & Cloud",
];

const posts = [
  {
    title: "Optimizing Next.js 16 Server Components for Sub-500ms First Contentful Paint",
    category: "Full-Stack Web",
    date: "Sep 22, 2026",
    readTime: "6 min read",
    author: "Senior Frontend Lead",
    excerpt: "Why bundle size budgets, streaming SSR, and edge caching strategies are essential for achieving perfect Core Web Vitals across complex enterprise dashboards.",
    tags: ["Next.js 16", "React 19", "Web Performance"],
  },
  {
    title: "Zero-Downtime Database Migrations with EF Core & PostgreSQL at Scale",
    category: "Enterprise .NET",
    date: "Sep 15, 2026",
    readTime: "9 min read",
    author: "Database Architect",
    excerpt: "How to safely perform table renames, foreign key index generation, and column backfills on tables with 100M+ rows without table locks or latency spikes.",
    tags: [".NET 9", "PostgreSQL", "Database Architecture"],
  },
  {
    title: "Building Deterministic AI Pipelines with RAG, pgvector, and Claude 3.5 Sonnet",
    category: "AI & Cloud",
    date: "Sep 08, 2026",
    readTime: "7 min read",
    author: "AI Systems Engineer",
    excerpt: "A practical guide to chunking strategies, vector embeddings, contextual re-ranking, and metadata filtering to prevent hallucinations in mission-critical RAG apps.",
    tags: ["RAG", "LLM", "pgvector", "Python"],
  },
  {
    title: "React Native in 2026: Achieving True 60fps Native Performance",
    category: "Mobile Engineering",
    date: "Aug 29, 2026",
    readTime: "5 min read",
    author: "Mobile Platform Lead",
    excerpt: "Leveraging the New Architecture, TurboModules, and Fabric renderer to eliminate bridge bottlenecks and build silky-smooth native gesture interactions.",
    tags: ["React Native", "Expo", "iOS & Android"],
  },
  {
    title: "Kubernetes Multi-Region Failover Architecture on AWS EKS",
    category: "AI & Cloud",
    date: "Aug 18, 2026",
    readTime: "8 min read",
    author: "DevOps & Cloud Lead",
    excerpt: "Designing active-active multi-region Kubernetes clusters with Route53 latency routing, automated DNS cutover, and distributed database replication.",
    tags: ["Kubernetes", "AWS", "DevOps"],
  },
  {
    title: "Microservices Anti-Patterns: When Monoliths Win and When to Split",
    category: "Enterprise .NET",
    date: "Aug 05, 2026",
    readTime: "11 min read",
    author: "Principal Architect",
    excerpt: "A candid assessment of distributed transaction complexity, network hops, and why modular monoliths often outpace microservices for early to mid-stage companies.",
    tags: ["Software Architecture", "Microservices", "System Design"],
  },
];

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All Articles");

  const filtered = activeCategory === "All Articles"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <section className="py-8 sm:py-10 bg-white relative">
      <div className="max-w-[1560px] mx-auto px-3 sm:px-5 lg:px-7 xl:px-8">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-slate-950 text-white shadow-md shadow-slate-950/20 scale-105"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((post) => (
            <article
              key={post.title}
              className="group bg-slate-50 hover:bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-royal-blue/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-bold uppercase tracking-wider text-royal-blue px-2 py-0.5 rounded-md bg-royal-blue/10 border border-royal-blue/20 text-[10px]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 group-hover:text-royal-blue transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-200/60 mb-3.5">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Read Action */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="text-[11px]">By {post.author}</span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-royal-blue group-hover:text-purple font-bold transition-colors text-xs"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
