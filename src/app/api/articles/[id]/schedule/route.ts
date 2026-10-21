/**
 * app/api/articles/[id]/schedule/route.ts
 * POST /api/articles/[id]/schedule — schedule publication for future time
 */

import { NextRequest } from "next/server";
import { withAuth } from "@/middleware/auth.middleware";
import { handleScheduleArticle } from "@/controllers/article.controller";

export const POST = withAuth(
  async (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => {
    const params = await ctx.params;
    return handleScheduleArticle(req, { params: { id: params.id } });
  }
);
