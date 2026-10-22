/**
 * models/User.ts
 * Mongoose User model — handles admin / author accounts.
 * Extended with account status, granular permissions, and approval audit.
 */

import mongoose, { Document, Model, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";

export interface ISocialLinks {
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  devto?: string;
  hashnode?: string;
}

export interface IUserPermissions {
  canPost: boolean;
  canPublish: boolean;
  canManageCategories: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "author" | "viewer";
  accountStatus: "pending" | "active" | "suspended";
  permissions: IUserPermissions;
  approvedBy?: Types.ObjectId;
  approvedAt?: Date;
  tokenVersion: number;
  lastLoginAt?: Date;
  avatar?: string;
  bio?: string;
  headline?: string;       // Professional headline/title
  location?: string;       // City, Country
  socialLinks?: ISocialLinks;
  defaultCategory?: string;
  defaultLevel?: string;
  emailDigest?: boolean;
  articleFeedback?: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const SocialLinksSchema = new Schema<ISocialLinks>(
  {
    website: { type: String, trim: true },
    github: { type: String, trim: true },
    twitter: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    youtube: { type: String, trim: true },
    devto: { type: String, trim: true },
    hashnode: { type: String, trim: true },
  },
  { _id: false }
);

const UserPermissionsSchema = new Schema<IUserPermissions>(
  {
    canPost: { type: Boolean, default: false },
    canPublish: { type: Boolean, default: false },
    canManageCategories: { type: Boolean, default: false },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Never returned by default in queries
    },
    role: {
      type: String,
      enum: ["admin", "author", "viewer"],
      default: "author",
    },
    accountStatus: {
      type: String,
      enum: ["pending", "active", "suspended"],
      default: "pending",
    },
    permissions: {
      type: UserPermissionsSchema,
      default: () => ({
        canPost: false,
        canPublish: false,
        canManageCategories: false,
      }),
    },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    approvedAt: { type: Date },
    tokenVersion: { type: Number, default: 0 },
    lastLoginAt: { type: Date },
    avatar: { type: String },
    bio: { type: String, maxlength: [500, "Bio cannot exceed 500 characters"] },
    headline: { type: String, maxlength: [200, "Headline cannot exceed 200 characters"], trim: true },
    location: { type: String, maxlength: [100, "Location cannot exceed 100 characters"], trim: true },
    socialLinks: { type: SocialLinksSchema, default: {} },
    defaultCategory: { type: String, default: "Backend & Systems" },
    defaultLevel: { type: String, default: "Senior / Architect" },
    emailDigest: { type: Boolean, default: true },
    articleFeedback: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      // Strip sensitive fields when serializing
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.password = undefined;
        return ret;
      },
    },
  }
);

// ── Indexes ──────────────────────────────────────────────────────────────────
UserSchema.index({ accountStatus: 1, role: 1 });

// ── Pre-save: hash password ──────────────────────────────────────────────────
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// ── Instance method: compare passwords ──────────────────────────────────────
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);

export default User;
