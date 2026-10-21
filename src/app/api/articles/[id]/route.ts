/**
 * app/api/articles/[id]/route.ts
 * GET    /api/articles/[id] — get article by ID (public if published; draft requires owner/admin)
 * PATCH  /api/articles/[id] — update article (protected)
 * DELETE /api/articles/[id] — delete article (protected)
 */

import { NextRequest, NextResponse } from "next/server";
import {
  handleGetArticle,
  handleUpdateArticle,
  handleDeleteArticle,
} from "@/controllers/article.controller";
import { withAuth } from "@/middleware/auth.middleware";
import { verifyToken, extractBearerToken } from "@/lib/auth/jwt";
import Article from "@/models/Article";
import "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const article = await Article.findById(id).populate("author", "name email avatar headline bio");

  if (!article) {
    return NextResponse.json({ success: false, message: "Article not found." }, { status: 404 });
  }

  // If already published, everyone can view
  if (article.status === "published") {
    return NextResponse.json({ success: true, data: article }, { status: 200 });
  }

  // If not published, only the author or an admin can view
  const authHeader = req.headers.get("Authorization");
  let token = extractBearerToken(authHeader) || req.cookies.get("bj_token")?.value;

  if (token) {
    try {
      const payload = verifyToken(token);
      if (payload.role === "admin" || String(article.author._id) === payload.userId) {
        return NextResponse.json({ success: true, data: article }, { status: 200 });
      }
    } catch {
      // invalid token
    }
  }

  return NextResponse.json({ success: false, message: "Article not found or not published." }, { status: 404 });
}

export const PATCH = withAuth(
  async (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => {
    const params = await ctx.params;
    return handleUpdateArticle(req, { params: { id: params.id } });
  }
);

export const DELETE = withAuth(
  async (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => {
    const params = await ctx.params;
    return handleDeleteArticle(req, { params: { id: params.id } });
  }
);
