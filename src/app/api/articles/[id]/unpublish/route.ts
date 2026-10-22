/**
 * app/api/articles/[id]/unpublish/route.ts
 * POST /api/articles/[id]/unpublish — revert published article to draft
 */

import { NextRequest } from "next/server";
import { withAuth } from "@/middleware/auth.middleware";
import { handleUnpublishArticle } from "@/controllers/article.controller";

export const POST = withAuth(
  async (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => {
    const params = await ctx.params;
    return handleUnpublishArticle(req, { params: { id: params.id } });
  }
);
