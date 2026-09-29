/**
 * app/api/articles/slug/[slug]/route.ts
 * GET /api/articles/slug/[slug] — get article by slug (public, increments views)
 */

import { NextRequest } from "next/server";
import { handleGetArticleBySlug } from "@/controllers/article.controller";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  const { slug } = await ctx.params;
  return handleGetArticleBySlug(req, { params: { slug } });
}
