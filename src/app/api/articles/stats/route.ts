/**
 * app/api/articles/stats/route.ts
 * GET /api/articles/stats — returns article counts per status for the current user
 */

import { NextRequest } from "next/server";
import { handleGetArticleStats } from "@/controllers/article.controller";
import { withAuth } from "@/middleware/auth.middleware";

export const GET = withAuth(
  async (req: NextRequest) => handleGetArticleStats(req)
);
