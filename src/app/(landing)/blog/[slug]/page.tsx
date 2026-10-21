import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  Calendar,
  Eye,
  ChevronRight,
  ArrowLeft,
  Share2,
  Sparkles,
  Tag,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { getArticleBySlug } from "@/services/article.service";
import Article from "@/models/Article";
import ArticleContentRenderer from "@/components/blog/ArticleContentRenderer";
import "@/models/User";
import "@/lib/db";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // 60s revalidation

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { article } = await getArticleBySlug(slug);

  if (!article || article.status !== "published") {
    return {
      title: "Article Not Found | BitJunoo Blog",
      description: "The requested technical article could not be found.",
    };
  }

  const title = article.seo?.metaTitle || `${article.title} | BitJunoo Engineering`;
  const description = article.seo?.metaDescription || article.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
      authors: [(article.author as any)?.name || "BitJunoo Engineering"],
      tags: article.tags,
      images: article.coverImage?.url ? [article.coverImage.url] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.coverImage?.url ? [article.coverImage.url] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { article, redirectSlug } = await getArticleBySlug(slug);

  if (redirectSlug) {
    redirect(`/blog/${redirectSlug}`);
  }

  if (!article || article.status !== "published") {
    notFound();
  }

  // Increment views
  await Article.findByIdAndUpdate(article._id, { $inc: { views: 1 } });

  // Query related technical articles
  const relatedArticles = await Article.find({
    status: "published",
    _id: { $ne: article._id },
    $or: [{ category: article.category }, { tags: { $in: article.tags || [] } }],
  })
    .select("title slug category excerpt readTime publishedAt author coverImage")
    .populate("author", "name avatar headline")
    .limit(3)
    .lean();

  const author = (article.author as any) || {};
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Published";

  // Parse table of contents from markdown headings
  const tocHeadings: { id: string; text: string; level: number }[] = [];
  const lines = article.content.split("\n");
  for (const line of lines) {
    if (line.startsWith("## ")) {
      const text = line.replace(/^##\s+/, "").trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      tocHeadings.push({ id, text, level: 2 });
    } else if (line.startsWith("### ")) {
      const text = line.replace(/^###\s+/, "").trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      tocHeadings.push({ id, text, level: 3 });
    }
  }

  return (
    <article className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[300px] bg-royal-blue/[0.05] rounded-full blur-[140px] pointer-events-none" />

      {/* Header & Meta Container */}
      <header className="pt-24 sm:pt-28 pb-8 sm:pb-12 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-royal-blue dark:hover:text-cyan-blue transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-royal-blue dark:hover:text-cyan-blue transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-royal-blue dark:text-cyan-blue uppercase tracking-wider text-[11px] font-bold">
              {article.category}
            </span>
          </nav>

          {/* Badges & Meta Pill */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-blue/10 dark:bg-cyan-blue/10 border border-royal-blue/20 dark:border-cyan-blue/20 text-royal-blue dark:text-cyan-blue text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{article.category}</span>
            </span>

            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Clock className="w-3.5 h-3.5 text-royal-blue/70 dark:text-cyan-blue/70" />
              <span>{article.readTime || 5} min read</span>
            </span>

            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-royal-blue/70 dark:text-cyan-blue/70" />
              <span>{formattedDate}</span>
            </span>

            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium font-mono">
              <Eye className="w-3.5 h-3.5 text-royal-blue/70 dark:text-cyan-blue/70" />
              <span>{(article.views || 0).toLocaleString()} views</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight mb-5">
            {article.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mb-8">
            {article.excerpt}
          </p>

          {/* Author Byline Box */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-royal-blue to-brand-azure flex items-center justify-center font-bold text-white text-sm border border-white/20 shadow-md">
                {author.name ? author.name.slice(0, 2).toUpperCase() : "BJ"}
              </div>
              <div>
                <div className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                  {author.name || "BitJunoo Core Architect"}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {author.headline || "Systems & Infrastructure Engineering"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Articles</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout with Sticky Table of Contents */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main Article Content */}
          <div className="lg:col-span-8 min-w-0">
            {/* Optional Featured Cover Image */}
            {article.coverImage?.url && (
              <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.coverImage.url}
                  alt={article.coverImage.alt || article.title}
                  className="w-full h-auto max-h-[460px] object-cover"
                />
              </div>
            )}

            {/* Rendered Content */}
            <ArticleContentRenderer content={article.content} />

            {/* Tags Footer */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-royal-blue dark:text-cyan-blue" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Topic Keywords
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Biography Box */}
            {author.bio && (
              <div className="mt-10 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-royal-blue to-brand-cyan flex items-center justify-center font-bold text-white text-base shrink-0">
                  {author.name ? author.name.slice(0, 2).toUpperCase() : "BJ"}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                    Written by {author.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {author.bio}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Table of Contents & Share */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* Table of Contents */}
              {tocHeadings.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 shadow-2xs backdrop-blur-sm">
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-royal-blue dark:text-cyan-blue" />
                    <span>Table of Contents</span>
                  </h3>
                  <nav className="space-y-1.5 text-xs">
                    {tocHeadings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`block text-slate-600 dark:text-slate-400 hover:text-royal-blue dark:hover:text-cyan-blue transition-colors line-clamp-1 py-0.5 ${
                          h.level === 3 ? "pl-3 text-[11px] opacity-80" : "font-medium"
                        }`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Consultation / Callout Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-royal-blue/10 via-brand-azure/5 to-transparent border border-royal-blue/20 dark:border-royal-blue/30 text-slate-900 dark:text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-royal-blue dark:text-cyan-blue">
                  Architecture Consulting
                </span>
                <h4 className="font-heading font-bold text-sm mt-1 mb-2">
                  Scaling Similar Infrastructure?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  BitJunoo’s principal engineers specialize in zero-downtime database migrations, microservices, and high-concurrency systems.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full py-2 px-3 rounded-xl bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan text-white text-xs font-bold shadow-md shadow-royal-blue/20 hover:opacity-95 transition-all"
                >
                  <span>Talk with an Architect</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles Row */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 sm:mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white">
                  Related Technical Dispatches
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  More engineering deep dives in {article.category}
                </p>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-xs font-bold text-royal-blue dark:text-cyan-blue hover:underline"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {relatedArticles.map((rel: any) => (
                <div
                  key={rel.slug}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-royal-blue/40 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-royal-blue dark:text-cyan-blue px-2 py-0.5 rounded bg-royal-blue/10 dark:bg-cyan-blue/10">
                      {rel.category}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white mt-2 mb-2 line-clamp-2 hover:text-royal-blue dark:hover:text-cyan-blue transition-colors">
                      <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold pt-3 border-t border-slate-100 dark:border-slate-800 text-slate-400">
                    <span>{rel.readTime || 5} min read</span>
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="text-royal-blue dark:text-cyan-blue font-bold flex items-center gap-1"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
