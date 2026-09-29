/**
 * services/category.service.ts
 * Business logic for category management.
 */

import Category, { ICategory } from "@/models/Category";
import { connectDB } from "@/lib/db/mongoose";

// ── Create ───────────────────────────────────────────────────────────────────
export async function createCategory(data: {
  name: string;
  description?: string;
  color?: string;
}): Promise<ICategory> {
  await connectDB();
  const existing = await Category.findOne({ name: data.name });
  if (existing) throw new Error(`Category "${data.name}" already exists.`);
  return Category.create(data);
}

// ── Read ─────────────────────────────────────────────────────────────────────
export async function getAllCategories(): Promise<ICategory[]> {
  await connectDB();
  return Category.find().sort({ name: 1 });
}

export async function getCategoryBySlug(slug: string): Promise<ICategory | null> {
  await connectDB();
  return Category.findOne({ slug });
}

// ── Update ───────────────────────────────────────────────────────────────────
export async function updateCategory(
  id: string,
  data: Partial<{ name: string; description: string; color: string }>
): Promise<ICategory | null> {
  await connectDB();
  return Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

// ── Delete ───────────────────────────────────────────────────────────────────
export async function deleteCategory(id: string): Promise<ICategory | null> {
  await connectDB();
  return Category.findByIdAndDelete(id);
}
