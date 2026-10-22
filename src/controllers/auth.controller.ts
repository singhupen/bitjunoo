/**
 * controllers/auth.controller.ts
 * HTTP request/response handlers for authentication.
 * Enforces role security (ignores body role) and manages cookies.
 */

import { NextRequest, NextResponse } from "next/server";
import { registerUser, loginUser } from "@/services/auth.service";

// ── POST /api/auth/register ──────────────────────────────────────────────────
export async function handleRegister(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

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

    // Notice: role from body is strictly omitted for security (C1 fix)
    const result = await registerUser({ name, email, password });

    const response = NextResponse.json(
      {
        success: true,
        message:
          result.user.accountStatus === "pending"
            ? "Account created! Waiting for administrator approval before publishing."
            : "Account created successfully.",
        data: { user: result.user, token: result.token },
      },
      { status: 201 }
    );

    response.cookies.set({
      name: "bj_token",
      value: result.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
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

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        data: { user: result.user, token: result.token },
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "bj_token",
      value: result.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed.";
    const isForbidden = message.includes("suspended");
    return NextResponse.json(
      { success: false, message },
      { status: isForbidden ? 403 : 401 }
    );
  }
}
