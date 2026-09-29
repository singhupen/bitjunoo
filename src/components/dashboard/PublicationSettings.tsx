"use client";

import { useState } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  Globe,
  Share2,
  Users,
  Rss,
  ShieldAlert,
  Bell,
  Sparkles,
} from "lucide-react";

export default function PublicationSettings() {
  const [blogTitle, setBlogTitle] = useState("BitJunoo Engineering Dispatch");
  const [tagline, setTagline] = useState("High-Velocity Software Architecture & Production Benchmarks");
  const [baseUrl, setBaseUrl] = useState("https://bitjunoo.com/blog");
  const [contactEmail, setContactEmail] = useState("editorial@bitjunoo.com");
  const [requireReview, setRequireReview] = useState(true);
  const [allowComments, setAllowComments] = useState(true);
  const [rssEnabled, setRssEnabled] = useState(true);
  const [gaId, setGaId] = useState("G-BITJUNOO2026");
  const [twitterHandle, setTwitterHandle] = useState("@bitjunoo");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2.5 animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Platform settings updated and deployed across edge nodes!</span>
        </div>
      )}

      {/* General Settings Card */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Globe className="w-4 h-4 text-royal-blue" />
          <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
            General Publication Configuration
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Publication Display Name
            </label>
            <input
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Base URL
            </label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-royal-blue"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Editorial Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Editorial Contact Email
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* SEO & Analytics Integrations Card */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Share2 className="w-4 h-4 text-purple" />
          <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
            SEO & Syndication Tracking
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Google Analytics 4 Measurement ID
            </label>
            <input
              type="text"
              value={gaId}
              onChange={(e) => setGaId(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Twitter / X Developer Handle
            </label>
            <input
              type="text"
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Editorial Governance & Workflows */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Users className="w-4 h-4 text-cyan-blue" />
          <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
            Governance & Publishing Workflows
          </h3>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <div className="text-xs font-bold text-slate-900">
                Mandatory Peer Architecture Review
              </div>
              <div className="text-[11px] text-slate-500">
                Require sign-off from at least one Principal Engineer before publishing to production.
              </div>
            </div>
            <input
              type="checkbox"
              checked={requireReview}
              onChange={(e) => setRequireReview(e.target.checked)}
              className="w-4 h-4 text-royal-blue rounded border-slate-300"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <div className="text-xs font-bold text-slate-900">
                Automate RSS 2.0 & Atom Feed Sync
              </div>
              <div className="text-[11px] text-slate-500">
                Automatically generate public XML feeds at /api/feed.xml on publication.
              </div>
            </div>
            <input
              type="checkbox"
              checked={rssEnabled}
              onChange={(e) => setRssEnabled(e.target.checked)}
              className="w-4 h-4 text-royal-blue rounded border-slate-300"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <div className="text-xs font-bold text-slate-900">
                Community Discussion Threads
              </div>
              <div className="text-[11px] text-slate-500">
                Allow verified developer comments with automated anti-spam filtering.
              </div>
            </div>
            <input
              type="checkbox"
              checked={allowComments}
              onChange={(e) => setAllowComments(e.target.checked)}
              className="w-4 h-4 text-royal-blue rounded border-slate-300"
            />
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-royal-blue to-purple text-white font-bold text-xs sm:text-sm shadow-md shadow-royal-blue/25 hover:shadow-lg transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
}
