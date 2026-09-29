/**
 * controllers/category.controller.ts
 * HTTP handlers for category management endpoints.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
} from "@/services/category.service";

// ── GET /api/categories ──────────────────────────────────────────────────────
export async function handleGetCategories() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json({ success: true, data: categories }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch categories.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── POST /api/categories ─────────────────────────────────────────────────────
export async function handleCreateCategory(req: NextRequest) {
  try {
    const { name, description, color } = await req.json();
    if (!name) {
      return NextResponse.json(
        { success: false, message: "Category name is required." },
        { status: 400 }
      );
    }
    const category = await createCategory({ name, description, color });
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create category.";
    const isConflict = message.includes("already exists");
    return NextResponse.json({ success: false, message }, { status: isConflict ? 409 : 500 });
  }
}

// ── GET /api/categories/[id] ─────────────────────────────────────────────────
export async function handleGetCategory(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await getCategoryBySlug(params.id);
    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: category }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch category.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── PATCH /api/categories/[id] ───────────────────────────────────────────────
export async function handleUpdateCategory(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const category = await updateCategory(params.id, body);
    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: category }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update category.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── DELETE /api/categories/[id] ──────────────────────────────────────────────
export async function handleDeleteCategory(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await deleteCategory(params.id);
    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Category deleted." }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete category.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
