/**
 * lib/cloudinary/config.ts
 * Centralised Cloudinary SDK configuration.
 * All credentials are read from environment variables — never hard-coded.
 */

import { v2 as cloudinary } from "cloudinary";

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export default cloudinary;

// ── Upload folder helper ────────────────────────────────────────────────────
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
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary credentials not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env.local"
    );
  }

  const result = await cloudinary.uploader.upload(source, {
    folder: options.folder ?? uploadFolder,
    public_id: options.publicId,
    transformation: options.transformation,
    resource_type: "auto",
  });
  return result;
}

export async function deleteFromCloudinary(publicId: string) {
  if (!isCloudinaryConfigured()) return null;
  return cloudinary.uploader.destroy(publicId);
}
