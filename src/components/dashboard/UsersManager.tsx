"use client";

import { useState, useEffect, useCallback } from "react";
import { authFetch } from "@/lib/api/apiClient";
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  Shield,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
  RefreshCw,
  AlertCircle,
  Filter,
  Check,
  X,
} from "lucide-react";

interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "author" | "viewer";
  accountStatus: "pending" | "active" | "suspended";
  permissions: {
    canPost: boolean;
    canPublish: boolean;
    canManageCategories: boolean;
  };
  approvedBy?: { name?: string; email?: string };
  approvedAt?: string;
  lastLoginAt?: string;
  createdAt: string;
}

export default function UsersManager() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, active: 0, suspended: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "50" });
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (search) params.set("search", search);

      const res = await authFetch(`/api/admin/users?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch users.");
      const json = await res.json();
      setUsers(json.data?.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load user list.");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, search]);

  const fetchStats = async () => {
    try {
      const res = await authFetch("/api/admin/users/stats");
      if (res.ok) {
        const json = await res.json();
        setStats(json.data || stats);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [fetchUsers]);

  const handleUpdate = async (userId: string, updates: Record<string, unknown>, successMessage: string) => {
    setUpdatingId(userId);
    try {
      const res = await authFetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(updates),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to update user.");

      setSuccessToast(successMessage);
      setTimeout(() => setSuccessToast(null), 3000);
      await fetchUsers();
      await fetchStats();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleApprove = (user: UserItem) => {
    handleUpdate(
      user._id,
      {
        accountStatus: "active",
        permissions: {
          ...user.permissions,
          canPost: true,
        },
      },
      `Approved access for ${user.name}!`
    );
  };

  const handleTogglePermission = (
    user: UserItem,
    permKey: "canPost" | "canPublish" | "canManageCategories"
  ) => {
    const currentVal = user.permissions?.[permKey] ?? false;
    handleUpdate(
      user._id,
      {
        permissions: {
          ...user.permissions,
          [permKey]: !currentVal,
        },
      },
      `Updated ${permKey} for ${user.name}`
    );
  };

  const handleToggleStatus = (user: UserItem) => {
    const newStatus = user.accountStatus === "suspended" ? "active" : "suspended";
    handleUpdate(
      user._id,
      { accountStatus: newStatus },
      `User account is now ${newStatus}.`
    );
  };

  const handleChangeRole = (user: UserItem, newRole: "admin" | "author" | "viewer") => {
    handleUpdate(
      user._id,
      { role: newRole },
      `Role changed to ${newRole} for ${user.name}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      {/* 4 User Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500">Total Registered</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {stats.total}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-900/40 shadow-2xs">
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
            Pending Approvals
          </span>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {stats.pending}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-900/40 shadow-2xs">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            Active Authors
          </span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {stats.active}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/40 shadow-2xs">
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
            Suspended Accounts
          </span>
          <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
            {stats.suspended}
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
        {/* Controls */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {["all", "pending", "active", "suspended"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  statusFilter === st
                    ? "bg-royal-blue text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-blue/30"
            />
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="py-16 text-center">
            <RefreshCw className="w-6 h-6 animate-spin text-royal-blue mx-auto mb-2" />
            <p className="text-xs text-slate-400">Loading user directory...</p>
          </div>
        )}

        {/* Error message */}
        {!isLoading && error && (
          <div className="p-8 text-center text-rose-600 text-xs font-semibold">
            <AlertCircle className="w-5 h-5 mx-auto mb-2" />
            <span>{error}</span>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && users.length === 0 && (
          <div className="p-16 text-center text-slate-400">
            <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No users found</p>
            <p className="text-xs text-slate-400 mt-1">No users match the selected filters.</p>
          </div>
        )}

        {/* Users Table */}
        {!isLoading && !error && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 dark:bg-slate-800/40 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-200 dark:border-slate-800 tracking-wider">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Can Post</th>
                  <th className="py-3 px-4">Direct Publish</th>
                  <th className="py-3 px-4">Manage Categories</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u) => {
                  const isPending = u.accountStatus === "pending";
                  const isSuspended = u.accountStatus === "suspended";
                  const isBusy = updatingId === u._id;

                  return (
                    <tr key={u._id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      {/* Name & Email */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-royal-blue to-brand-azure text-white flex items-center justify-center font-bold text-xs shrink-0">
                            {u.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Role Selector */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={u.role}
                          disabled={isBusy}
                          onChange={(e) => handleChangeRole(u, e.target.value as any)}
                          className="px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-semibold cursor-pointer"
                        >
                          <option value="admin">Admin</option>
                          <option value="author">Author</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            u.accountStatus === "active"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400"
                              : u.accountStatus === "pending"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400"
                              : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400"
                          }`}
                        >
                          {u.accountStatus}
                        </span>
                      </td>

                      {/* Permission: canPost */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleTogglePermission(u, "canPost")}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                            u.permissions?.canPost
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
                              : "bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700"
                          }`}
                        >
                          {u.permissions?.canPost ? "Allowed" : "No Post"}
                        </button>
                      </td>

                      {/* Permission: canPublish */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleTogglePermission(u, "canPublish")}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                            u.permissions?.canPublish
                              ? "bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800"
                              : "bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700"
                          }`}
                        >
                          {u.permissions?.canPublish ? "Direct Live" : "Review Only"}
                        </button>
                      </td>

                      {/* Permission: canManageCategories */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleTogglePermission(u, "canManageCategories")}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                            u.permissions?.canManageCategories
                              ? "bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800"
                              : "bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700"
                          }`}
                        >
                          {u.permissions?.canManageCategories ? "Manager" : "None"}
                        </button>
                      </td>

                      {/* Action buttons */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {isPending && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => handleApprove(u)}
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <UserCheck className="w-3 h-3" />
                              <span>Approve</span>
                            </button>
                          )}

                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleToggleStatus(u)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                              isSuspended
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900"
                            }`}
                          >
                            {isSuspended ? "Reactivate" : "Suspend"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
