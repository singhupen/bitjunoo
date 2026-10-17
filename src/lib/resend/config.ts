/**
 * lib/resend/config.ts
 * Resend configuration and client initialization.
 * All credentials and email routing settings are loaded from environment variables.
 */

import { Resend } from "resend";

/** Environment variables for Resend integration */
export const RESEND_CONFIG = {
  apiKey: process.env.RESEND_API_KEY,
  fromEmail: process.env.RESEND_FROM_EMAIL || "BitJunoo <onboarding@resend.dev>",
  toEmail: process.env.RESEND_TO_EMAIL || "delivered@resend.dev",
};

/**
 * Returns a configured Resend client instance.
 * Throws a descriptive error if RESEND_API_KEY is not defined.
 */
export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing RESEND_API_KEY environment variable. Please add it to your .env.local file."
    );
  }
  return new Resend(apiKey);
}

/** Pre-instantiated client for quick access when key is present */
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
