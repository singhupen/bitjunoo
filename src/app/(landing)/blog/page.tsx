import { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import Article from "@/models/Article";
import Category from "@/models/Category";
import "@/models/User";
import { connectDB } from "@/lib/db/mongoose";

export const metadata: Metadata = {
  title: "Engineering Blog & Tech Insights | BitJunoo",
  description:
    "Technical articles, system architecture post-mortems, and performance benchmarks from the senior software engineers and architects at BitJunoo.",
};

export const revalidate = 60; // On-demand and time-based revalidation (60s)

export default async function BlogPage() {
  await connectDB();
  // Query featured article (or latest published article)
  const featuredDoc = await Article.findOne({
    status: "published",
    featured: true,
  })
    .populate("author", "name avatar headline bio")
    .sort({ publishedAt: -1 })
    .lean();

  const fallbackFeaturedDoc = !featuredDoc
    ? await Article.findOne({ status: "published" })
        .populate("author", "name avatar headline bio")
        .sort({ publishedAt: -1 })
        .lean()
    : null;

  const activeFeatured = (featuredDoc || fallbackFeaturedDoc) as any;

  // Query all published articles
  const articlesDocs = await Article.find({ status: "published" })
    .populate("author", "name avatar headline")
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(30)
    .lean();

  // Query categories with published articles
  const categoriesDocs = await Category.find().sort({ name: 1 }).lean();
  const categoryNames = categoriesDocs.map((c) => c.name);

  const mappedArticles = articlesDocs.map((doc: any) => ({
    _id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    category: doc.category,
    excerpt: doc.excerpt,
    readTime: doc.readTime || 5,
    tags: doc.tags || [],
    publishedAt: doc.publishedAt || doc.createdAt,
    coverImage: doc.coverImage ? { url: doc.coverImage.url, alt: doc.coverImage.alt } : undefined,
    author: {
      name: doc.author?.name || "BitJunoo Engineering",
      avatar: doc.author?.avatar,
      headline: doc.author?.headline,
    },
  }));

  const mappedFeatured = activeFeatured
    ? {
        title: activeFeatured.title,
        slug: activeFeatured.slug,
        excerpt: activeFeatured.excerpt,
        category: activeFeatured.category,
        readTime: activeFeatured.readTime || 8,
        publishedAt: activeFeatured.publishedAt || activeFeatured.createdAt,
        coverImage: activeFeatured.coverImage ? { url: activeFeatured.coverImage.url, alt: activeFeatured.coverImage.alt } : undefined,
        author: {
          name: activeFeatured.author?.name || "BitJunoo Core Architecture Pod",
          headline: activeFeatured.author?.headline || "Principal Systems Architects",
          avatar: activeFeatured.author?.avatar,
        },
      }
    : null;

  return (
    <>
      <PageHeader
        badge="ENGINEERING DISPATCH &amp; INSIGHTS"
        title="Field Notes on"
        titleHighlight="High-Scale Software"
        description="In-depth technical guides, microservices case studies, and performance optimizations directly from our engineering frontlines."
      />

      <FeaturedArticle article={mappedFeatured} />
      <BlogGrid
        initialArticles={mappedArticles}
        categories={categoryNames}
      />
      <BlogNewsletter />
    </>
  );
}
