/**
 * app/api/articles/route.ts
 * GET  /api/articles — list articles (with pagination, filters, search)
 * POST /api/articles — create article (protected)
 */

import { NextRequest } from "next/server";
import { handleGetArticles, handleCreateArticle } from "@/controllers/article.controller";
import { withAuth } from "@/middleware/auth.middleware";

export async function GET(req: NextRequest) {
  return handleGetArticles(req);
}

export const POST = withAuth(
  async (req: NextRequest) => handleCreateArticle(req)
);
