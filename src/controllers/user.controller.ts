/**
 * controllers/user.controller.ts
 * HTTP request handlers for admin user management endpoints.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  listUsers,
  updateUser,
  deleteUser,
  getUserStats,
} from "@/services/user.service";

// ── GET /api/admin/users ─────────────────────────────────────────────────────
export async function handleListUsers(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") ?? undefined;
    const role = searchParams.get("role") ?? undefined;
    const search = searchParams.get("search") ?? undefined;
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 20);

    const result = await listUsers({ status, role, search, page, limit });
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch users.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── GET /api/admin/users/stats ───────────────────────────────────────────────
export async function handleGetUserStats() {
  try {
    const stats = await getUserStats();
    return NextResponse.json({ success: true, data: stats }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch user stats.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── PATCH /api/admin/users/[id] ──────────────────────────────────────────────
export async function handleUpdateUser(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminId = req.headers.get("x-user-id") ?? undefined;
    const body = await req.json();
    const updated = await updateUser(params.id, body, adminId);
    return NextResponse.json(
      { success: true, message: "User updated successfully.", data: updated },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update user.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// ── DELETE /api/admin/users/[id] ─────────────────────────────────────────────
export async function handleDeleteUser(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminId = req.headers.get("x-user-id");
    if (!adminId) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      );
    }

    await deleteUser(params.id, adminId);
    return NextResponse.json(
      { success: true, message: "User removed successfully." },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete user.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
