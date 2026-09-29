/**
 * controllers/upload.controller.ts
 * HTTP handler for image upload to Cloudinary.
 */

import { NextRequest, NextResponse } from "next/server";
import { uploadImage, removeImage } from "@/services/upload.service";

// ── POST /api/upload ─────────────────────────────────────────────────────────
export async function handleUpload(req: NextRequest) {
  try {
    const body = await req.json();
    const { source, folder } = body;

    if (!source) {
      return NextResponse.json(
        { success: false, message: "source (base64 URI or URL) is required." },
        { status: 400 }
      );
    }

    const result = await uploadImage(source, folder);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── DELETE /api/upload ───────────────────────────────────────────────────────
export async function handleDeleteUpload(req: NextRequest) {
  try {
    const { publicId } = await req.json();
    if (!publicId) {
      return NextResponse.json(
        { success: false, message: "publicId is required." },
        { status: 400 }
      );
    }
    await removeImage(publicId);
    return NextResponse.json({ success: true, message: "Image deleted." }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Delete failed.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
