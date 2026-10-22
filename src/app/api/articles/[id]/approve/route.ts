/**
 * app/api/articles/[id]/approve/route.ts
 * POST /api/articles/[id]/approve — approve and publish article (Admin only)
 */

import { NextRequest } from "next/server";
import { withAuth, withRole } from "@/middleware/auth.middleware";
import { handleApproveArticle } from "@/controllers/article.controller";

export const POST = withAuth(
  withRole(
    async (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => {
      const params = await ctx.params;
      return handleApproveArticle(req, { params: { id: params.id } });
    },
    "admin"
  )
);
