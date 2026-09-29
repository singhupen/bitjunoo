"use client";

import { useState } from "react";
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

const initialCategories: CategoryItem[] = [
  {
    id: "cat-1",
    name: "Backend & Systems",
    slug: "backend-systems",
    description: "Enterprise .NET 9 microservices, distributed concurrency, gRPC protocols, and database scaling.",
    count: 14,
    views: "128.4k",
    color: "text-royal-blue border-royal-blue/30",
    badgeBg: "bg-blue-50 text-royal-blue",
  },
  {
    id: "cat-2",
    name: "Frontend Architecture",
    slug: "frontend-architecture",
    description: "Next.js 16 Turbopack, React 19 concurrent features, 60fps WebGL, and state machines.",
    count: 11,
    views: "86.2k",
    color: "text-purple border-purple/30",
    badgeBg: "bg-purple/10 text-purple",
  },
  {
    id: "cat-3",
    name: "AI & Autonomous Agents",
    slug: "ai-agents",
    description: "Multi-agent orchestration, LLM guardrails, RAG vector pipelines, and latency tuning.",
    count: 9,
    views: "94.8k",
    color: "text-cyan-blue border-cyan-blue/30",
    badgeBg: "bg-cyan-50 text-cyan-blue",
  },
  {
    id: "cat-4",
    name: "Cloud & DevOps",
    slug: "cloud-devops",
    description: "Kubernetes orchestration, automated CI/CD pipelines, AWS/Azure serverless, and SOC-2 compliance.",
    count: 8,
    views: "72.1k",
    color: "text-indigo border-indigo/30",
    badgeBg: "bg-indigo/10 text-indigo",
  },
  {
    id: "cat-5",
    name: "Mobile Engineering",
    slug: "mobile-engineering",
    description: "React Native 0.76+, Hermes engine optimizations, cross-platform offline sync architectures.",
    count: 4,
    views: "38.5k",
    color: "text-emerald-600 border-emerald-300",
    badgeBg: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "cat-6",
    name: "Data & Vector DBs",
    slug: "data-vector",
    description: "PostgreSQL pgvector, semantic retrieval, cache topologies, and event stream pipelines.",
    count: 2,
    views: "26.0k",
    color: "text-amber-600 border-amber-300",
    badgeBg: "bg-amber-50 text-amber-700",
  },
];

const popularTags = [
  { name: ".NET 9", count: 18 },
  { name: "Next.js 16", count: 14 },
  { name: "Kubernetes", count: 12 },
  { name: "LLM Agents", count: 11 },
  { name: "TypeScript", count: 16 },
  { name: "Docker", count: 9 },
  { name: "pgvector", count: 8 },
  { name: "gRPC", count: 7 },
  { name: "React 19", count: 12 },
  { name: "Zero Trust", count: 5 },
  { name: "Redis", count: 6 },
  { name: "Kafka", count: 4 },
];

export default function CategoriesManager() {
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

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCat: CategoryItem = {
      id: `cat-${Date.now()}`,
      name: name.trim(),
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      description: desc.trim() || "High-performance software engineering domain.",
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
  };

  const handleDelete = (id: string, catName: string) => {
    if (confirm(`Delete category "${catName}"?`)) {
      setCategories(categories.filter((c) => c.id !== id));
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
            <span className="text-xs text-slate-400">Total Articles: 48</span>
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
