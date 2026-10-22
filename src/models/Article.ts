/**
 * models/Article.ts
 * Mongoose Article model — represents blog/editorial publications.
 * Supports draft, in_review, published, archived, and scheduled statuses.
 * Includes review notes, featured flag, draft buffer, slug history, and SEO meta.
 */

import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IDraftBuffer {
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  tags?: string[];
  coverImage?: {
    url: string;
    publicId: string;
    alt?: string;
  };
  updatedAt?: Date;
}

export interface IArticleSEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

export interface IArticle extends Document {
  title: string;
  slug: string;
  slugHistory: string[];
  excerpt: string;
  content: string;
  coverImage?: {
    url: string;
    publicId: string;
    alt?: string;
  };
  author: Types.ObjectId;
  lastEditedBy?: Types.ObjectId;
  category: string;
  tags: string[];
  status: "draft" | "in_review" | "published" | "archived" | "scheduled";
  featured: boolean;
  level?: string;
  readTime?: number; // estimated minutes
  views: number;
  reviewNote?: string;
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
  submittedAt?: Date;
  publishedAt?: Date;
  scheduledAt?: Date;
  draftBuffer?: IDraftBuffer;
  seo?: IArticleSEO;
  createdAt: Date;
  updatedAt: Date;
}

const DraftBufferSchema = new Schema<IDraftBuffer>(
  {
    title: { type: String },
    excerpt: { type: String },
    content: { type: String },
    category: { type: String },
    tags: [{ type: String }],
    coverImage: {
      url: { type: String },
      publicId: { type: String },
      alt: { type: String },
    },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const SEOSchema = new Schema<IArticleSEO>(
  {
    metaTitle: { type: String, maxlength: 120 },
    metaDescription: { type: String, maxlength: 300 },
    ogImage: { type: String },
  },
  { _id: false }
);

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    slugHistory: [{ type: String, lowercase: true, trim: true }],
    excerpt: {
      type: String,
      default: "",
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    coverImage: {
      url: { type: String },
      publicId: { type: String },
      alt: { type: String },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastEditedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    tags: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ["draft", "in_review", "published", "archived", "scheduled"],
      default: "draft",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    level: {
      type: String,
      default: "All Engineers",
    },
    readTime: { type: Number, default: 5 },
    views: { type: Number, default: 0 },
    reviewNote: { type: String },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: { type: Date },
    submittedAt: { type: Date },
    publishedAt: { type: Date },
    scheduledAt: { type: Date },
    draftBuffer: { type: DraftBufferSchema },
    seo: { type: SEOSchema },
  },
  { timestamps: true }
);

// ── Auto-generate slug from title ────────────────────────────────────────────
ArticleSchema.pre<IArticle>("save", function () {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

// ── Indexes ──────────────────────────────────────────────────────────────────
ArticleSchema.index({ status: 1, publishedAt: -1 });
ArticleSchema.index({ category: 1, status: 1, publishedAt: -1 });
ArticleSchema.index({ author: 1, status: 1 });
ArticleSchema.index({ featured: 1, status: 1, publishedAt: -1 });
ArticleSchema.index({ slugHistory: 1 });

const Article: Model<IArticle> =
  mongoose.models.Article ?? mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
