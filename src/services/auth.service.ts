/**
 * services/auth.service.ts
 * Business logic for authentication — register, login, profile lookup.
 *
 * NOTE: No connectDB() call here.
 * The database connection is opened once in lib/db/index.ts (imported by the
 * root layout).  Mongoose buffers all model operations until the socket is
 * ready, so services can query models directly without waiting.
 */

import User, { IUser } from "@/models/User";
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
 * Update user profile by ID.
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<Pick<IUser, "name" | "bio" | "avatar">>
): Promise<IUser | null> {
  return User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  );
}
