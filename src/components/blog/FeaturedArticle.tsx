import Link from "next/link";
import { Clock, Calendar, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface FeaturedArticleProps {
  article?: {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    readTime?: number;
    publishedAt?: string | Date;
    coverImage?: {
      url: string;
      alt?: string;
    };
    author?: {
      name?: string;
      headline?: string;
      avatar?: string;
    };
  } | null;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const title =
    article?.title ||
    "Architecting High-Throughput .NET 9 Microservices with Next.js 16 Frontends: Lessons from 10M Daily Events";
  const slug = article?.slug || "";
  const excerpt =
    article?.excerpt ||
    "A comprehensive deep-dive into how we designed an event-driven system using C# and .NET 9, Kafka message streaming, and Next.js 16 Server Components to achieve deterministic sub-40ms query latencies under sustained peak load.";
  const category = article?.category || "Featured Architecture";
  const readTime = article?.readTime ? `${article.readTime} min read` : "8 min read";
  const dateStr = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Published";
  const authorName = article?.author?.name || "BitJunoo Core Architecture Pod";
  const authorHeadline = article?.author?.headline || "Principal Systems Architects";
  const readUrl = slug ? `/blog/${slug}` : "/blog";
  const coverUrl = article?.coverImage?.url;

  return (
    <section className="py-8 sm:py-10 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden transition-colors duration-300">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-48 bg-royal-blue/10 dark:bg-royal-blue/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-40 bg-brand-cyan/10 dark:bg-cyan-blue/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#0D1527] to-[#0A1020] border border-royal-blue/30 dark:border-slate-800 hover:border-cyan-blue/50 text-white p-6 sm:p-9 lg:p-12 shadow-2xl backdrop-blur-xl transition-all duration-300 group">
          {/* Subtle ambient lighting inside card */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-royal-blue/20 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-blue/20 transition-colors duration-500" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Headline & Metadata */}
            <div className={coverUrl ? "lg:col-span-7" : "lg:col-span-12"}>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-blue/20 border border-cyan-blue/40 text-cyan-300 text-xs font-bold tracking-wider uppercase shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{category}</span>
                </span>
                <span className="text-xs text-slate-300 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{readTime}</span>
                </span>
                <span className="text-xs text-slate-300 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{dateStr}</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3.5 leading-snug group-hover:text-cyan-300 transition-colors">
                <Link href={readUrl}>{title}</Link>
              </h2>

              {/* Summary */}
              <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed mb-6 line-clamp-3">
                {excerpt}
              </p>

              {/* Author and Call to Action */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-slate-800/90">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-royal-blue to-brand-azure flex items-center justify-center font-bold text-white text-xs border border-white/20 shadow-md">
                    {authorName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{authorName}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {authorHeadline}
                    </div>
                  </div>
                </div>

                <Link
                  href={readUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-lg shadow-royal-blue/25 hover:shadow-cyan-blue/30 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <span>Read Technical Deep Dive</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Cover Image Preview if present */}
            {coverUrl && (
              <div className="lg:col-span-5">
                <Link href={readUrl} className="block relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl group/img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverUrl}
                    alt={title}
                    className="w-full h-auto aspect-video sm:aspect-[16/10] object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
