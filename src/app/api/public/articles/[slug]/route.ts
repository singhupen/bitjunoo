/**
 * app/api/public/articles/[slug]/route.ts
 * GET /api/public/articles/[slug] — public single published article endpoint
 * Safely handles slug history redirects and increments view counter.
 */

import { NextRequest, NextResponse } from "next/server";
import { getArticleBySlug, incrementArticleViews } from "@/services/article.service";
import "@/lib/db";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  try {
    const { slug } = await ctx.params;
    const { article, redirectSlug } = await getArticleBySlug(slug);

    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article not found." },
        { status: 404 }
      );
    }

    // Only allow published articles to be publicly read
    if (article.status !== "published") {
      return NextResponse.json(
        { success: false, message: "Article is not published." },
        { status: 404 }
      );
    }

    if (redirectSlug) {
      return NextResponse.json(
        {
          success: true,
          redirect: true,
          newSlug: redirectSlug,
        },
        { status: 301 }
      );
    }

    // Increment views asynchronously
    incrementArticleViews(String(article._id)).catch(() => {});

    // Strip sensitive fields
    const safeData = {
      _id: article._id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      coverImage: article.coverImage,
      category: article.category,
      tags: article.tags,
      level: article.level,
      readTime: article.readTime,
      views: article.views,
      publishedAt: article.publishedAt,
      author: {
        _id: (article.author as any)._id,
        name: (article.author as any).name,
        avatar: (article.author as any).avatar,
        headline: (article.author as any).headline,
        bio: (article.author as any).bio,
        location: (article.author as any).location,
        socialLinks: (article.author as any).socialLinks,
      },
      seo: article.seo,
    };

    return NextResponse.json(
      { success: true, data: safeData },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch article.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
