/**
 * models/Article.ts
 * Mongoose Article model — represents blog/editorial publications.
 * Supports draft, published, archived, and scheduled statuses.
 */

import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: {
    url: string;
    publicId: string;
    alt?: string;
  };
  author: Types.ObjectId;
  category: string;
  tags: string[];
  status: "draft" | "published" | "archived" | "scheduled";
  readTime?: number; // estimated minutes
  views: number;
  publishedAt?: Date;
  scheduledAt?: Date;  // when status is "scheduled"
  createdAt: Date;
  updatedAt: Date;
}

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
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
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
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    tags: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ["draft", "published", "archived", "scheduled"],
      default: "draft",
    },
    readTime: { type: Number },
    views: { type: Number, default: 0 },
    publishedAt: { type: Date },
    scheduledAt: { type: Date },
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
ArticleSchema.index({ author: 1, status: 1 });
ArticleSchema.index({ status: 1, createdAt: -1 });

const Article: Model<IArticle> =
  mongoose.models.Article ?? mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
