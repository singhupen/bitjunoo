"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/api/apiClient";
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  User,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Send,
  Edit2,
} from "lucide-react";

interface ReviewItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  readTime?: number;
  submittedAt?: string;
  createdAt: string;
  author: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    headline?: string;
  };
}

export default function ReviewQueueManager() {
  const [queue, setQueue] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRejectId, setActiveRejectId] = useState<string | null>(null);
  const [rejectNote, setRejectNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const fetchQueue = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authFetch("/api/articles/review");
      if (!res.ok) throw new Error("Failed to fetch editorial review queue.");
      const json = await res.json();
      setQueue(json.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load queue.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  const handleApprove = async (id: string, title: string) => {
    if (!confirm(`Approve and publish "${title}" live to the BitJunoo blog?`)) return;

    setIsProcessing(true);
    try {
      const res = await authFetch(`/api/articles/${id}/approve`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Approval failed.");

      setToast(`Published "${title}" live to blog!`);
      setTimeout(() => setToast(null), 3000);
      await fetchQueue();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error approving article.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRejectId) return;

    setIsProcessing(true);
    try {
      const res = await authFetch(`/api/articles/${activeRejectId}/reject`, {
        method: "POST",
        body: JSON.stringify({ note: rejectNote }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Rejection failed.");

      setToast("Feedback sent and article returned to author draft.");
      setTimeout(() => setToast(null), 3000);
      setActiveRejectId(null);
      setRejectNote("");
      await fetchQueue();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error rejecting article.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Overview Stat Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
              Submissions Awaiting Review
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Review draft technical quality, verify code snippets, and approve for live release.
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="font-heading text-2xl font-extrabold text-purple-600 dark:text-purple-400">
            {queue.length}
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Pending Publications
          </div>
        </div>
      </div>

      {/* Main List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
        {isLoading && (
          <div className="py-16 text-center">
            <RefreshCw className="w-6 h-6 animate-spin text-royal-blue mx-auto mb-2" />
            <p className="text-xs text-slate-400">Loading review pipeline...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="p-8 text-center text-rose-600 text-xs font-semibold">
            <AlertCircle className="w-5 h-5 mx-auto mb-2" />
            <span>{error}</span>
          </div>
        )}

        {!isLoading && !error && queue.length === 0 && (
          <div className="py-16 text-center text-slate-400">
            <CheckCircle2 className="w-10 h-10 text-emerald-500/40 mx-auto mb-2" />
            <h4 className="font-heading font-bold text-base text-slate-800 dark:text-slate-200">
              Review Queue is Empty!
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              All submitted engineering articles have been reviewed and published.
            </p>
          </div>
        )}

        {!isLoading && !error && queue.length > 0 && (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {queue.map((item) => (
              <div key={item._id} className="p-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1 max-w-3xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-400">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Submitted {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : "Recently"}</span>
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                      {item.excerpt}
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-xs text-slate-500 font-medium">
                      <div className="w-5 h-5 rounded-full bg-royal-blue text-white flex items-center justify-center font-bold text-[10px]">
                        {item.author?.name ? item.author.name.slice(0, 1).toUpperCase() : "A"}
                      </div>
                      <span>By {item.author?.name || "Author"} ({item.author?.email})</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/add-articles?edit=${item._id}`}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Inspect / Edit</span>
                    </Link>

                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => setActiveRejectId(item._id)}
                      className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Reject with Note
                    </button>

                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => handleApprove(item._id, item.title)}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold text-xs shadow-sm shadow-emerald-600/25 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve &amp; Publish</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {activeRejectId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 max-w-lg w-full space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>Return Submission with Feedback</span>
              </h3>
              <button
                onClick={() => setActiveRejectId(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Provide constructive feedback to the author explaining what modifications are needed before publication. The article will be returned to their draft workspace.
            </p>

            <form onSubmit={handleReject} className="space-y-4">
              <textarea
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
                required
                rows={4}
                placeholder="e.g. Please clarify the benchmark reproduction steps in Section 3 and provide concrete RPS metrics..."
                className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-blue/30 leading-relaxed"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveRejectId(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isProcessing || !rejectNote.trim()}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 disabled:opacity-50"
                >
                  {isProcessing ? "Sending..." : "Confirm Rejection"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
