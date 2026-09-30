/**
 * app/api/auth/me/route.ts
 * GET    /api/auth/me — returns the current authenticated user's full profile.
 * PATCH  /api/auth/me — updates profile fields including social links.
 * PUT    /api/auth/me — alias for PATCH.
 * POST   /api/auth/me/password — change password (handled separately below).
 */

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/middleware/auth.middleware";
import { getUserById, updateUserProfile, changeUserPassword } from "@/services/auth.service";

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

    const {
      name,
      bio,
      avatar,
      headline,
      location,
      socialLinks,
      defaultCategory,
      defaultLevel,
      emailDigest,
      articleFeedback,
    } = body;

    const updated = await updateUserProfile(userId, {
      name,
      bio,
      avatar,
      headline,
      location,
      socialLinks,
      defaultCategory,
      defaultLevel,
      emailDigest,
      articleFeedback,
    });

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

const passwordHandler = withAuth(async (req: NextRequest) => {
  try {
    const userId = req.headers.get("x-user-id")!;
    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "currentPassword and newPassword are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 8 characters." },
        { status: 400 }
      );
    }

    await changeUserPassword(userId, currentPassword, newPassword);

    return NextResponse.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to change password.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
});

export { getHandler as GET, updateHandler as PATCH, updateHandler as PUT, passwordHandler as POST };
