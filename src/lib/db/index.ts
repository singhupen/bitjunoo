/**
 * lib/db/index.ts
 *
 * Centralised database bootstrap module.
 *
 * This is the ONLY place connectDB() is called.  Importing this file causes
 * the connection to be established (or reused from cache) immediately at
 * module evaluation time — before any service function runs.
 *
 * Usage:
 *   • In app/layout.tsx or a Next.js instrumentation hook, import this file
 *     once so the TCP socket is opened as early as possible.
 *   • Services just import their models and query — no connectDB() needed.
 *
 * Why this works without calling connectDB() inside every service:
 *   Mongoose buffers all model operations (find, create, update …) internally
 *   until the connection resolves.  Once the socket is open the buffer drains
 *   automatically.  There is no race condition.
 */

import { connectDB, isConnected, getConnectionState } from "./mongoose";

// ── Eagerly open the connection ───────────────────────────────────────────────
// The promise is stored in the module-level cache inside mongoose.ts so
// subsequent imports of this file are also instant no-ops.
connectDB().catch((err: Error) => {
  // Already logged inside connectDB(); surface it here too so the process
  // exit reason is obvious in production logs.
  console.error("[DB] Fatal: could not establish database connection.", err.message);
});

// ── Re-export helpers for convenience ────────────────────────────────────────
export { connectDB, isConnected, getConnectionState };
