/**
 * lib/cloudinary/config.ts
 * Centralised Cloudinary SDK configuration.
 * All credentials are read from environment variables — never hard-coded.
 */

import { v2 as cloudinary } from "cloudinary";

const requiredVars = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
] as const;

for (const key of requiredVars) {
  if (!process.env[key]) {
    throw new Error(
      `Missing Cloudinary environment variable: ${key}. Add it to .env.local`
    );
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

// ── Upload folder helper ────────────────────────────────────────────────────
/** Returns the configured upload folder or falls back to "bitjunoo/uploads" */
export const uploadFolder =
  process.env.CLOUDINARY_UPLOAD_FOLDER ?? "bitjunoo/uploads";

// ── Utility: upload a data URI or remote URL to Cloudinary ─────────────────
interface UploadOptions {
  folder?: string;
  publicId?: string;
  transformation?: object;
}

export async function uploadToCloudinary(
  source: string,
  options: UploadOptions = {}
) {
  const result = await cloudinary.uploader.upload(source, {
    folder: options.folder ?? uploadFolder,
    public_id: options.publicId,
    transformation: options.transformation,
    resource_type: "auto",
  });
  return result;
}

export async function deleteFromCloudinary(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}
