/**
 * services/category.service.ts
 * Business logic for category management.
 *
 * NOTE: No connectDB() call here.
 * The database connection is opened once in lib/db/index.ts (imported by the
 * root layout).  Mongoose buffers all model operations until the socket is
 * ready, so services can query models directly without waiting.
 */

import Category, { ICategory } from "@/models/Category";

// ── Create ───────────────────────────────────────────────────────────────────
export async function createCategory(data: {
  name: string;
  description?: string;
  color?: string;
}): Promise<ICategory> {
  const existing = await Category.findOne({ name: data.name });
  if (existing) throw new Error(`Category "${data.name}" already exists.`);
  return Category.create(data);
}

// ── Read ─────────────────────────────────────────────────────────────────────
export async function getAllCategories(): Promise<ICategory[]> {
  return Category.find().sort({ name: 1 });
}

export async function getCategoryBySlug(slug: string): Promise<ICategory | null> {
  return Category.findOne({ slug });
}

// ── Update ───────────────────────────────────────────────────────────────────
export async function updateCategory(
  id: string,
  data: Partial<{ name: string; description: string; color: string }>
): Promise<ICategory | null> {
  return Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

// ── Delete ───────────────────────────────────────────────────────────────────
export async function deleteCategory(id: string): Promise<ICategory | null> {
  return Category.findByIdAndDelete(id);
}
