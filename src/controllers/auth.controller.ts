/**
 * controllers/auth.controller.ts
 * HTTP request/response handlers for authentication.
 * Delegates all business logic to auth.service.ts.
 */

import { NextRequest, NextResponse } from "next/server";
import { registerUser, loginUser } from "@/services/auth.service";

// ── POST /api/auth/register ──────────────────────────────────────────────────
export async function handleRegister(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const result = await registerUser({ name, email, password, role });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        data: { user: result.user, token: result.token },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Registration failed.";
    const isConflict = message.includes("already exists");
    return NextResponse.json(
      { success: false, message },
      { status: isConflict ? 409 : 500 }
    );
  }
}

// ── POST /api/auth/login ─────────────────────────────────────────────────────
export async function handleLogin(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const result = await loginUser({ email, password });

    return NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        data: { user: result.user, token: result.token },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed.";
    return NextResponse.json(
      { success: false, message },
      { status: 401 }
    );
  }
}
