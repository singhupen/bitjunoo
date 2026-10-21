/**
 * lib/auth/jwt.ts
 * JWT utility helpers — sign and verify tokens using jsonwebtoken.
 * The signing secret is read from JWT_SECRET in .env.local.
 */

import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "bj_sec_prod_987d65f4e3c2b1a0f9e8d7c6b5a49382";
const JWT_EXPIRES_IN =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) ?? "7d";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  tokenVersion?: number;
}

/** Sign a JWT token with the user payload */
export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/** Verify and decode a JWT token — throws if invalid or expired */
export function verifyToken(token: string): TokenPayload & JwtPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload & JwtPayload;
}

/** Extract token from an Authorization header (Bearer <token>) */
export function extractBearerToken(authHeader?: string | null): string | null {
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice(7);
}
