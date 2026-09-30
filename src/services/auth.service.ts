/**
 * services/auth.service.ts
 * Business logic for authentication — register, login, profile lookup & update.
 */

import User, { IUser, ISocialLinks } from "@/models/User";
import { signToken, TokenPayload } from "@/lib/auth/jwt";

// ── Types ────────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "author" | "viewer";
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
 * Throws if the email is already in use.
 */
export async function registerUser(payload: RegisterPayload): Promise<AuthResult> {
  const existing = await User.findOne({ email: payload.email.toLowerCase() });
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const user = await User.create({
    name: payload.name.trim(),
    email: payload.email.toLowerCase().trim(),
    password: payload.password,
    role: payload.role ?? "author",
  });

  const tokenPayload: TokenPayload = {
    userId: String(user._id),
    email: user.email,
    role: user.role,
  };

  const token = signToken(tokenPayload);

  return { user: user.toJSON() as Omit<IUser, "password">, token };
}

/**
 * Authenticate an existing user.
 * Throws with a generic message on bad credentials (avoids info leaking).
 */
export async function loginUser(payload: LoginPayload): Promise<AuthResult> {
  // Explicitly select password field for comparison (it is hidden by default)
  const user = await User.findOne({ email: payload.email.toLowerCase() }).select(
    "+password"
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isMatch = await user.comparePassword(payload.password);
  if (!isMatch) {
    throw new Error("Invalid email or password.");
  }

  const tokenPayload: TokenPayload = {
    userId: String(user._id),
    email: user.email,
    role: user.role,
  };

  const token = signToken(tokenPayload);

  // Password is excluded by the toJSON transform defined on the schema
  return { user: user.toJSON() as Omit<IUser, "password">, token };
}

/**
 * Get a user profile by ID (password never returned).
 */
export async function getUserById(userId: string): Promise<IUser | null> {
  return User.findById(userId);
}

/**
 * Update user profile by ID — supports all profile fields including social links.
 */
export async function updateUserProfile(
  userId: string,
  updates: UpdateProfilePayload
): Promise<IUser | null> {
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

  // Merge social links individually to allow partial updates
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
 */
export async function changeUserPassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new Error("User not found.");

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) throw new Error("Current password is incorrect.");

  user.password = newPassword;
  await user.save();
}
