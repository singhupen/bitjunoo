/**
 * app/api/public/categories/route.ts
 * GET /api/public/categories — returns categories with real published article counts
 */

import { NextResponse } from "next/server";
import { getAllCategories } from "@/services/category.service";
import "@/lib/db";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(
      { success: true, data: categories },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
        },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch categories.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
