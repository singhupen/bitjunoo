/**
 * types/index.ts
 * Shared TypeScript types across the application.
 */

// ── Auth ─────────────────────────────────────────────────────────────────────
export interface UserPermissions {
  canPost: boolean;
  canPublish: boolean;
  canManageCategories: boolean;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "author" | "viewer";
  accountStatus: "pending" | "active" | "suspended";
  permissions: UserPermissions;
  approvedBy?: string;
  approvedAt?: string;
  tokenVersion?: number;
  lastLoginAt?: string;
  avatar?: string;
  bio?: string;
  headline?: string;
  location?: string;
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
export interface ArticleAuthor {
  _id: string;
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  headline?: string;
}

export interface ArticleCoverImage {
  url: string;
  publicId: string;
  alt?: string;
}

export interface ArticleSEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  slugHistory?: string[];
  excerpt: string;
  content: string;
  coverImage?: ArticleCoverImage;
  author: ArticleAuthor;
  lastEditedBy?: string;
  category: string;
  tags: string[];
  status: "draft" | "in_review" | "published" | "archived" | "scheduled";
  featured?: boolean;
  level?: string;
  readTime?: number;
  views: number;
  reviewNote?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  submittedAt?: string;
  publishedAt?: string;
  scheduledAt?: string;
  seo?: ArticleSEO;
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

// ── Contact / Resend ──────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    emailId?: string;
  };
}
