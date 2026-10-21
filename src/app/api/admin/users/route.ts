/**
 * app/api/admin/users/route.ts
 * GET /api/admin/users — list users with filters (Admin only)
 */

import { NextRequest } from "next/server";
import { withAuth, withRole } from "@/middleware/auth.middleware";
import { handleListUsers } from "@/controllers/user.controller";

export const GET = withAuth(
  withRole(async (req: NextRequest) => handleListUsers(req), "admin")
);
