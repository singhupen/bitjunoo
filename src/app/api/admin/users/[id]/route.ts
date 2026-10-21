/**
 * app/api/admin/users/[id]/route.ts
 * PATCH  /api/admin/users/[id] — update user status & permissions (Admin only)
 * DELETE /api/admin/users/[id] — delete user account (Admin only)
 */

import { NextRequest } from "next/server";
import { withAuth, withRole } from "@/middleware/auth.middleware";
import {
  handleUpdateUser,
  handleDeleteUser,
} from "@/controllers/user.controller";

export const PATCH = withAuth(
  withRole(
    async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
      const params = await context.params;
      return handleUpdateUser(req, { params });
    },
    "admin"
  )
);

export const DELETE = withAuth(
  withRole(
    async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
      const params = await context.params;
      return handleDeleteUser(req, { params });
    },
    "admin"
  )
);
