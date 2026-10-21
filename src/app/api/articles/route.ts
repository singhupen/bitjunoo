/**
 * app/api/articles/route.ts
 * GET  /api/articles — list articles
 *   - Without auth: strictly published articles only (C2 fix)
 *   - With auth: author sees their own articles; admin sees all
 * POST /api/articles — create article (protected, checks canPost permission)
 */

import { NextRequest } from "next/server";
import { handleGetArticles, handleCreateArticle } from "@/controllers/article.controller";
import { withAuth } from "@/middleware/auth.middleware";
import { verifyToken, extractBearerToken } from "@/lib/auth/jwt";
import User from "@/models/User";
import "@/lib/db";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  let token = extractBearerToken(authHeader);
  if (!token) {
    token = req.cookies.get("bj_token")?.value || null;
  }

  // If user is authenticated, determine role and permissions
  if (token) {
    try {
      const payload = verifyToken(token);
      const user = await User.findById(payload.userId).select("role accountStatus permissions email");

      if (user && user.accountStatus !== "suspended") {
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("x-user-id", String(user._id));
        requestHeaders.set("x-user-email", user.email);
        requestHeaders.set("x-user-role", user.role);
        requestHeaders.set("x-user-can-post", String(user.permissions?.canPost ?? false));
        requestHeaders.set("x-user-can-publish", String(user.permissions?.canPublish ?? false));

        const augmentedReq = new NextRequest(req.url, {
          method: req.method,
          headers: requestHeaders,
          body: req.body,
        });

        return handleGetArticles(augmentedReq);
      }
    } catch {
      // Token invalid — fall through to public strict published filter
    }
  }

  // Unauthenticated Public: ENFORCE published status only (C2 fix)
  const url = new URL(req.url);
  url.searchParams.set("status", "published");
  const publicReq = new NextRequest(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  return handleGetArticles(publicReq);
}

export const POST = withAuth(
  async (req: NextRequest) => handleCreateArticle(req)
);
