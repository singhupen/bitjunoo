/**
 * services/auth.service.ts
 * Business logic for authentication — register, login, token refresh.
 * Controllers call these methods and do NOT contain business logic.
 */

import User, { IUser } from "@/models/User";
import { signToken, TokenPayload } from "@/lib/auth/jwt";
import { connectDB } from "@/lib/db/mongoose";

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
  await connectDB();

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
 * Throws with generic message on bad credentials (no info leaking).
 */
export async function loginUser(payload: LoginPayload): Promise<AuthResult> {
  await connectDB();

  // Explicitly select password for comparison
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

  // Return sanitised user (password excluded by toJSON transform)
  return { user: user.toJSON() as Omit<IUser, "password">, token };
}

/**
 * Get a user profile by ID (no password).
 */
export async function getUserById(userId: string): Promise<IUser | null> {
  await connectDB();
  return User.findById(userId);
}
