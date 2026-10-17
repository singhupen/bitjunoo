/**
 * app/api/resend/config.ts
 * Resend configuration export for the API route.
 * Re-exports the client and environment settings from lib/resend/config.
 */

export {
  RESEND_CONFIG,
  getResendClient,
  resend,
} from "@/lib/resend/config";
