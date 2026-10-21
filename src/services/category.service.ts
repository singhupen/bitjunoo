/**
 * services/category.service.ts
 * Business logic for category taxonomy and article associations.
 */

import Category, { ICategory } from "@/models/Category";
import Article from "@/models/Article";
import { connectDB } from "@/lib/db/mongoose";

// ── Create ───────────────────────────────────────────────────────────────────
export async function createCategory(data: {
  name: string;
  description?: string;
  color?: string;
}): Promise<ICategory> {
  await connectDB();
  const normalizedName = data.name.trim();
  const existing = await Category.findOne({
    name: { $regex: new RegExp(`^${normalizedName}$`, "i") },
  });
  if (existing) {
    throw new Error(`Category "${normalizedName}" already exists.`);
  }

  return Category.create({
    name: normalizedName,
    description: data.description?.trim(),
    color: data.color || "#3B82F6",
    articleCount: 0,
  });
}

// ── Read ─────────────────────────────────────────────────────────────────────
export async function getAllCategories(): Promise<
  (ICategory & { publishedCount?: number })[]
> {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 }).lean();

  // Compute live published article count via aggregation (prevents counter drift)
  const counts = await Article.aggregate([
    { $match: { status: "published" } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);

  const countMap = new Map<string, number>();
  counts.forEach((c) => {
    if (c._id) countMap.set(c._id.toLowerCase(), c.count);
  });

  return categories.map((cat) => ({
    ...cat,
    articleCount: countMap.get(cat.name.toLowerCase()) ?? 0,
  })) as any;
}

export async function getCategoryBySlug(slug: string): Promise<ICategory | null> {
  await connectDB();
  return Category.findOne({ slug: slug.toLowerCase() });
}

// ── Update ───────────────────────────────────────────────────────────────────
export async function updateCategory(
  id: string,
  data: Partial<{ name: string; description: string; color: string }>
): Promise<ICategory | null> {
  await connectDB();
  const category = await Category.findById(id);
  if (!category) return null;

  const oldName = category.name;

  if (data.name && data.name.trim() !== oldName) {
    const newName = data.name.trim();
    const existing = await Category.findOne({
      name: { $regex: new RegExp(`^${newName}$`, "i") },
      _id: { $ne: id },
    });
    if (existing) {
      throw new Error(`Category "${newName}" already exists.`);
    }

    category.name = newName;
    // Synchronize articles using the old name
    await Article.updateMany({ category: oldName }, { category: newName });
  }

  if (data.description !== undefined) category.description = data.description.trim();
  if (data.color !== undefined) category.color = data.color;

  await category.save();
  return category;
}

// ── Delete ───────────────────────────────────────────────────────────────────
export async function deleteCategory(id: string): Promise<ICategory | null> {
  await connectDB();
  const category = await Category.findById(id);
  if (!category) return null;

  // Block deletion if any articles belong to this category
  const articleCount = await Article.countDocuments({ category: category.name });
  if (articleCount > 0) {
    throw new Error(
      `Cannot delete category "${category.name}" because it is currently assigned to ${articleCount} article(s). Please reassign them first.`
    );
  }

  await Category.findByIdAndDelete(id);
  return category;
}
