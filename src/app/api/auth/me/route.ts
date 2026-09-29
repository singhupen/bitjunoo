/**
 * app/api/auth/me/route.ts
 * GET /api/auth/me — returns the current authenticated user's profile.
 * Protected route — requires Bearer token.
 */

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/middleware/auth.middleware";
import { getUserById } from "@/services/auth.service";

const handler = withAuth(async (req: NextRequest) => {
  try {
    const userId = req.headers.get("x-user-id")!;
    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch profile.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
});

export { handler as GET };
