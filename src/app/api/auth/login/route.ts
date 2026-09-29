/**
 * app/api/auth/login/route.ts
 * POST /api/auth/login
 */

import { NextRequest } from "next/server";
import { handleLogin } from "@/controllers/auth.controller";

export async function POST(req: NextRequest) {
  return handleLogin(req);
}
