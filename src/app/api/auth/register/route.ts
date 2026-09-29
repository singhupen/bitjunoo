/**
 * app/api/auth/register/route.ts
 * POST /api/auth/register
 */

import { NextRequest } from "next/server";
import { handleRegister } from "@/controllers/auth.controller";

export async function POST(req: NextRequest) {
  return handleRegister(req);
}
