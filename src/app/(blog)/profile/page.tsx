"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Shield,
  Key,
  Globe,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Save,
  Camera,
  ChevronRight,
  BookOpen,
  TrendingUp,
  Award,
  Layers,
  Sliders,
  Check,
  Eye,
  EyeOff,
  MapPin,
  FileText,
  Lock,
} from "lucide-react";
import { authFetch } from "@/lib/api/apiClient";

// ── Social Link Icons (inline SVGs) ─────────────────────────────────────────

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function DevToIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 448 512" fill="currentColor">
      <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z" />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  headline: string;
  location: string;
  role: string;
  socialLinks: {
    website: string;
    github: string;
    twitter: string;
    linkedin: string;
    devto: string;
    hashnode: string;
  };
  defaultCategory: string;
  defaultLevel: string;
  emailDigest: boolean;
  articleFeedback: boolean;
}

const defaultProfile: ProfileData = {
  name: "",
  email: "",
  bio: "",
  avatar: "",
  headline: "",
  location: "",
  role: "author",
  socialLinks: { website: "", github: "", twitter: "", linkedin: "", devto: "", hashnode: "" },
  defaultCategory: "Backend & Systems",
  defaultLevel: "Senior / Architect",
  emailDigest: true,
  articleFeedback: true,
};

// ── Input Component ───────────────────────────────────────────────────────────

function ProfileInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
  badge,
  icon,
  monospace,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  badge?: string;
  icon?: React.ReactNode;
  monospace?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full py-2 text-xs rounded-lg border transition-all ${icon ? "pl-9 pr-3" : "px-3"} ${
            disabled
              ? "border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
              : "border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue text-slate-900"
          } ${monospace ? "font-mono" : "font-medium"}`}
        />
        {badge && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Social Link Row ───────────────────────────────────────────────────────────

function SocialLinkRow({
  icon,
  platform,
  value,
  onChange,
  placeholder,
  iconBg = "bg-slate-100 text-slate-600",
}: {
  icon: React.ReactNode;
  platform: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  iconBg?: string;
}) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 bg-white hover:border-royal-blue/30 transition-colors group">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{platform}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-xs text-slate-700 focus:outline-none placeholder:text-slate-300 font-medium block"
        />
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"general" | "social" | "editorial" | "security">("general");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [articleStats, setArticleStats] = useState({ total: 0, published: 0, drafts: 0 });

  // Security form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  // Helpers to update nested socialLinks
  const setSocialLink = (key: keyof ProfileData["socialLinks"], val: string) =>
    setProfile((p) => ({ ...p, socialLinks: { ...p.socialLinks, [key]: val } }));

  const setField = <K extends keyof ProfileData>(key: K, val: ProfileData[K]) =>
    setProfile((p) => ({ ...p, [key]: val }));

  // ── Load profile ───────────────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const [profileRes, statsRes] = await Promise.all([
          authFetch("/api/auth/me"),
          authFetch("/api/articles/stats"),
        ]);

        if (profileRes.ok) {
          const json = await profileRes.json();
          const u = json.data ?? {};
          setProfile({
            name: u.name ?? "",
            email: u.email ?? "",
            bio: u.bio ?? "",
            avatar: u.avatar ?? "",
            headline: u.headline ?? "",
            location: u.location ?? "",
            role: u.role ?? "author",
            socialLinks: {
              website: u.socialLinks?.website ?? "",
              github: u.socialLinks?.github ?? "",
              twitter: u.socialLinks?.twitter ?? "",
              linkedin: u.socialLinks?.linkedin ?? "",
              devto: u.socialLinks?.devto ?? "",
              hashnode: u.socialLinks?.hashnode ?? "",
            },
            defaultCategory: u.defaultCategory ?? "Backend & Systems",
            defaultLevel: u.defaultLevel ?? "Senior / Architect",
            emailDigest: u.emailDigest ?? true,
            articleFeedback: u.articleFeedback ?? true,
          });
        }

        if (statsRes.ok) {
          const json = await statsRes.json();
          const s = json.data ?? {};
          setArticleStats({ total: s.total ?? 0, published: s.published ?? 0, drafts: s.drafts ?? 0 });
        }
      } catch {
        // Silently fall back to defaults
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // ── Save profile ───────────────────────────────────────────────────────────
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await authFetch("/api/auth/me", {
        method: "PATCH",
        body: JSON.stringify({
          name: profile.name,
          bio: profile.bio,
          avatar: profile.avatar,
          headline: profile.headline,
          location: profile.location,
          socialLinks: profile.socialLinks,
          defaultCategory: profile.defaultCategory,
          defaultLevel: profile.defaultLevel,
          emailDigest: profile.emailDigest,
          articleFeedback: profile.articleFeedback,
        }),
      });
      if (res.ok) {
        showStatus("success", "Profile updated successfully.");
      } else {
        const json = await res.json().catch(() => ({}));
        showStatus("error", json.message ?? "Failed to update profile.");
      }
    } catch {
      showStatus("error", "Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Change password ────────────────────────────────────────────────────────
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      return showStatus("error", "New password must be at least 8 characters.");
    }
    if (newPassword !== confirmPassword) {
      return showStatus("error", "Passwords do not match.");
    }
    setIsSaving(true);
    try {
      const res = await authFetch("/api/auth/me", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (res.ok) {
        showStatus("success", "Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const json = await res.json().catch(() => ({}));
        showStatus("error", json.message ?? "Failed to change password.");
      }
    } catch {
      showStatus("error", "Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const initials = profile.name
    ? profile.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
    : "PA";

  const TABS = [
    { key: "general", label: "General", icon: <User className="w-3.5 h-3.5" /> },
    { key: "social", label: "Social & Dev", icon: <Globe className="w-3.5 h-3.5" /> },
    { key: "editorial", label: "Editorial", icon: <Sliders className="w-3.5 h-3.5" /> },
    { key: "security", label: "Security", icon: <Shield className="w-3.5 h-3.5" /> },
  ] as const;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="w-7 h-7 border-2 border-royal-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-6 w-full animate-in fade-in duration-300">
      {/* Header */}
      <header className="bg-white/85 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="space-y-0.5">
          <nav className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <Link href="/dashboard" className="hover:text-royal-blue transition-colors">Dashboard</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-500">Account</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-royal-blue font-semibold">Author Profile</span>
          </nav>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight">
              Author Profile &amp; Preferences
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase">
              <Check className="w-2.5 h-2.5" />
              Verified Author
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>My Articles</span>
          </Link>
          <button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-royal-blue to-purple text-white text-xs font-bold shadow-sm hover:opacity-95 transition-all cursor-pointer disabled:opacity-60"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </header>

      {/* Status Toast */}
      {statusMessage && (
        <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm ${
          statusMessage.type === "success"
            ? "bg-emerald-50 border-emerald-300 text-emerald-900"
            : "bg-rose-50 border-rose-300 text-rose-900"
        }`}>
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Profile Hero Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        {/* Cover Banner */}
        <div className="h-24 bg-gradient-to-r from-royal-blue/20 via-indigo/15 to-purple/20 border-b border-slate-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10" />
        </div>

        <div className="px-5 pb-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10 mb-4">
            {/* Avatar & Info */}
            <div className="flex items-end gap-4">
              <div className="relative group shrink-0">
                {profile.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-royal-blue via-indigo to-purple text-white text-2xl font-black flex items-center justify-center ring-4 ring-white shadow-lg font-heading">
                    {initials}
                  </div>
                )}
                <label className="absolute bottom-1 right-1 p-1.5 rounded-lg bg-slate-900/75 hover:bg-royal-blue text-white shadow cursor-pointer transition-colors">
                  <Camera className="w-3.5 h-3.5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setField("avatar", URL.createObjectURL(file));
                    }}
                  />
                </label>
              </div>

              <div className="min-w-0 pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-heading font-extrabold text-lg text-slate-950 truncate">
                    {profile.name || "Your Name"}
                  </h2>
                  <span className="px-2 py-0.5 rounded-md bg-royal-blue/10 border border-royal-blue/20 text-royal-blue font-bold text-[10px] uppercase tracking-wider shrink-0">
                    {profile.role}
                  </span>
                </div>
                {profile.headline && (
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{profile.headline}</p>
                )}
                {profile.location && (
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {profile.location}
                  </p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              {[
                { label: "Articles", value: articleStats.total },
                { label: "Published", value: articleStats.published },
                { label: "Drafts", value: articleStats.drafts },
              ].map((s) => (
                <div key={s.label} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[56px]">
                  <span className="block font-heading font-black text-slate-950 text-sm">{s.value}</span>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-0.5 border-b border-slate-200 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.key
                    ? "border-royal-blue text-royal-blue font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="grid lg:grid-cols-12 gap-3 items-start">
        <div className="lg:col-span-8 space-y-3">

          {/* ── TAB: General ─────────────────────────────────────────────── */}
          {activeTab === "general" && (
            <form onSubmit={handleSaveProfile} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-heading font-bold text-sm text-slate-900">Author Details</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Public information shown on your bylines and profile cards.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <ProfileInput
                  label="Display Name"
                  value={profile.name}
                  onChange={(v) => setField("name", v)}
                  placeholder="Your full name"
                />
                <ProfileInput
                  label="Professional Headline"
                  value={profile.headline}
                  onChange={(v) => setField("headline", v)}
                  placeholder="e.g. Principal Systems Architect"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <ProfileInput
                  label="Primary Email"
                  value={profile.email}
                  disabled
                  badge="Verified"
                  monospace
                  icon={<Mail className="w-3.5 h-3.5" />}
                />
                <ProfileInput
                  label="Location & Region"
                  value={profile.location}
                  onChange={(v) => setField("location", v)}
                  placeholder="e.g. San Francisco, CA"
                  icon={<MapPin className="w-3.5 h-3.5" />}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Author Bio</label>
                  <span className="text-[10px] font-mono text-slate-400">{profile.bio.length} / 500</span>
                </div>
                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setField("bio", e.target.value)}
                  maxLength={500}
                  placeholder="Write a concise professional bio that appears on your article bylines..."
                  className="w-full p-3 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue text-slate-800 resize-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-lg bg-royal-blue hover:bg-royal-blue/90 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save General Info"}
                </button>
              </div>
            </form>
          )}

          {/* ── TAB: Social & Developer Profiles ──────────────────────────── */}
          {activeTab === "social" && (
            <form onSubmit={handleSaveProfile} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-heading font-bold text-sm text-slate-900">Social &amp; Developer Profiles</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Connect your social accounts and developer community profiles.</p>
              </div>

              <div className="space-y-2.5">
                <SocialLinkRow
                  icon={<Globe className="w-4 h-4" />}
                  platform="Personal Website"
                  value={profile.socialLinks.website}
                  onChange={(v) => setSocialLink("website", v)}
                  placeholder="https://yourwebsite.com"
                  iconBg="bg-blue-50 text-blue-600"
                />
                <SocialLinkRow
                  icon={<GitHubIcon className="w-4 h-4" />}
                  platform="GitHub"
                  value={profile.socialLinks.github}
                  onChange={(v) => setSocialLink("github", v)}
                  placeholder="github.com/username"
                  iconBg="bg-slate-900 text-white"
                />
                <SocialLinkRow
                  icon={<XIcon className="w-4 h-4" />}
                  platform="X / Twitter"
                  value={profile.socialLinks.twitter}
                  onChange={(v) => setSocialLink("twitter", v)}
                  placeholder="twitter.com/username"
                  iconBg="bg-slate-900 text-white"
                />
                <SocialLinkRow
                  icon={<LinkedInIcon className="w-4 h-4" />}
                  platform="LinkedIn"
                  value={profile.socialLinks.linkedin}
                  onChange={(v) => setSocialLink("linkedin", v)}
                  placeholder="linkedin.com/in/username"
                  iconBg="bg-blue-600 text-white"
                />
                <SocialLinkRow
                  icon={<DevToIcon className="w-4 h-4" />}
                  platform="DEV.to"
                  value={profile.socialLinks.devto}
                  onChange={(v) => setSocialLink("devto", v)}
                  placeholder="dev.to/username"
                  iconBg="bg-slate-800 text-white"
                />
                <SocialLinkRow
                  icon={
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 111 128">
                      <path d="M38.65 39.78C17.15 40.75.16 58.73.16 80.48c0 22.39 18.09 40.52 40.44 40.52 11.38 0 21.67-4.68 29.11-12.22l-.22-.25c-3.61-4.09-5.79-9.48-5.79-15.38 0-12.81 10.37-23.18 23.18-23.18 1.99 0 3.92.27 5.76.76-.98-26.17-22.63-47.23-49.04-47.23-.98 0-1.95.03-2.92.08-.69.04-1.38.1-2.03.2z" />
                      <path d="M87.88 70.95c-12.81 0-23.18 10.37-23.18 23.18 0 12.81 10.37 23.18 23.18 23.18 12.81 0 23.18-10.37 23.18-23.18 0-12.81-10.37-23.18-23.18-23.18z" />
                    </svg>
                  }
                  platform="Hashnode"
                  value={profile.socialLinks.hashnode}
                  onChange={(v) => setSocialLink("hashnode", v)}
                  placeholder="hashnode.com/@username"
                  iconBg="bg-blue-600 text-white"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-lg bg-royal-blue hover:bg-royal-blue/90 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save Social Links"}
                </button>
              </div>
            </form>
          )}

          {/* ── TAB: Editorial Preferences ────────────────────────────────── */}
          {activeTab === "editorial" && (
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-heading font-bold text-sm text-slate-900">Editorial Preferences</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Pre-configured defaults applied when creating new article drafts.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Default Category
                  </label>
                  <select
                    value={profile.defaultCategory}
                    onChange={(e) => setField("defaultCategory", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50/70 focus:bg-white text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-royal-blue/20"
                  >
                    {["Backend & Systems", "Frontend Architecture", "AI & Agents", "Cloud & DevOps", "Mobile Systems", "Security & SRE"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Technical Level
                  </label>
                  <select
                    value={profile.defaultLevel}
                    onChange={(e) => setField("defaultLevel", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50/70 focus:bg-white text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-royal-blue/20"
                  >
                    {["Senior / Architect", "Principal / Staff", "Core Engineering", "All Engineers"].map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2.5">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Notifications &amp; Digest
                </label>

                {[
                  {
                    key: "emailDigest" as const,
                    title: "Weekly Editorial Analytics Digest",
                    desc: "Receive performance metrics and reading hours by email",
                  },
                  {
                    key: "articleFeedback" as const,
                    title: "Reader Feedback & Milestone Alerts",
                    desc: "Instant notification when an article reaches engagement milestones",
                  },
                ].map((pref) => (
                  <div
                    key={pref.key}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 cursor-pointer hover:border-royal-blue/30 transition-colors"
                    onClick={() => setField(pref.key, !profile[pref.key])}
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-800">{pref.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{pref.desc}</p>
                    </div>
                    <div className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${profile[pref.key] ? "bg-royal-blue" : "bg-slate-200"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${profile[pref.key] ? "translate-x-4" : "translate-x-0.5"}`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="px-5 py-2 rounded-lg bg-royal-blue hover:bg-royal-blue/90 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save Preferences"}
                </button>
              </div>
            </div>
          )}

          {/* ── TAB: Security ─────────────────────────────────────────────── */}
          {activeTab === "security" && (
            <form onSubmit={handlePasswordChange} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-heading font-bold text-sm text-slate-900">Account Credentials</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Update your authentication password. Minimum 8 characters.</p>
              </div>

              <div className="space-y-3 max-w-md">
                {[
                  { label: "Current Password", value: currentPassword, setter: setCurrentPassword, placeholder: "Enter current password" },
                  { label: "New Password", value: newPassword, setter: setNewPassword, placeholder: "At least 8 characters" },
                  { label: "Confirm New Password", value: confirmPassword, setter: setConfirmPassword, placeholder: "Repeat new password" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {field.label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type={showPasswords ? "text" : "password"}
                        required
                        value={field.value}
                        onChange={(e) => field.setter(e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full pl-9 pr-10 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue text-slate-900"
                      />
                      {field.label === "Confirm New Password" && (
                        <button
                          type="button"
                          onClick={() => setShowPasswords(!showPasswords)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Password strength indicator */}
              {newPassword && (
                <div className="max-w-md">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          newPassword.length >= i * 3
                            ? i <= 2 ? "bg-amber-400" : "bg-emerald-400"
                            : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {newPassword.length < 8 ? "Too short" : newPassword.length < 12 ? "Moderate" : "Strong password"}
                  </p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-lg bg-royal-blue hover:bg-royal-blue/90 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 space-y-3">
          {/* Avatar URL override */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-slate-500" />
              <span>Profile Photo</span>
            </h3>
            <div className="space-y-2">
              <ProfileInput
                label="Avatar URL"
                value={profile.avatar}
                onChange={(v) => setField("avatar", v)}
                placeholder="https://example.com/avatar.jpg"
                monospace
              />
              <p className="text-[10px] text-slate-400">Or use the camera icon on your avatar to upload a file. URL changes are saved with your profile.</p>
            </div>
          </div>

          {/* Editorial Badges */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-royal-blue" />
              <span>Editorial Badges</span>
            </h3>
            <div className="space-y-2">
              {[
                {
                  icon: <Sparkles className="w-3.5 h-3.5" />,
                  bg: "bg-purple/10 text-purple",
                  title: "Core Contributor",
                  desc: "Verified author account",
                  earned: true,
                },
                {
                  icon: <TrendingUp className="w-3.5 h-3.5" />,
                  bg: "bg-royal-blue/10 text-royal-blue",
                  title: "Active Publisher",
                  desc: `${articleStats.published} articles published`,
                  earned: articleStats.published > 0,
                },
                {
                  icon: <FileText className="w-3.5 h-3.5" />,
                  bg: "bg-amber-100 text-amber-700",
                  title: "Prolific Writer",
                  desc: "10+ total articles",
                  earned: articleStats.total >= 10,
                },
              ].map((badge) => (
                <div
                  key={badge.title}
                  className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${
                    badge.earned
                      ? "bg-slate-50 border-slate-200/80"
                      : "bg-slate-50/30 border-slate-100 opacity-50"
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${badge.bg}`}>
                    {badge.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{badge.title}</p>
                    <p className="text-[10px] text-slate-400 truncate">{badge.desc}</p>
                  </div>
                  {badge.earned && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-auto" />}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
            <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Quick Actions</span>
            </h3>
            <div className="space-y-1.5">
              {[
                { href: "/add-articles", label: "Write New Publication" },
                { href: "/articles", label: "View My Articles" },
                { href: "/categories", label: "Manage Categories" },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:border-royal-blue/40 text-xs font-semibold text-slate-700 hover:text-royal-blue hover:bg-slate-50 transition-all"
                >
                  <span>{action.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
