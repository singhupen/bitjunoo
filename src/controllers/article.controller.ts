/**
 * controllers/article.controller.ts
 * HTTP handlers for article CRUD endpoints.
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
} from "@/services/article.service";

// ── GET /api/articles ────────────────────────────────────────────────────────
export async function handleGetArticles(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await getArticles({
      page: Number(searchParams.get("page") ?? 1),
      limit: Number(searchParams.get("limit") ?? 10),
      status: searchParams.get("status") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      search: searchParams.get("search") ?? undefined,
    });

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch articles.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── POST /api/articles ───────────────────────────────────────────────────────
export async function handleCreateArticle(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, category, tags, status, coverImage, readTime } = body;

    // authorId comes from the body if explicitly provided, otherwise fall back to
    // the authenticated user's ID injected by withAuth via the x-user-id header.
    const authorId = body.authorId ?? req.headers.get("x-user-id");

    if (!title || !excerpt || !content || !category || !authorId) {
      return NextResponse.json(
        { success: false, message: "title, excerpt, content, and category are required." },
        { status: 400 }
      );
    }

    const article = await createArticle({ title, slug, excerpt, content, category, tags, status, coverImage, authorId, readTime });
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
export async function handleUpdateArticle(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const article = await updateArticle(params.id, body);
    if (!article) {
      return NextResponse.json({ success: false, message: "Article not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: article }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update article.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── DELETE /api/articles/[id] ────────────────────────────────────────────────
export async function handleDeleteArticle(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await deleteArticle(params.id);
    if (!article) {
      return NextResponse.json({ success: false, message: "Article not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Article deleted." }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete article.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
