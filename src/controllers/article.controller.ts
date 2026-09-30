/**
 * controllers/article.controller.ts
 * HTTP handlers for article CRUD endpoints.
 * All write operations are scoped to the authenticated user.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  createArticle,
  getArticles,
  getArticleById,
  getArticleBySlug,
  updateArticle,
  deleteArticle,
  incrementArticleViews,
  getUserArticleStats,
} from "@/services/article.service";

// ── GET /api/articles ────────────────────────────────────────────────────────
// Public listing (published only by default); authenticated users can filter by
// their own articles or by status.
export async function handleGetArticles(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // If ?mine=true is passed AND the user is authenticated, return their articles
    const mine = searchParams.get("mine") === "true";
    const userId = req.headers.get("x-user-id");

    const result = await getArticles({
      page: Number(searchParams.get("page") ?? 1),
      limit: Number(searchParams.get("limit") ?? 10),
      status: searchParams.get("status") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      authorId: mine && userId ? userId : undefined,
    });

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch articles.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── POST /api/articles ───────────────────────────────────────────────────────
// Creates an article — defaults to draft if status not provided.
export async function handleCreateArticle(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, category, tags, status, coverImage, readTime, scheduledAt } = body;

    // authorId always comes from the authenticated user injected by withAuth
    const authorId = req.headers.get("x-user-id");

    if (!title || !excerpt || !content || !category || !authorId) {
      return NextResponse.json(
        { success: false, message: "title, excerpt, content, and category are required." },
        { status: 400 }
      );
    }

    // Validate scheduled articles have a date
    if (status === "scheduled" && !scheduledAt) {
      return NextResponse.json(
        { success: false, message: "scheduledAt date is required for scheduled articles." },
        { status: 400 }
      );
    }

    const article = await createArticle({
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      status: status ?? "draft",
      coverImage,
      authorId,
      readTime,
      scheduledAt,
    });
    return NextResponse.json({ success: true, data: article }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create article.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── GET /api/articles/[id] ───────────────────────────────────────────────────
export async function handleGetArticle(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await getArticleById(params.id);
    if (!article) {
      return NextResponse.json({ success: false, message: "Article not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: article }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch article.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── GET /api/articles/slug/[slug] ────────────────────────────────────────────
export async function handleGetArticleBySlug(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const article = await getArticleBySlug(params.slug);
    if (!article) {
      return NextResponse.json({ success: false, message: "Article not found." }, { status: 404 });
    }
    // Track views asynchronously (fire-and-forget)
    incrementArticleViews(String(article._id)).catch(() => {});
    return NextResponse.json({ success: true, data: article }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch article.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── PATCH /api/articles/[id] ─────────────────────────────────────────────────
// Users can only update their own articles (enforced via authorId in service).
export async function handleUpdateArticle(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const userId = req.headers.get("x-user-id") ?? undefined;
    const article = await updateArticle(params.id, body, userId);
    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article not found or you do not have permission to update it." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: article }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update article.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── DELETE /api/articles/[id] ────────────────────────────────────────────────
// Users can only delete their own articles.
export async function handleDeleteArticle(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("x-user-id") ?? undefined;
    const article = await deleteArticle(params.id, userId);
    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article not found or you do not have permission to delete it." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Article deleted." }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete article.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── GET /api/articles/stats ──────────────────────────────────────────────────
// Returns article counts by status for the authenticated user.
export async function handleGetArticleStats(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }
    const stats = await getUserArticleStats(userId);
    return NextResponse.json({ success: true, data: stats }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch stats.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
