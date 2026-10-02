/**
 * app/api/articles/route.ts
 * GET  /api/articles — list articles
 *   - Without auth: only published articles
 *   - With ?mine=true and valid token: returns the user's own articles (all statuses)
 * POST /api/articles — create article (protected, always saved as the auth user)
 */

import { NextRequest, NextResponse } from "next/server";
import { handleGetArticles, handleCreateArticle } from "@/controllers/article.controller";
import { withAuth } from "@/middleware/auth.middleware";
import { verifyToken, extractBearerToken } from "@/lib/auth/jwt";

// GET: public for published, user-scoped for ?mine=true with auth
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mine = searchParams.get("mine") === "true";

  // If ?mine=true, try to inject user ID from bearer token
  if (mine) {
    const authHeader = req.headers.get("Authorization");
    const token = extractBearerToken(authHeader);
    if (token) {
      try {
        const payload = verifyToken(token);
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("x-user-id", payload.userId);
        const augmentedReq = new NextRequest(req.url, {
          method: req.method,
          headers: requestHeaders,
          body: req.body,
        });
        return handleGetArticles(augmentedReq);
      } catch {
        return NextResponse.json(
          { success: false, message: "Invalid or expired token." },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, message: "Authentication required for personal articles." },
        { status: 401 }
      );
    }
  }

  // Public: only published articles
  return handleGetArticles(req);
}

export const POST = withAuth(
  async (req: NextRequest) => handleCreateArticle(req)
);
