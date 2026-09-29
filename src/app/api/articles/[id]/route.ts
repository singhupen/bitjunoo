/**
 * app/api/articles/[id]/route.ts
 * GET    /api/articles/[id] — get article by ID
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

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  return handleGetArticle(req, { params: { id } });
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
