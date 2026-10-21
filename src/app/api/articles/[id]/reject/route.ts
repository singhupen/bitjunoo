/**
 * app/api/articles/[id]/reject/route.ts
 * POST /api/articles/[id]/reject — reject article with feedback note (Admin only)
 */

import { NextRequest } from "next/server";
import { withAuth, withRole } from "@/middleware/auth.middleware";
import { handleRejectArticle } from "@/controllers/article.controller";

export const POST = withAuth(
  withRole(
    async (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => {
      const params = await ctx.params;
      return handleRejectArticle(req, { params: { id: params.id } });
    },
    "admin"
  )
);
