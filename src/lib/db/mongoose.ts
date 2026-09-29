/**
 * lib/db/mongoose.ts
 *
 * MongoDB connection singleton.
 *
 * DESIGN:
 *  – The actual TCP handshake happens ONCE per process (or once per warm
 *    Node.js instance in Next.js dev with HMR).
 *  – After the first successful connect(), subsequent calls are no-ops that
 *    return the already-resolved promise from the module-level cache.
 *  – Mongoose's internal command buffering (bufferCommands: true, the default)
 *    means any model operation issued BEFORE the connection resolves is queued
 *    and executed automatically once the socket is open.  Services therefore
 *    do NOT need to await connectDB() before every query.
 *  – Call connectDB() exactly once from lib/db/index.ts at module evaluation
 *    time so the promise is in-flight before the first API request arrives.
 */

import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "[DB] MONGODB_URI is not defined. Add it to .env.local before starting the server."
  );
}

// ── Global cache (survives Next.js HMR module re-evaluation) ─────────────────
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cache;

// ── Core connect function ─────────────────────────────────────────────────────
export async function connectDB(): Promise<Mongoose> {
  // Already connected — return immediately (no new TCP handshake)
  if (cache.conn) return cache.conn;

  // Connection in-flight — await the same promise (no duplicate connections)
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGODB_URI, {
        // Let Mongoose queue commands until the socket is ready
        bufferCommands: true,
      })
      .then((instance) => {
        console.log(
          `\x1b[32m✔ Database connected successfully\x1b[0m  → ${instance.connection.host}/${instance.connection.name}`
        );
        return instance;
      })
      .catch((err: Error) => {
        // Clear so the next request can retry
        cache.promise = null;
        console.error("\x1b[31m✖ Database connection failed:\x1b[0m", err.message);
        throw err;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

// ── Connection state helpers (useful for health-check endpoints) ──────────────
export function isConnected(): boolean {
  return mongoose.connection.readyState === 1; // 1 = connected
}

export function getConnectionState(): string {
  const states: Record<number, string> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  return states[mongoose.connection.readyState] ?? "unknown";
}
