/**
 * services/article.service.ts
 * Business logic for article lifecycle, editorial review queue, and safe updates.
 * Implements strict allow-lists (H3 fix), preserved publish dates (H4 fix),
 * role-scoped visibility (H9 fix), and slug redirection histories.
 */

import Article, { IArticle } from "@/models/Article";
import Category from "@/models/Category";
import "@/models/User"; // Ensure User schema is loaded for Mongoose population

export interface CreateArticlePayload {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  status?: "draft" | "in_review" | "published" | "archived" | "scheduled";
  coverImage?: { url: string; publicId: string; alt?: string };
  authorId: string;
  readTime?: number;
  level?: string;
  featured?: boolean;
  scheduledAt?: string;
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string };
}

export interface UpdateArticlePayload {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  tags?: string[];
  coverImage?: { url: string; publicId: string; alt?: string };
  readTime?: number;
  level?: string;
  featured?: boolean;
  status?: "draft" | "in_review" | "published" | "archived" | "scheduled";
  scheduledAt?: string;
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string };
  isAutosave?: boolean;
}

export interface ArticleListOptions {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  search?: string;
  authorId?: string;
  isAdmin?: boolean;
}

/** Helper: Generate URL-safe slug */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ── Create ───────────────────────────────────────────────────────────────────
export async function createArticle(
  payload: CreateArticlePayload,
  userRole: string = "author",
  canPublish: boolean = false
): Promise<IArticle> {
  const generatedSlug = payload.slug ? generateSlug(payload.slug) : generateSlug(payload.title);

  // Check slug uniqueness; if taken, append timestamp suffix
  const existingSlug = await Article.findOne({ slug: generatedSlug });
  const finalSlug = existingSlug
    ? `${generatedSlug}-${Date.now().toString().slice(-4)}`
    : generatedSlug;

  // Determine permitted status based on user credentials
  let finalStatus: "draft" | "in_review" | "published" | "scheduled" | "archived" = "draft";
  if (payload.status === "in_review") {
    finalStatus = "in_review";
  } else if (payload.status === "published" || payload.status === "scheduled") {
    if (userRole === "admin" || canPublish) {
      finalStatus = payload.status;
    } else {
      finalStatus = "in_review";
    }
  }

  const articleData: Record<string, unknown> = {
    title: payload.title.trim(),
    slug: finalSlug,
    slugHistory: [],
    excerpt: payload.excerpt.trim(),
    content: payload.content,
    category: payload.category.trim(),
    tags: payload.tags ?? [],
    status: finalStatus,
    coverImage: payload.coverImage,
    author: payload.authorId,
    readTime: payload.readTime ?? 5,
    level: payload.level ?? "All Engineers",
    featured: userRole === "admin" ? Boolean(payload.featured) : false,
    seo: payload.seo,
  };

  if (finalStatus === "scheduled" && payload.scheduledAt) {
    articleData.scheduledAt = new Date(payload.scheduledAt);
  }
  if (finalStatus === "published") {
    articleData.publishedAt = new Date();
  }
  if (finalStatus === "in_review") {
    articleData.submittedAt = new Date();
  }

  const article = await Article.create(articleData);

  // Increment category count if published
  if (finalStatus === "published") {
    await Category.findOneAndUpdate(
      { name: payload.category },
      { $inc: { articleCount: 1 } },
      { upsert: false }
    );
  }

  return article;
}

