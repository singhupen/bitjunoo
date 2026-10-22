/**
 * controllers/article.controller.ts
 * HTTP handlers for article CRUD and editorial lifecycle actions.
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
  submitArticleForReview,
  approveArticle,
  rejectArticle,
  publishArticle,
  unpublishArticle,
  scheduleArticle,
  getReviewQueue,
  publishScheduledArticles,
} from "@/services/article.service";

// ── GET /api/articles ────────────────────────────────────────────────────────
export async function handleGetArticles(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mine = searchParams.get("mine") === "true";
    const userId = req.headers.get("x-user-id") ?? undefined;
    const userRole = req.headers.get("x-user-role") ?? "author";
    const isAdmin = userRole === "admin";

    const result = await getArticles({
      page: Number(searchParams.get("page") ?? 1),
      limit: Number(searchParams.get("limit") ?? 10),
      status: searchParams.get("status") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      authorId: !isAdmin || mine ? userId : undefined,
      isAdmin: isAdmin && !mine,
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
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role") ?? "author";
    const canPost = req.headers.get("x-user-can-post") === "true" || userRole === "admin";
    const canPublish = req.headers.get("x-user-can-publish") === "true" || userRole === "admin";

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      );
    }

    if (!canPost) {
      return NextResponse.json(
        {
          success: false,
          message: "You do not have permission to compose articles. Please wait for administrator approval.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      status,
      coverImage,
      readTime,
      level,
      featured,
      scheduledAt,
      seo,
    } = body;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { success: false, message: "Headline and content are required." },
        { status: 400 }
      );
    }

    // Auto-generate clean excerpt if empty
    const cleanContent = (content || "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/[#*`_~>]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const finalExcerpt = excerpt?.trim() || cleanContent.slice(0, 200) || title.trim();
    const finalCategory = category?.trim() || "Technology";

    const article = await createArticle(
      {
        title,
        slug,
        excerpt: finalExcerpt,
        content,
        category: finalCategory,
        tags,
        status,
        coverImage,
        authorId: userId,
        readTime,
        level,
        featured,
        scheduledAt,
        seo,
      },
      userRole,
      canPublish
    );

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
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { article, redirectSlug } = await getArticleBySlug(params.slug);
    if (!article) {
      return NextResponse.json({ success: false, message: "Article not found." }, { status: 404 });
    }

    if (redirectSlug) {
      return NextResponse.json(
        { success: true, redirect: true, newSlug: redirectSlug, data: article },
        { status: 200 }
      );
    }

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
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role") ?? "author";
    const canPublish = req.headers.get("x-user-can-publish") === "true" || userRole === "admin";

    if (!userId) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }

    const body = await req.json();
    const article = await updateArticle(params.id, body, userId, userRole, canPublish);

    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article not found or you lack permission to update it." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: article }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update article.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// ── DELETE /api/articles/[id] ────────────────────────────────────────────────
export async function handleDeleteArticle(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role") ?? "author";

    if (!userId) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }

    const article = await deleteArticle(params.id, userId, userRole);
    if (!article) {
      return NextResponse.json({ success: false, message: "Article not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Article removed successfully." }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete article.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// ── GET /api/articles/stats ──────────────────────────────────────────────────
export async function handleGetArticleStats(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role") ?? "author";

    if (!userId) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }

    const stats = await getUserArticleStats(userId, userRole);
    return NextResponse.json({ success: true, data: stats }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch stats.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── Action: POST /api/articles/[id]/submit ───────────────────────────────────
export async function handleSubmitForReview(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("x-user-id")!;
    const article = await submitArticleForReview(params.id, userId);
    return NextResponse.json(
      { success: true, message: "Article submitted for editorial review.", data: article },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to submit article.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// ── Action: POST /api/articles/[id]/approve (Admin) ──────────────────────────
export async function handleApproveArticle(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminId = req.headers.get("x-user-id")!;
    const article = await approveArticle(params.id, adminId);
    return NextResponse.json(
      { success: true, message: "Article approved and published live!", data: article },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to approve article.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// ── Action: POST /api/articles/[id]/reject (Admin) ───────────────────────────
export async function handleRejectArticle(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminId = req.headers.get("x-user-id")!;
    const body = await req.json();
    const note = body.note || "Changes requested by editor.";
    const article = await rejectArticle(params.id, adminId, note);
    return NextResponse.json(
      { success: true, message: "Article rejected and returned to draft with feedback.", data: article },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to reject article.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// ── Action: POST /api/articles/[id]/publish ──────────────────────────────────
export async function handlePublishArticle(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("x-user-id")!;
    const userRole = req.headers.get("x-user-role") ?? "author";
    const canPublish = req.headers.get("x-user-can-publish") === "true" || userRole === "admin";

    const article = await publishArticle(params.id, userId, userRole, canPublish);
    return NextResponse.json(
      { success: true, message: "Article published live!", data: article },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to publish article.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// ── Action: POST /api/articles/[id]/unpublish ────────────────────────────────
export async function handleUnpublishArticle(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("x-user-id")!;
    const userRole = req.headers.get("x-user-role") ?? "author";

    const article = await unpublishArticle(params.id, userId, userRole);
    return NextResponse.json(
      { success: true, message: "Article unpublished and reverted to draft.", data: article },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to unpublish article.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// ── Action: POST /api/articles/[id]/schedule ─────────────────────────────────
export async function handleScheduleArticle(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("x-user-id")!;
    const userRole = req.headers.get("x-user-role") ?? "author";
    const canPublish = req.headers.get("x-user-can-publish") === "true";

    const body = await req.json();
    if (!body.scheduledAt) {
      return NextResponse.json(
        { success: false, message: "scheduledAt date is required." },
        { status: 400 }
      );
    }

    const article = await scheduleArticle(params.id, body.scheduledAt, userId, userRole, canPublish);
    return NextResponse.json(
      { success: true, message: "Article scheduled successfully.", data: article },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to schedule article.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// ── GET /api/articles/review (Admin Review Queue) ─────────────────────────────
export async function handleGetReviewQueue() {
  try {
    const queue = await getReviewQueue();
    return NextResponse.json({ success: true, data: queue }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch review queue.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── POST /api/cron/publish-scheduled ─────────────────────────────────────────
export async function handlePublishScheduledCron() {
  try {
    const count = await publishScheduledArticles();
    return NextResponse.json(
      { success: true, message: `Processed scheduled publications. ${count} article(s) published.` },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process scheduled articles.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
