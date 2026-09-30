"use client";

import { useState } from "react";
import { authFetch } from "@/lib/api/apiClient";
import {
  Tags,
  Plus,
  Edit2,
  Trash2,
  Layers,
  Sparkles,
  CheckCircle2,
  Hash,
  ArrowRight,
} from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  views: string;
  color: string;
  badgeBg: string;
}

export default function CategoriesManager({ 
  initialCategories, 
  popularTags,
  totalArticles
}: { 
  initialCategories: CategoryItem[], 
  popularTags: { name: string; count: number }[],
  totalArticles: number
}) {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [colorScheme, setColorScheme] = useState("royal-blue");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await authFetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: desc.trim(),
          color: "royal-blue"
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create category");

      const newCat: CategoryItem = {
        id: data.data._id || `cat-${Date.now()}`,
        name: data.data.name,
        slug: data.data.slug || name.toLowerCase().replace(/\s+/g, "-"),
        description: data.data.description || "High-performance software engineering domain.",
        count: 0,
        views: "0",
        color: "text-royal-blue border-royal-blue/30",
        badgeBg: "bg-blue-50 text-royal-blue",
      };

      setCategories([...categories, newCat]);
      setName("");
      setSlug("");
      setDesc("");
      setSuccessMsg(`Category "${newCat.name}" created successfully!`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || "Failed to create category");
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (confirm(`Delete category "${catName}"?`)) {
      try {
        const res = await authFetch(`/api/categories/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete category");
        setCategories(categories.filter((c) => c.id !== id));
      } catch (err: any) {
        alert(err.message || "Failed to delete category");
      }
    }
  };

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main 2-Column Split: Create Form & Categories List */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left: Create Form */}
        <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-royal-blue/10 text-royal-blue">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                Add New Domain
              </h3>
              <p className="text-[11px] text-slate-500">Create a topic category</p>
            </div>
          </div>

          <form onSubmit={handleCreateCategory} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category Title
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Distributed Security"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="distributed-security"
                className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 text-royal-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Describe the technical scope covered under this domain..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-royal-blue to-purple text-white font-bold text-xs sm:text-sm shadow-md shadow-royal-blue/20 hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              Create Category
            </button>
          </form>
        </div>

        {/* Right: Existing Categories Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-slate-900">
              Active Publication Categories ({categories.length})
            </h3>
            <span className="text-xs text-slate-400">Total Articles: {totalArticles}</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${cat.badgeBg}`}>
                      {cat.name}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => alert(`Editing category: "${cat.name}"`)}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">{cat.count} articles</span>
                  <span className="font-mono">{cat.views} reads</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Tags Taxonomy Cloud */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
            <Hash className="w-4 h-4 text-purple" />
            <span>Keyword Taxonomy & Tag Frequency</span>
          </h3>
          <span className="text-xs text-slate-400">Indexed for semantic search</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <div
              key={tag.name}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-royal-blue/30 text-xs font-semibold text-slate-700 hover:text-royal-blue transition-colors cursor-pointer"
            >
              <span>#{tag.name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-500">
                {tag.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
