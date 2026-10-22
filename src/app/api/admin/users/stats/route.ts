/**
 * app/api/admin/users/stats/route.ts
 * GET /api/admin/users/stats — aggregate user statistics (Admin only)
 */

import { NextRequest } from "next/server";
import { withAuth, withRole } from "@/middleware/auth.middleware";
import { handleGetUserStats } from "@/controllers/user.controller";

export const GET = withAuth(
  withRole(async (_req: NextRequest) => handleGetUserStats(), "admin")
);