// ── Read / Listing ───────────────────────────────────────────────────────────
export async function getArticles(options: ArticleListOptions = {}) {
  const { page = 1, limit = 10, status, category, search, authorId, isAdmin } = options;
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = {};

  // If not admin, only show own articles in editorial manager
  if (!isAdmin && authorId) {
    filter.author = authorId;
  } else if (authorId) {
    filter.author = authorId;
  }

  if (status && status !== "all") {
    filter.status = status;
  }
  if (category) {
    filter.category = category;
  }
  if (search) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [
      { title: { $regex: escaped, $options: "i" } },
      { excerpt: { $regex: escaped, $options: "i" } },
      { tags: { $in: [new RegExp(escaped, "i")] } },
    ];
  }

  const [articles, total] = await Promise.all([
    Article.find(filter)
      .populate("author", "name email avatar headline bio")
      .populate("reviewedBy", "name email")
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

// ── Article by Slug (with slugHistory redirection support) ───────────────────
export async function getArticleBySlug(slug: string): Promise<{
  article: IArticle | null;
  redirectSlug?: string;
}> {
  const normalized = slug.toLowerCase().trim();
  const article = await Article.findOne({ slug: normalized }).populate(
    "author",
    "name email avatar bio headline location socialLinks"
  );

  if (article) return { article };

  // Check if requested slug exists in slugHistory of an updated article (301 redirect)
  const redirectedArticle = await Article.findOne({
    slugHistory: normalized,
  }).populate("author", "name email avatar bio headline location socialLinks");

  if (redirectedArticle) {
    return { article: redirectedArticle, redirectSlug: redirectedArticle.slug };
  }

  return { article: null };
}

export async function getArticleById(id: string): Promise<IArticle | null> {
  return Article.findById(id).populate("author", "name email avatar bio headline");
}

// ── Update (Strict Allow-list & Safe Autosave Buffer) ─────────────────────────
export async function updateArticle(
  id: string,
  payload: UpdateArticlePayload,
  requestingUserId: string,
  requestingUserRole: string = "author"
): Promise<IArticle | null> {
  const article = await Article.findById(id);
  if (!article) return null;

  const isOwner = String(article.author) === String(requestingUserId);
  const isAdmin = requestingUserRole === "admin";

  if (!isOwner && !isAdmin) {
    throw new Error("You do not have permission to edit this article.");
  }

  // Handle Autosave on Published Article (Option A from proper.md):
  // Preserve live content; store draft modifications in draftBuffer
  if (article.status === "published" && payload.isAutosave) {
    article.draftBuffer = {
      title: payload.title ?? article.title,
      excerpt: payload.excerpt ?? article.excerpt,
      content: payload.content ?? article.content,
      category: payload.category ?? article.category,
      tags: payload.tags ?? article.tags,
      coverImage: payload.coverImage ?? article.coverImage,
      updatedAt: new Date(),
    };
    article.lastEditedBy = requestingUserId as any;
    await article.save();
    return article;
  }

  // Handle slug change on published article (store old slug in slugHistory)
  if (payload.slug && payload.slug !== article.slug) {
    const newSlug = generateSlug(payload.slug);
    if (newSlug !== article.slug) {
      const slugConflict = await Article.findOne({
        slug: newSlug,
        _id: { $ne: article._id },
      });
      if (slugConflict) {
        throw new Error("This URL slug is already taken by another article.");
      }
      if (!article.slugHistory) article.slugHistory = [];
      if (!article.slugHistory.includes(article.slug)) {
        article.slugHistory.push(article.slug);
      }
      article.slug = newSlug;
    }
  }

  // Update allowed content fields
  if (payload.title !== undefined) article.title = payload.title.trim();
  if (payload.excerpt !== undefined) article.excerpt = payload.excerpt.trim();
  if (payload.content !== undefined) article.content = payload.content;
  if (payload.category !== undefined) article.category = payload.category.trim();
  if (payload.tags !== undefined) article.tags = payload.tags;
  if (payload.coverImage !== undefined) article.coverImage = payload.coverImage;
  if (payload.readTime !== undefined) article.readTime = payload.readTime;
  if (payload.level !== undefined) article.level = payload.level;
  if (payload.seo !== undefined) article.seo = payload.seo;

  if (isAdmin && payload.featured !== undefined) {
    article.featured = payload.featured;
  }

  article.lastEditedBy = requestingUserId as any;

  // Clear draftBuffer when manual update is applied
  if (!payload.isAutosave) {
    article.draftBuffer = undefined;
  }

  await article.save();
  return article;
}

// ── Action: Submit for Review ─────────────────────────────────────────────────
export async function submitArticleForReview(
  id: string,
  authorId: string
): Promise<IArticle> {
  const article = await Article.findById(id);
  if (!article) throw new Error("Article not found.");

  if (String(article.author) !== String(authorId)) {
    throw new Error("Only the article author can submit for review.");
  }

  article.status = "in_review";
  article.submittedAt = new Date();
  article.reviewNote = undefined; // Clear any previous rejection note
  await article.save();
  return article;
}

// ── Action: Approve Article (Admin only) ──────────────────────────────────────
export async function approveArticle(
  id: string,
  adminId: string
): Promise<IArticle> {
  const article = await Article.findById(id);
  if (!article) throw new Error("Article not found.");

  // Merge draftBuffer if present
  if (article.draftBuffer?.content) {
    article.title = article.draftBuffer.title || article.title;
    article.excerpt = article.draftBuffer.excerpt || article.excerpt;
    article.content = article.draftBuffer.content;
    article.category = article.draftBuffer.category || article.category;
    article.tags = article.draftBuffer.tags || article.tags;
    article.coverImage = article.draftBuffer.coverImage || article.coverImage;
    article.draftBuffer = undefined;
  }

  article.status = "published";
  article.reviewedBy = adminId as any;
  article.reviewedAt = new Date();
  if (!article.publishedAt) {
    article.publishedAt = new Date();
  }
  article.reviewNote = undefined;

  await article.save();

  // Increment category count
  await Category.findOneAndUpdate(
    { name: article.category },
    { $inc: { articleCount: 1 } }
  );

  return article;
}

// ── Action: Reject Article (Admin only) ───────────────────────────────────────
export async function rejectArticle(
  id: string,
  adminId: string,
  note: string
): Promise<IArticle> {
  const article = await Article.findById(id);
  if (!article) throw new Error("Article not found.");

  article.status = "draft";
  article.reviewedBy = adminId as any;
  article.reviewedAt = new Date();
  article.reviewNote = note.trim();

  await article.save();
  return article;
}

// ── Action: Publish / Update Live (Admin or canPublish) ───────────────────────
export async function publishArticle(
  id: string,
  userId: string,
  userRole: string,
  canPublish: boolean
): Promise<IArticle> {
  const article = await Article.findById(id);
  if (!article) throw new Error("Article not found.");

  const isOwner = String(article.author) === String(userId);
  const isAdmin = userRole === "admin";

  if (!isAdmin && (!isOwner || !canPublish)) {
    throw new Error("You do not have direct publishing permissions. Please submit for review.");
  }

  // Merge draftBuffer if present
  if (article.draftBuffer?.content) {
    article.title = article.draftBuffer.title || article.title;
    article.excerpt = article.draftBuffer.excerpt || article.excerpt;
    article.content = article.draftBuffer.content;
    article.category = article.draftBuffer.category || article.category;
    article.tags = article.draftBuffer.tags || article.tags;
    article.coverImage = article.draftBuffer.coverImage || article.coverImage;
    article.draftBuffer = undefined;
  }

  article.status = "published";
  if (!article.publishedAt) {
    article.publishedAt = new Date();
  }
  article.scheduledAt = undefined;

  await article.save();
  return article;
}

// ── Action: Unpublish (Move back to Draft) ────────────────────────────────────
export async function unpublishArticle(
  id: string,
  userId: string,
  userRole: string
): Promise<IArticle> {
  const article = await Article.findById(id);
  if (!article) throw new Error("Article not found.");

  const isOwner = String(article.author) === String(userId);
  const isAdmin = userRole === "admin";

  if (!isAdmin && !isOwner) {
    throw new Error("Permission denied.");
  }

  article.status = "draft";
  await article.save();

  // Decrement category count
  await Category.findOneAndUpdate(
    { name: article.category, articleCount: { $gt: 0 } },
    { $inc: { articleCount: -1 } }
  );

  return article;
}

// ── Action: Schedule Article ─────────────────────────────────────────────────
export async function scheduleArticle(
  id: string,
  scheduledAt: string,
  userId: string,
  userRole: string,
  canPublish: boolean
): Promise<IArticle> {
  const article = await Article.findById(id);
  if (!article) throw new Error("Article not found.");

  const isOwner = String(article.author) === String(userId);
  const isAdmin = userRole === "admin";

  if (!isAdmin && (!isOwner || !canPublish)) {
    throw new Error("Scheduling requires publishing permission.");
  }

  const targetDate = new Date(scheduledAt);
  if (isNaN(targetDate.getTime()) || targetDate <= new Date()) {
    throw new Error("Scheduled date must be a valid future date.");
  }

  article.status = "scheduled";
  article.scheduledAt = targetDate;
  await article.save();
  return article;
}

// ── Review Queue Listing (Admin only) ─────────────────────────────────────────
export async function getReviewQueue() {
  return Article.find({ status: "in_review" })
    .populate("author", "name email avatar headline")
    .sort({ submittedAt: 1, createdAt: 1 });
}

// ── Cron: Publish Scheduled Articles ─────────────────────────────────────────
export async function publishScheduledArticles(): Promise<number> {
  const now = new Date();
  const scheduledArticles = await Article.find({
    status: "scheduled",
    scheduledAt: { $lte: now },
  });

  for (const article of scheduledArticles) {
    article.status = "published";
    article.publishedAt = article.scheduledAt || now;
    article.scheduledAt = undefined;
    await article.save();

    await Category.findOneAndUpdate(
      { name: article.category },
      { $inc: { articleCount: 1 } }
    );
  }

  return scheduledArticles.length;
}

// ── Delete Article ───────────────────────────────────────────────────────────
export async function deleteArticle(
  id: string,
  requestingUserId: string,
  requestingUserRole: string = "author"
): Promise<IArticle | null> {
  const article = await Article.findById(id);
  if (!article) return null;

  const isOwner = String(article.author) === String(requestingUserId);
  const isAdmin = requestingUserRole === "admin";

  if (!isAdmin && !isOwner) {
    throw new Error("Permission denied. You can only delete your own articles.");
  }

  // If author is not admin, only allow deleting drafts or in_review
  if (!isAdmin && article.status === "published") {
    throw new Error("Published articles cannot be directly deleted by authors. Unpublish or request admin removal.");
  }

  await Article.findByIdAndDelete(id);

  if (article.status === "published") {
    await Category.findOneAndUpdate(
      { name: article.category, articleCount: { $gt: 0 } },
      { $inc: { articleCount: -1 } }
    );
  }

  return article;
}

// ── Get Role-Scoped Article Counts ───────────────────────────────────────────
export async function getUserArticleStats(userId: string, role: string = "author") {
  if (role === "admin") {
    const [drafts, inReview, published, scheduled, total] = await Promise.all([
      Article.countDocuments({ status: "draft" }),
      Article.countDocuments({ status: "in_review" }),
      Article.countDocuments({ status: "published" }),
      Article.countDocuments({ status: "scheduled" }),
      Article.countDocuments(),
    ]);
    return { drafts, inReview, published, scheduled, total };
  }

  const [drafts, inReview, published, scheduled, total] = await Promise.all([
    Article.countDocuments({ author: userId, status: "draft" }),
    Article.countDocuments({ author: userId, status: "in_review" }),
    Article.countDocuments({ author: userId, status: "published" }),
    Article.countDocuments({ author: userId, status: "scheduled" }),
    Article.countDocuments({ author: userId }),
  ]);
  return { drafts, inReview, published, scheduled, total };
}

// ── Increment Views (Safely) ─────────────────────────────────────────────────
export async function incrementArticleViews(id: string): Promise<void> {
  await Article.findByIdAndUpdate(id, { $inc: { views: 1 } });
}
