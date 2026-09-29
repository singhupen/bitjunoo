/**
 * types/index.ts
 * Shared TypeScript types across the application.
 */

// ── Auth ─────────────────────────────────────────────────────────────────────
export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "author" | "viewer";
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: AuthUser;
    token: string;
  };
}

// ── Article ───────────────────────────────────────────────────────────────────
export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: {
    url: string;
    publicId: string;
    alt?: string;
  };
  author: Pick<AuthUser, "_id" | "name" | "email" | "avatar">;
  category: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  readTime?: number;
  views: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleListResponse {
  success: boolean;
  data: {
    articles: Article[];
    total: number;
    page: number;
    totalPages: number;
  };
}

// ── Category ──────────────────────────────────────────────────────────────────
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  articleCount: number;
  createdAt: string;
  updatedAt: string;
}

// ── Upload ────────────────────────────────────────────────────────────────────
export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

// ── API Response ──────────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}
