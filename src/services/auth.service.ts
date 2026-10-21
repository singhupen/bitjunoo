/**
 * services/auth.service.ts
 * Business logic for authentication — register, login, profile lookup & update.
 * Secure against privilege escalation (C1 fix) and manages account status & permissions.
 */

import User, { IUser, ISocialLinks, IUserPermissions } from "@/models/User";
import { signToken, TokenPayload } from "@/lib/auth/jwt";
import { connectDB } from "@/lib/db/mongoose";

// ── Types ────────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResult {
  user: Omit<IUser, "password">;
  token: string;
}

export interface UpdateProfilePayload {
  name?: string;
  bio?: string;
  avatar?: string;
  headline?: string;
  location?: string;
  socialLinks?: Partial<ISocialLinks>;
  defaultCategory?: string;
  defaultLevel?: string;
  emailDigest?: boolean;
  articleFeedback?: boolean;
}

// ── Service Methods ──────────────────────────────────────────────────────────

/**
 * Register a new user.
 * SECURE: The role passed in request body is completely ignored.
 * If this is the first user ever registered or matches ADMIN_EMAIL, bootstrap as admin.
 * Otherwise, default to author with "pending" approval status and no post permissions.
 */
export async function registerUser(payload: RegisterPayload): Promise<AuthResult> {
  await connectDB();
  const normalizedEmail = payload.email.toLowerCase().trim();
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const userCount = await User.countDocuments();
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@bitjunoo.com").toLowerCase().trim();
  const isFirstOrAdminEmail = userCount === 0 || normalizedEmail === adminEmail;

  const role = isFirstOrAdminEmail ? "admin" : "author";
  const accountStatus = isFirstOrAdminEmail ? "active" : "pending";
  const permissions: IUserPermissions = isFirstOrAdminEmail
    ? { canPost: true, canPublish: true, canManageCategories: true }
    : { canPost: false, canPublish: false, canManageCategories: false };

  const user = await User.create({
    name: payload.name.trim(),
    email: normalizedEmail,
    password: payload.password,
    role,
    accountStatus,
    permissions,
    tokenVersion: 0,
    lastLoginAt: new Date(),
  });

  const tokenPayload: TokenPayload = {
    userId: String(user._id),
    email: user.email,
    role: user.role,
    tokenVersion: user.tokenVersion,
  };

  const token = signToken(tokenPayload);

  return { user: user.toJSON() as Omit<IUser, "password">, token };
}

/**
 * Authenticate an existing user.
 * Enforces account status checks (blocks suspended accounts).
 */
export async function loginUser(payload: LoginPayload): Promise<AuthResult> {
  await connectDB();
  const normalizedEmail = payload.email.toLowerCase().trim();

  // Explicitly select password field for comparison (hidden by default)
  const user = await User.findOne({ email: normalizedEmail }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isMatch = await user.comparePassword(payload.password);
  if (!isMatch) {
    throw new Error("Invalid email or password.");
  }

  if (user.accountStatus === "suspended") {
    throw new Error("This account has been suspended. Please contact the administrator.");
  }

  // Update last login timestamp
  user.lastLoginAt = new Date();
  await user.save();

  const tokenPayload: TokenPayload = {
    userId: String(user._id),
    email: user.email,
    role: user.role,
    tokenVersion: user.tokenVersion ?? 0,
  };

  const token = signToken(tokenPayload);

  return { user: user.toJSON() as Omit<IUser, "password">, token };
}

/**
 * Get a user profile by ID (password never returned).
 */
export async function getUserById(userId: string): Promise<IUser | null> {
  await connectDB();
  return User.findById(userId);
}

/**
 * Update user profile by ID — supports all profile fields including social links.
 */
export async function updateUserProfile(
  userId: string,
  updates: UpdateProfilePayload
): Promise<IUser | null> {
  await connectDB();
  const updateDoc: Record<string, unknown> = {};

  if (updates.name !== undefined) updateDoc.name = updates.name;
  if (updates.bio !== undefined) updateDoc.bio = updates.bio;
  if (updates.avatar !== undefined) updateDoc.avatar = updates.avatar;
  if (updates.headline !== undefined) updateDoc.headline = updates.headline;
  if (updates.location !== undefined) updateDoc.location = updates.location;
  if (updates.defaultCategory !== undefined) updateDoc.defaultCategory = updates.defaultCategory;
  if (updates.defaultLevel !== undefined) updateDoc.defaultLevel = updates.defaultLevel;
  if (updates.emailDigest !== undefined) updateDoc.emailDigest = updates.emailDigest;
  if (updates.articleFeedback !== undefined) updateDoc.articleFeedback = updates.articleFeedback;

  if (updates.socialLinks) {
    for (const [key, val] of Object.entries(updates.socialLinks)) {
      updateDoc[`socialLinks.${key}`] = val;
    }
  }

  return User.findByIdAndUpdate(
    userId,
    { $set: updateDoc },
    { new: true, runValidators: true }
  );
}

/**
 * Change user password — verifies current password before updating.
 * Increments tokenVersion to invalidate existing tokens.
 */
export async function changeUserPassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  await connectDB();
  const user = await User.findById(userId).select("+password");
  if (!user) throw new Error("User not found.");

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) throw new Error("Current password is incorrect.");

  user.password = newPassword;
  user.tokenVersion = (user.tokenVersion ?? 0) + 1;
  await user.save();
}
