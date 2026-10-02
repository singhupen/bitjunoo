/**
 * middleware/auth.middleware.ts
 * JWT-based route guard for protected API endpoints.
 * Usage: wrap your route handler with withAuth().
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractBearerToken } from "@/lib/auth/jwt";

type RouteHandler = (
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
) => Promise<NextResponse> | NextResponse;

/**
 * Higher-order function: wraps a route handler with JWT authentication.
 * Attaches the decoded token payload to req.headers as x-user-id, x-user-email, x-user-role.
 */
export function withAuth(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    const authHeader = req.headers.get("Authorization");
    const token = extractBearerToken(authHeader);

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication required. Please sign in." },
        { status: 401 }
      );
    }

    try {
      const payload = verifyToken(token);

      // Clone request headers and attach user info
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-id", payload.userId);
      requestHeaders.set("x-user-email", payload.email);
      requestHeaders.set("x-user-role", payload.role);

      const augmentedReq = new NextRequest(req.url, {
        method: req.method,
        headers: requestHeaders,
        body: req.body,
      });

      return handler(augmentedReq, context);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token. Please sign in again." },
        { status: 401 }
      );
    }
  };
}

/**
 * Require a specific role. Must be used after withAuth.
 */
export function withRole(handler: RouteHandler, requiredRole: string): RouteHandler {
  return async (req, context) => {
    const role = req.headers.get("x-user-role");
    if (role !== requiredRole) {
      return NextResponse.json(
        { success: false, message: "Insufficient permissions." },
        { status: 403 }
      );
    }
    return handler(req, context);
  };
}
