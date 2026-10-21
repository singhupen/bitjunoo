/**
 * app/api/articles/review/route.ts
 * GET /api/articles/review — retrieve editorial review queue (Admin only)
 */

import { NextRequest } from "next/server";
import { withAuth, withRole } from "@/middleware/auth.middleware";
import { handleGetReviewQueue } from "@/controllers/article.controller";

export const GET = withAuth(
  withRole(async (_req: NextRequest) => handleGetReviewQueue(), "admin")
);
