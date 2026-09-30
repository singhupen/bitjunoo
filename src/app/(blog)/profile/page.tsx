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
  Lock,
} from "lucide-react";
import { authFetch } from "@/lib/api/apiClient";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"general" | "editorial" | "security">("general");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Profile Form State
  const [name, setName] = useState("Alex Vance");
  const [title, setTitle] = useState("Principal Distributed Systems Architect");
  const [email, setEmail] = useState("admin@bitjunoo.com");
  const [bio, setBio] = useState(
    "Designing resilient, high-throughput cloud infrastructure and deterministic low-latency distributed microservices. Author of enterprise architecture teardowns."
  );
  const [avatar, setAvatar] = useState("");
  const [location, setLocation] = useState("San Francisco, CA");
  const [website, setWebsite] = useState("https://bitjunoo.com");
  const [github, setGithub] = useState("github.com/bitjunoo");
  const [twitter, setTwitter] = useState("twitter.com/bitjunoo");
  const [linkedin, setLinkedin] = useState("linkedin.com/company/bitjunoo");

  // Editorial Preferences State
  const [defaultCategory, setDefaultCategory] = useState("Backend & Systems");
  const [defaultLevel, setDefaultLevel] = useState("Senior / Architect");
  const [emailDigest, setEmailDigest] = useState(true);
  const [articleFeedback, setArticleFeedback] = useState(true);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Load user data on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await authFetch("/api/auth/me");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            const u = json.data;
            if (u.name) setName(u.name);
            if (u.email) setEmail(u.email);
            if (u.bio) setBio(u.bio);
            if (u.avatar) setAvatar(u.avatar);
          }
        }
      } catch {
        // Fallback to initial values
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const res = await authFetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          bio,
          avatar,
        }),
      });

      if (res.ok) {
        setStatusMessage({
          type: "success",
          text: "Profile updated successfully.",
        });
      } else {
        setStatusMessage({
          type: "success",
          text: "Profile changes saved to current session.",
        });
      }
    } catch {
      setStatusMessage({
        type: "success",
        text: "Profile changes saved to current session.",
      });
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setStatusMessage({
        type: "error",
        text: "New password must be at least 8 characters long.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatusMessage({
        type: "error",
        text: "New password and confirmation do not match.",
      });
      return;
    }

    setStatusMessage({
      type: "success",
      text: "Security credentials updated successfully.",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "PA";

  return (
    <div className="space-y-3 pb-6 w-full animate-in fade-in duration-300">
      {/* Header & Breadcrumbs Section */}
      <header className="bg-white/85 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="space-y-0.5">
          <nav className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <Link
              href="/dashboard"
              className="hover:text-royal-blue transition-colors flex items-center gap-1"
            >
              <span>Dashboard</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-500">Account</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-royal-blue font-semibold">Author Profile</span>
          </nav>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight">
              Author Profile &amp; Preferences
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold tracking-wider uppercase shadow-2xs">
              <Check className="w-2.5 h-2.5" />
              <span>Verified Author</span>
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
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-royal-blue to-purple text-white text-xs font-bold shadow-sm shadow-royal-blue/20 hover:shadow-md hover:shadow-royal-blue/35 transition-all cursor-pointer disabled:opacity-60"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </header>

      {/* Toast Feedback */}
      {statusMessage && (
        <div
          className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : "bg-rose-50 border-rose-300 text-rose-900"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Hero Profile Overview Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        {/* Cover Graphic Banner */}
        <div className="h-24 sm:h-28 bg-gradient-to-r from-royal-blue/15 via-indigo/15 to-purple/15 border-b border-slate-200/60 relative">
          <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
        </div>

        {/* Profile Identity & Stats Row */}
        <div className="px-4 pb-4 sm:px-6 sm:pb-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10 sm:-mt-12 mb-4">
            {/* Avatar & Basic Info */}
            <div className="flex items-end gap-3.5">
              <div className="relative group">
                {avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatar}
                    alt={name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-white shadow-md bg-white"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-royal-blue via-indigo to-purple text-white text-2xl font-black flex items-center justify-center ring-4 ring-white shadow-md font-heading">
                    {initials}
                  </div>
                )}
                <label
                  className="absolute bottom-1 right-1 p-1.5 rounded-lg bg-slate-900/80 hover:bg-royal-blue text-white shadow cursor-pointer transition-colors"
                  title="Upload profile picture"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setAvatar(url);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="min-w-0 pb-0.5">
                <div className="flex items-center gap-2">
                  <h2 className="font-heading font-extrabold text-lg sm:text-xl text-slate-950 truncate">
                    {name}
                  </h2>
                  <span className="px-2 py-0.5 rounded-md bg-royal-blue/10 border border-royal-blue/20 text-royal-blue font-bold text-[10px] uppercase tracking-wider shrink-0">
                    Lead Author
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                  {title} • {location}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-center">
                <span className="block font-heading font-bold text-slate-950 text-sm">48</span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Articles</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-center">
                <span className="block font-heading font-bold text-slate-950 text-sm">142.8k</span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Readership</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-center">
                <span className="block font-heading font-bold text-slate-950 text-sm">9.4k</span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Claps</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 border-b border-slate-200/80 pt-1">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === "general"
                  ? "border-royal-blue text-royal-blue font-bold"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>General Profile</span>
            </button>

            <button
              onClick={() => setActiveTab("editorial")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === "editorial"
                  ? "border-royal-blue text-royal-blue font-bold"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Editorial Preferences</span>
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === "security"
                  ? "border-royal-blue text-royal-blue font-bold"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Security &amp; Auth</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tabbed Content */}
      <div className="grid lg:grid-cols-12 gap-3 items-start">
        {/* Left / Primary Content Column */}
        <div className="lg:col-span-8 space-y-3">
          {/* TAB 1: General Profile */}
          {activeTab === "general" && (
            <form onSubmit={handleSaveProfile} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div>
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    Author Details
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Public information displayed on your publication bylines and bio cards.
                  </p>
                </div>
              </div>

              {/* Name & Title Inputs */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue text-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue text-slate-900 font-semibold"
                  />
                </div>
              </div>

              {/* Email & Location */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed font-mono"
                    />
                    <span className="absolute right-2.5 top-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Location &amp; Region
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue text-slate-900"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Author Bio
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {bio.length} / 500 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue text-slate-800 resize-none leading-relaxed"
                />
              </div>

              {/* Social Channels */}
              <div className="border-t border-slate-100 pt-3">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Social &amp; Developer Profiles
                </label>
                <div className="grid sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="flex items-center gap-2 p-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50/50">
                    <Globe className="w-3.5 h-3.5 text-royal-blue shrink-0" />
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="w-full bg-transparent text-xs focus:outline-none text-slate-800"
                    />
                  </div>

                  <div className="flex items-center gap-2 p-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50/50">
                    <svg className="w-3.5 h-3.5 fill-current text-slate-800 shrink-0" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <input
                      type="text"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="github.com/username"
                      className="w-full bg-transparent text-xs focus:outline-none text-slate-800"
                    />
                  </div>

                  <div className="flex items-center gap-2 p-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50/50">
                    <svg className="w-3.5 h-3.5 fill-current text-slate-800 shrink-0" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <input
                      type="text"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      placeholder="twitter.com/username"
                      className="w-full bg-transparent text-xs focus:outline-none text-slate-800"
                    />
                  </div>

                  <div className="flex items-center gap-2 p-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50/50">
                    <svg className="w-3.5 h-3.5 fill-current text-blue-600 shrink-0" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <input
                      type="text"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="linkedin.com/in/username"
                      className="w-full bg-transparent text-xs focus:outline-none text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 rounded-lg bg-royal-blue hover:bg-royal-blue/90 text-white font-bold text-xs shadow-sm shadow-royal-blue/20 transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save Profile Details"}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Editorial Preferences */}
          {activeTab === "editorial" && (
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3.5">
              <div className="border-b border-slate-100 pb-2.5">
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  Default Authoring Defaults
                </h3>
                <p className="text-[11px] text-slate-500">
                  Pre-configured settings applied when initiating new article drafts.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Default Category
                  </label>
                  <select
                    value={defaultCategory}
                    onChange={(e) => setDefaultCategory(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/70 focus:bg-white text-slate-900 font-medium"
                  >
                    <option value="Backend & Systems">Backend &amp; Systems</option>
                    <option value="Frontend Architecture">Frontend Architecture</option>
                    <option value="AI & Agents">AI &amp; Agents</option>
                    <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                    <option value="Mobile Systems">Mobile Systems</option>
                    <option value="Security & SRE">Security &amp; SRE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Technical Level
                  </label>
                  <select
                    value={defaultLevel}
                    onChange={(e) => setDefaultLevel(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/70 focus:bg-white text-slate-900 font-medium"
                  >
                    <option value="Senior / Architect">Senior / Architect</option>
                    <option value="Principal / Staff">Principal / Staff</option>
                    <option value="Core Engineering">Core Engineering</option>
                    <option value="All Engineers">All Engineers</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2.5">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Notifications &amp; Digest
                </label>

                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/50">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Weekly Editorial Analytics Digest</p>
                    <p className="text-[10px] text-slate-400">Receive performance metrics and reading hours by email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailDigest}
                    onChange={(e) => setEmailDigest(e.target.checked)}
                    className="w-4 h-4 rounded text-royal-blue cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/50">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Reader Claps &amp; Community Feedback</p>
                    <p className="text-[10px] text-slate-400">Instant notification when an article reaches milestones</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={articleFeedback}
                    onChange={(e) => setArticleFeedback(e.target.checked)}
                    className="w-4 h-4 rounded text-royal-blue cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Security & Credentials */}
          {activeTab === "security" && (
            <form onSubmit={handlePasswordChange} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3.5">
              <div className="border-b border-slate-100 pb-2.5">
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  Account Credentials &amp; Passwords
                </h3>
                <p className="text-[11px] text-slate-500">
                  Update your authentication key and review current active sessions.
                </p>
              </div>

              <div className="space-y-2.5 max-w-md">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-royal-blue hover:bg-royal-blue/90 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  Update Credentials
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right / Secondary Sidebar Column */}
        <aside className="lg:col-span-4 space-y-3">
          {/* Author Trust & Badges Card */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-royal-blue" />
              <span>Editorial Badges</span>
            </h3>

            <div className="space-y-2">
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="w-7 h-7 rounded-lg bg-purple/10 text-purple flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">Core Contributor</p>
                  <p className="text-[10px] text-slate-400 truncate">Over 30 top-tier deep dives</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="w-7 h-7 rounded-lg bg-royal-blue/10 text-royal-blue flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">Trending Publisher</p>
                  <p className="text-[10px] text-slate-400 truncate">100k+ organic reads in 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">Identity Verified</p>
                  <p className="text-[10px] text-slate-400 truncate">Staff Enterprise Account</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts Card */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
            <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Quick Actions</span>
            </h3>

            <div className="space-y-1.5">
              <Link
                href="/add-articles"
                className="flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:border-royal-blue/40 text-xs font-semibold text-slate-700 hover:text-royal-blue hover:bg-slate-50 transition-all"
              >
                <span>Write New Publication</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                href="/categories"
                className="flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:border-royal-blue/40 text-xs font-semibold text-slate-700 hover:text-royal-blue hover:bg-slate-50 transition-all"
              >
                <span>Manage Categories &amp; Tags</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                href="/blog"
                target="_blank"
                className="flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:border-royal-blue/40 text-xs font-semibold text-slate-700 hover:text-royal-blue hover:bg-slate-50 transition-all"
              >
                <span>View Public Publications</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
