/**
 * app/api/articles/[id]/publish/route.ts
 * POST /api/articles/[id]/publish — publish or update live article
 */

import { NextRequest } from "next/server";
import { withAuth } from "@/middleware/auth.middleware";
import { handlePublishArticle } from "@/controllers/article.controller";

export const POST = withAuth(
  async (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => {
    const params = await ctx.params;
    return handlePublishArticle(req, { params: { id: params.id } });
  }
);
