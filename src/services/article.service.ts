/**
 * services/article.service.ts
 * Business logic for articles — CRUD, pagination, slug lookup.
 * Supports user-specific drafts, published, scheduled, and archived states.
 */

import Article, { IArticle } from "@/models/Article";
import Category from "@/models/Category";
import "@/models/User"; // ensure User schema is registered for .populate("author")

export interface CreateArticlePayload {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  status?: "draft" | "published" | "archived" | "scheduled";
  coverImage?: { url: string; publicId: string; alt?: string };
  authorId: string;
  readTime?: number;
  scheduledAt?: string; // ISO date string for scheduled articles
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
  authorId?: string; // filter by user (for user-specific drafts etc.)
}

// ── Create ───────────────────────────────────────────────────────────────────
export async function createArticle(
  payload: CreateArticlePayload
): Promise<IArticle> {
  const articleData: Record<string, unknown> = {
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
  };

  if (payload.status === "scheduled" && payload.scheduledAt) {
    articleData.scheduledAt = new Date(payload.scheduledAt);
  }
  if (payload.status === "published") {
    articleData.publishedAt = new Date();
  }

  const article = await Article.create(articleData);

  // Increment category article count
  if (payload.status === "published") {
    await Category.findOneAndUpdate(
      { name: payload.category },
      { $inc: { articleCount: 1 } },
      { upsert: false }
    );
  }

  return article;
}

// ── Read (with optional user filter) ─────────────────────────────────────────
export async function getArticles(options: ArticleListOptions = {}) {
  const { page = 1, limit = 10, status, category, search, authorId } = options;
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (category) filter.category = category;
  if (authorId) filter.author = authorId;
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

// ── Get user-specific article counts by status ────────────────────────────────
export async function getUserArticleStats(authorId: string) {
  const [drafts, published, scheduled, total] = await Promise.all([
    Article.countDocuments({ author: authorId, status: "draft" }),
    Article.countDocuments({ author: authorId, status: "published" }),
    Article.countDocuments({ author: authorId, status: "scheduled" }),
    Article.countDocuments({ author: authorId }),
  ]);
  return { drafts, published, scheduled, total };
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
  payload: UpdateArticlePayload,
  requestingUserId?: string
): Promise<IArticle | null> {
  const update: Record<string, unknown> = { ...payload };

  // When moving to published, record publishedAt and clear scheduledAt
  if (payload.status === "published") {
    update.publishedAt = new Date();
    update.scheduledAt = undefined;
  }

  // When scheduling, record scheduledAt
  if (payload.status === "scheduled" && payload.scheduledAt) {
    update.scheduledAt = new Date(payload.scheduledAt);
  }

  if (payload.authorId) {
    update.author = payload.authorId;
    delete update.authorId;
  }

  // Build query — enforce author ownership if requestingUserId provided
  const query: Record<string, unknown> = { _id: id };
  if (requestingUserId) query.author = requestingUserId;

  return Article.findOneAndUpdate(query, update, {
    new: true,
    runValidators: true,
  }).populate("author", "name email avatar");
}

// ── Delete ───────────────────────────────────────────────────────────────────
export async function deleteArticle(
  id: string,
  requestingUserId?: string
): Promise<IArticle | null> {
  const query: Record<string, unknown> = { _id: id };
  if (requestingUserId) query.author = requestingUserId;
  return Article.findOneAndDelete(query);
}

// ── Increment views ──────────────────────────────────────────────────────────
export async function incrementArticleViews(id: string): Promise<void> {
  await Article.findByIdAndUpdate(id, { $inc: { views: 1 } });
}
