/**
 * app/api/auth/me/route.ts
 * GET /api/auth/me — returns the current authenticated user's profile.
 * Protected route — requires Bearer token.
 */

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/middleware/auth.middleware";
import { getUserById, updateUserProfile } from "@/services/auth.service";

const getHandler = withAuth(async (req: NextRequest) => {
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

const updateHandler = withAuth(async (req: NextRequest) => {
  try {
    const userId = req.headers.get("x-user-id")!;
    const body = await req.json();
    const { name, bio, avatar } = body;

    const updated = await updateUserProfile(userId, { name, bio, avatar });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "User not found or update failed." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      data: updated,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update profile.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
});

export { getHandler as GET, updateHandler as PATCH, updateHandler as PUT };
