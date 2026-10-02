/**
 * services/upload.service.ts
 * Handles image uploads to Cloudinary.
 * Converts base64 data URIs or remote URLs → Cloudinary asset.
 */

import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary/config";

export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

/**
 * Upload a single image (base64 data URI or remote URL).
 * @param source - data:image/... URI or https:// URL
 * @param folder - optional Cloudinary sub-folder
 */
export async function uploadImage(
  source: string,
  folder?: string
): Promise<UploadResult> {
  const result = await uploadToCloudinary(source, { folder });
  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
}

/**
 * Delete an image from Cloudinary by its public_id.
 */
export async function removeImage(publicId: string): Promise<void> {
  await deleteFromCloudinary(publicId);
}
