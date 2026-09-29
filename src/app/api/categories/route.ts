/**
 * app/api/categories/route.ts
 * GET  /api/categories — list all categories (public)
 * POST /api/categories — create category (protected)
 */

import { NextRequest } from "next/server";
import { handleGetCategories, handleCreateCategory } from "@/controllers/category.controller";
import { withAuth } from "@/middleware/auth.middleware";

export async function GET() {
  return handleGetCategories();
}

export const POST = withAuth(
  async (req: NextRequest) => handleCreateCategory(req)
);
