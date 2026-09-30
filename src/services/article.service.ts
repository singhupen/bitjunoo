/**
 * services/article.service.ts
 * Business logic for articles — CRUD, pagination, slug lookup.
 *
 * NOTE: No connectDB() call here.
 * The database connection is opened once in lib/db/index.ts (imported by the
 * root layout).  Mongoose buffers all model operations until the socket is
 * ready, so services can query models directly without waiting.
 */

import Article, { IArticle } from "@/models/Article";
import Category from "@/models/Category";

export interface CreateArticlePayload {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  status?: "draft" | "published" | "archived";
  coverImage?: { url: string; publicId: string; alt?: string };
  authorId: string;
  readTime?: number;
}

export interface UpdateArticlePayload extends Partial<CreateArticlePayload> {
  slug?: string;
}

export interface ArticleListOptions {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  search?: string;
}

// ── Create ───────────────────────────────────────────────────────────────────
export async function createArticle(
  payload: CreateArticlePayload
): Promise<IArticle> {
  const article = await Article.create({
    title: payload.title,
    slug: payload.slug,
    excerpt: payload.excerpt,
    content: payload.content,
    category: payload.category,
    tags: payload.tags ?? [],
    status: payload.status ?? "draft",
    coverImage: payload.coverImage,
    author: payload.authorId,
    readTime: payload.readTime,
  });

  // Increment category article count
  await Category.findOneAndUpdate(
    { name: payload.category },
    { $inc: { articleCount: 1 } },
    { upsert: false }
  );

  return article;
}

// ── Read ─────────────────────────────────────────────────────────────────────
export async function getArticles(options: ArticleListOptions = {}) {
  const { page = 1, limit = 10, status, category, search } = options;
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (category) filter.category = category;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
      { tags: { $in: [new RegExp(search, "i")] } },
    ];
  }

  const [articles, total] = await Promise.all([
    Article.find(filter)
      .populate("author", "name email avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Article.countDocuments(filter),
  ]);

  return {
    articles,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getArticleBySlug(slug: string): Promise<IArticle | null> {
  return Article.findOne({ slug }).populate("author", "name email avatar bio");
}

export async function getArticleById(id: string): Promise<IArticle | null> {
  return Article.findById(id).populate("author", "name email avatar");
}

// ── Update ───────────────────────────────────────────────────────────────────
export async function updateArticle(
  id: string,
  payload: UpdateArticlePayload
): Promise<IArticle | null> {
  const update: Record<string, unknown> = { ...payload };
  if (payload.status === "published") {
    update.publishedAt = new Date();
  }
  if (payload.authorId) {
    update.author = payload.authorId;
    delete update.authorId;
  }

  return Article.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  }).populate("author", "name email avatar");
}

// ── Delete ───────────────────────────────────────────────────────────────────
export async function deleteArticle(id: string): Promise<IArticle | null> {
  return Article.findByIdAndDelete(id);
}

// ── Increment views ──────────────────────────────────────────────────────────
export async function incrementArticleViews(id: string): Promise<void> {
  await Article.findByIdAndUpdate(id, { $inc: { views: 1 } });
}
