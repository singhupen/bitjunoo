/**
 * middleware/auth.middleware.ts
 * JWT-based route guard for protected API endpoints.
 * Verifies active session, checks account suspension & token version,
 * and sets granular role/permission headers.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractBearerToken } from "@/lib/auth/jwt";
import User from "@/models/User";
import { connectDB } from "@/lib/db/mongoose";

type RouteHandler = (
  req: NextRequest,
  context?: any
) => Promise<NextResponse> | NextResponse;

/**
 * Higher-order function: wraps a route handler with JWT authentication.
 * Checks token validity, DB user status (rejects suspended accounts), and token version.
 * Attaches user attributes to headers.
 */
export function withAuth(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    const authHeader = req.headers.get("Authorization");
    let token = extractBearerToken(authHeader);
    if (!token) {
      token = req.cookies.get("bj_token")?.value || null;
    }

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication required. Please sign in." },
        { status: 401 }
      );
    }

    try {
      const payload = verifyToken(token);

      // Ensure DB connection is active before querying
      await connectDB();

      // Verify user in DB to enforce real-time status and revocations
      const user = await User.findById(payload.userId).select(
        "role accountStatus permissions tokenVersion email"
      );

      if (!user) {
        return NextResponse.json(
          { success: false, message: "Account not found. Please register or sign in again." },
          { status: 401 }
        );
      }

      if (user.accountStatus === "suspended") {
        return NextResponse.json(
          { success: false, message: "Your account has been suspended. Please contact the administrator." },
          { status: 403 }
        );
      }

      // If token payload has tokenVersion and doesn't match DB tokenVersion, invalidate
      if (
        payload.tokenVersion !== undefined &&
        user.tokenVersion !== undefined &&
        payload.tokenVersion < user.tokenVersion
      ) {
        return NextResponse.json(
          { success: false, message: "Session expired or revoked. Please sign in again." },
          { status: 401 }
        );
      }

      // Clone request headers and attach user info
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-id", String(user._id));
      requestHeaders.set("x-user-email", user.email);
      requestHeaders.set("x-user-role", user.role);
      requestHeaders.set("x-user-status", user.accountStatus);
      requestHeaders.set("x-user-can-post", String(user.permissions?.canPost ?? false));
      requestHeaders.set("x-user-can-publish", String(user.permissions?.canPublish ?? false));
      requestHeaders.set("x-user-can-manage-categories", String(user.permissions?.canManageCategories ?? false));

      const augmentedReq = new NextRequest(req.url, {
        method: req.method,
        headers: requestHeaders,
        body: req.body,
      });

      return handler(augmentedReq, context);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid or expired session. Please sign in again." },
        { status: 401 }
      );
    }
  };
}

/**
 * Require a specific role (e.g. "admin"). Must wrap after withAuth.
 */
export function withRole(handler: RouteHandler, requiredRole: string): RouteHandler {
  return async (req, context) => {
    const role = req.headers.get("x-user-role");
    if (role !== requiredRole) {
      return NextResponse.json(
        { success: false, message: "Access forbidden. Administrator role required." },
        { status: 403 }
      );
    }
    return handler(req, context);
  };
}

/**
 * Require specific permission (canPost, canPublish, canManageCategories).
 * Admins always bypass permission checks.
 */
export function withPermission(
  handler: RouteHandler,
  permission: "canPost" | "canPublish" | "canManageCategories"
): RouteHandler {
  return async (req, context) => {
    const role = req.headers.get("x-user-role");
    if (role === "admin") {
      return handler(req, context);
    }

    const headerKey = `x-user-${permission.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
    const hasPerm = req.headers.get(headerKey) === "true";

    if (!hasPerm) {
      return NextResponse.json(
        {
          success: false,
          message: `Permission denied. You do not have '${permission}' permission.`,
        },
        { status: 403 }
      );
    }

    return handler(req, context);
  };
}
