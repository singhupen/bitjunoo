/**
 * app/api/categories/[id]/route.ts
 * GET    /api/categories/[id] — get category by ID/slug
 * PATCH  /api/categories/[id] — update category (protected)
 * DELETE /api/categories/[id] — delete category (protected)
 */

import { NextRequest } from "next/server";
import {
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory,
} from "@/controllers/category.controller";
import { withAuth } from "@/middleware/auth.middleware";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  return handleGetCategory(req, { params: { id } });
}

export const PATCH = withAuth(
  async (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => {
    const params = await ctx.params;
    return handleUpdateCategory(req, { params: { id: params.id } });
  }
);

export const DELETE = withAuth(
  async (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => {
    const params = await ctx.params;
    return handleDeleteCategory(req, { params: { id: params.id } });
  }
);
