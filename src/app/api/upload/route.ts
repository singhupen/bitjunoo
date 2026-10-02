/**
 * app/api/upload/route.ts
 * POST   /api/upload — upload image to Cloudinary (protected)
 * DELETE /api/upload — remove image from Cloudinary by publicId (protected)
 */

import { NextRequest } from "next/server";
import { handleUpload, handleDeleteUpload } from "@/controllers/upload.controller";
import { withAuth } from "@/middleware/auth.middleware";

export const POST = withAuth(async (req: NextRequest) => handleUpload(req));
export const DELETE = withAuth(async (req: NextRequest) => handleDeleteUpload(req));
