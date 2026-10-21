/**
 * app/api/articles/[id]/submit/route.ts
 * POST /api/articles/[id]/submit — submit draft for editorial review
 */

import { NextRequest } from "next/server";
import { withAuth } from "@/middleware/auth.middleware";
import { handleSubmitForReview } from "@/controllers/article.controller";

export const POST = withAuth(
  async (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => {
    const params = await ctx.params;
    return handleSubmitForReview(req, { params: { id: params.id } });
  }
);
