/**
 * app/api/public/articles/route.ts
 * GET /api/public/articles — public listing of published articles
 * Enforces published-only visibility, hides sensitive author fields, caps limits.
 */

import { NextRequest, NextResponse } from "next/server";
import Article from "@/models/Article";
import "@/models/User";
import "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 12)));
    const skip = (page - 1) * limit;

    const category = searchParams.get("category");
    const search = searchParams.get("q") || searchParams.get("search");
    const featuredOnly = searchParams.get("featured") === "true";

    const filter: Record<string, unknown> = {
      status: "published",
    };

    if (category && category !== "All Articles" && category !== "all") {
      filter.category = { $regex: new RegExp(`^${category.trim()}$`, "i") };
    }

    if (featuredOnly) {
      filter.featured = true;
    }

    if (search) {
      const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { title: { $regex: escaped, $options: "i" } },
        { excerpt: { $regex: escaped, $options: "i" } },
        { tags: { $in: [new RegExp(escaped, "i")] } },
      ];
    }

    const [articles, total] = await Promise.all([
      Article.find(filter)
        .select("-draftBuffer -slugHistory -reviewNote -reviewedBy")
        .populate("author", "name avatar headline bio location") // Omit email for privacy
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Article.countDocuments(filter),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          articles,
          total,
          page,
          totalPages: Math.ceil(total / limit),
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch articles.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
