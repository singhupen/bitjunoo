/**
 * services/user.service.ts
 * Business logic for user administration and permission grants.
 * Only accessible by administrators.
 */

import User, { IUser, IUserPermissions } from "@/models/User";
import Article from "@/models/Article";
import { connectDB } from "@/lib/db/mongoose";

export interface UserListOptions {
  status?: string;
  role?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface UpdateUserPayload {
  role?: "admin" | "author" | "viewer";
  accountStatus?: "pending" | "active" | "suspended";
  permissions?: Partial<IUserPermissions>;
}

/**
 * List all registered users with status and permission filters.
 */
export async function listUsers(options: UserListOptions = {}) {
  await connectDB();
  const { status, role, search, page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;

  const query: Record<string, unknown> = {};

  if (status && status !== "all") {
    query.accountStatus = status;
  }
  if (role && role !== "all") {
    query.role = role;
  }
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const [users, total] = await Promise.all([
    User.find(query)
      .populate("approvedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    User.countDocuments(query),
  ]);

  return {
    users,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Update user role, status, or permissions.
 * If suspended, increments tokenVersion so existing active tokens are invalidated immediately.
 */
export async function updateUser(
  userId: string,
  updates: UpdateUserPayload,
  adminId?: string
): Promise<IUser | null> {
  await connectDB();
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  // Prevent admin from demoting or suspending their own account
  if (adminId && String(user._id) === String(adminId)) {
    if (updates.role && updates.role !== "admin") {
      throw new Error("You cannot remove your own administrator status.");
    }
    if (updates.accountStatus === "suspended") {
      throw new Error("You cannot suspend your own administrator account.");
    }
  }

  if (updates.role) {
    user.role = updates.role;
  }

  if (updates.accountStatus) {
    const wasPending = user.accountStatus === "pending";
    user.accountStatus = updates.accountStatus;

    if (wasPending && updates.accountStatus === "active") {
      if (adminId) user.approvedBy = adminId as any;
      user.approvedAt = new Date();
    }

    if (updates.accountStatus === "suspended") {
      user.tokenVersion = (user.tokenVersion ?? 0) + 1;
    }
  }

  if (updates.permissions) {
    user.permissions = {
      canPost: updates.permissions.canPost ?? user.permissions?.canPost ?? false,
      canPublish: updates.permissions.canPublish ?? user.permissions?.canPublish ?? false,
      canManageCategories:
        updates.permissions.canManageCategories ??
        user.permissions?.canManageCategories ??
        false,
    };
  }

  await user.save();
  return user;
}

/**
 * Delete user account.
 */
export async function deleteUser(userId: string, requestingAdminId: string): Promise<boolean> {
  await connectDB();
  if (String(userId) === String(requestingAdminId)) {
    throw new Error("You cannot delete your own administrator account.");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  // Check if articles exist for this user
  const articleCount = await Article.countDocuments({ author: userId });
  if (articleCount > 0) {
    throw new Error(
      `Cannot delete user because they have authored ${articleCount} article(s). Please reassign or delete their articles first.`
    );
  }

  await User.findByIdAndDelete(userId);
  return true;
}

/**
 * Get aggregate user statistics for admin console.
 */
export async function getUserStats() {
  await connectDB();
  const [total, pending, active, suspended] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ accountStatus: "pending" }),
    User.countDocuments({ accountStatus: "active" }),
    User.countDocuments({ accountStatus: "suspended" }),
  ]);

  return { total, pending, active, suspended };
}
