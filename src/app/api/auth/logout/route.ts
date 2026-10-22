/**
 * app/api/auth/logout/route.ts
 * POST /api/auth/logout
 * Clears the authentication session cookie.
 */

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully." },
    { status: 200 }
  );

  response.cookies.set({
    name: "bj_token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
