"use client";

import React, { useState } from "react";
import { X, Code, Terminal, Layers, Search, Sparkles, Check } from "lucide-react";

interface CodeSnippetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertSnippet: (snippetMarkup: string) => void;
}

interface SnippetItem {
  id: string;
  title: string;
  category: "Code Blocks" | "HTML Components" | "Editorial Callouts";
  description: string;
  code: string;
  badge: string;
}

const SNIPPETS: SnippetItem[] = [
  {
    id: "ts-api",
    title: "TypeScript / Next.js Route Handler",
    category: "Code Blocks",
    description: "Type-safe NextRequest / NextResponse API pattern with error handling",
    badge: "TS",
    code: `\`\`\`typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") ?? "";

    return NextResponse.json({
      success: true,
      data: { query, timestamp: new Date().toISOString() },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
\`\`\``,
  },
  {
    id: "csharp-grpc",
    title: "C# / .NET 9 High-Throughput Service",
    category: "Code Blocks",
    description: "Modern asynchronous worker configuration with cancellation tokens",
    badge: "C#",
    code: `\`\`\`csharp
public class TelemetryStreamService : BackgroundService
{
    private readonly ILogger<TelemetryStreamService> _logger;

    public TelemetryStreamService(ILogger<TelemetryStreamService> logger) => _logger = logger;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("Heartbeat dispatched at: {time}", DateTimeOffset.Now);
            await Task.Delay(1000, stoppingToken);
        }
    }
}
\`\`\``,
  },
  {
    id: "python-fastapi",
    title: "Python Async FastAPI Worker",
    category: "Code Blocks",
    description: "Asynchronous endpoint with Pydantic response models",
    badge: "Python",
    code: `\`\`\`python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel

app = FastAPI(title="Distributed AI Orchestration")

class InferencePayload(BaseModel):
    prompt: string
    max_tokens: int = 512

@app.post("/v1/predict")
async def execute_inference(payload: InferencePayload):
    return {"status": "completed", "tokens_processed": len(payload.prompt.split())}
\`\`\``,
  },
  {
    id: "sql-query",
    title: "SQL Indexed CTE Query",
    category: "Code Blocks",
    description: "Optimized analytical query with common table expressions and window functions",
    badge: "SQL",
    code: `\`\`\`sql
WITH RankedPublications AS (
  SELECT 
    id, 
    title, 
    views,
    category,
    DENSE_RANK() OVER (PARTITION BY category ORDER BY views DESC) as rank_in_category
  FROM articles
  WHERE status = 'published'
)
SELECT * FROM RankedPublications WHERE rank_in_category <= 5;
\`\`\``,
  },
  {
    id: "bash-deploy",
    title: "Bash / Docker Deployment Script",
    category: "Code Blocks",
    description: "Zero-downtime rolling container rebuild and health check",
    badge: "Bash",
    code: `\`\`\`bash
#!/usr/bin/env bash
set -euo pipefail

echo "==> Building production container..."
docker build -t bitjunoo-core:latest .

echo "==> Health-checking edge cluster..."
curl --fail --retry 3 https://api.bitjunoo.internal/health

echo "==> Deployment successfully finished!"
\`\`\``,
  },
  {
    id: "details-accordion",
    title: "Collapsible Accordion / FAQ",
    category: "HTML Components",
    description: "Native interactive <details><summary> disclosure widget for deep dives",
    badge: "HTML",
    code: `<details class="my-4 p-4 rounded-xl border border-slate-200 bg-slate-50/70 cursor-pointer">
  <summary class="font-heading font-bold text-sm text-slate-900 cursor-pointer select-none">
    Deep Dive: How does deterministic failover work under 50k req/sec?
  </summary>
  <div class="mt-3 pt-3 border-t border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
    By decoupling the control plane gossip heartbeats from edge proxy data rings, consensus state transitions take less than 12 milliseconds without socket tear-downs.
  </div>
</details>`,
  },
  {
    id: "metric-card",
    title: "Performance Metric Stat Card",
    category: "HTML Components",
    description: "High-contrast visual metric banner for benchmark figures",
    badge: "HTML",
    code: `<div class="my-6 grid sm:grid-cols-3 gap-3">
  <div class="p-4 rounded-2xl bg-royal-blue/5 border border-royal-blue/20">
    <span class="block text-2xl font-black text-royal-blue font-heading">&lt; 14ms</span>
    <span class="text-xs font-semibold text-slate-600">P99 Edge Latency</span>
  </div>
  <div class="p-4 rounded-2xl bg-brand-azure/5 border border-brand-azure/20">
    <span class="block text-2xl font-black text-brand-azure font-heading">99.999%</span>
    <span class="text-xs font-semibold text-slate-600">High Availability SLA</span>
  </div>
  <div class="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
    <span class="block text-2xl font-black text-emerald-600 font-heading">0 cold-starts</span>
    <span class="text-xs font-semibold text-slate-600">Container Warm Pool</span>
  </div>
</div>`,
  },
  {
    id: "terminal-window",
    title: "Terminal Command Window",
    category: "HTML Components",
    description: "Realistic terminal frame with simulated macOS window controls",
    badge: "HTML",
    code: `<div class="my-6 rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-xl">
  <div class="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-slate-800">
    <span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
    <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
    <span class="ml-2 font-mono text-[11px] text-slate-400">bash — bitjunoo-cluster-cli</span>
  </div>
  <div class="p-4 font-mono text-xs text-slate-300 leading-relaxed">
    <p class="text-emerald-400">$ bitjunoo cluster inspect --production</p>
    <p class="text-slate-400 mt-1">✔ 18 healthy edge nodes</p>
    <p class="text-slate-400">✔ Memory pressure: 38%</p>
    <p class="text-cyan-400 mt-1">Ready for high-throughput traffic routing.</p>
  </div>
</div>`,
  },
  {
    id: "kbd-keys",
    title: "Keyboard Shortcut Keys",
    category: "HTML Components",
    description: "Clean styled <kbd> tag combination",
    badge: "HTML",
    code: `<span class="inline-flex items-center gap-1">Press <kbd class="px-2 py-0.5 text-xs font-mono font-bold bg-slate-100 border border-slate-300 rounded shadow-sm text-slate-800">Ctrl</kbd> + <kbd class="px-2 py-0.5 text-xs font-mono font-bold bg-slate-100 border border-slate-300 rounded shadow-sm text-slate-800">K</kbd> to open command palette.</span>`,
  },
  {
    id: "tip-callout",
    title: "Architecture Pro-Tip Callout",
    category: "Editorial Callouts",
    description: "GitHub-style markdown tip box for critical takeaways",
    badge: "Markdown",
    code: `> [!TIP]
> Always enforce TCP Keep-Alive pings and HTTP/2 multiplexing when interconnecting microservices across availability zones to avoid socket connection exhaustion.`,
  },
  {
    id: "warning-callout",
    title: "Production Warning Alert",
    category: "Editorial Callouts",
    description: "Amber warning box for performance gotchas and caveats",
    badge: "Markdown",
    code: `> [!WARNING]
> Running synchronous I/O operations inside request interceptors will block the Node.js event loop and degrade P99 throughput exponentially.`,
  },
];

export default function CodeSnippetsModal({
  isOpen,
  onClose,
  onInsertSnippet,
}: CodeSnippetsModalProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  if (!isOpen) return null;

  const categories = ["All", "Code Blocks", "HTML Components", "Editorial Callouts"];

  const filteredSnippets = SNIPPETS.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.badge.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-royal-blue/10 text-royal-blue">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                HTML & Code Snippet Suggestions
              </h3>
              <p className="text-xs text-slate-500">
                Insert pre-formatted code blocks, interactive UI accordions, and metric cards with one click.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search code & components..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
            />
          </div>

          <div className="flex flex-wrap gap-1 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-royal-blue text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Snippets Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredSnippets.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Code className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">No snippets found matching your query.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredSnippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-royal-blue/40 bg-white hover:bg-royal-blue/[0.02] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-royal-blue transition-colors">
                        {snippet.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-mono font-bold uppercase tracking-wider">
                        {snippet.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                      {snippet.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {snippet.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onInsertSnippet(`\n${snippet.code}\n`);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-royal-blue/10 hover:bg-royal-blue text-royal-blue hover:text-white transition-all text-xs font-bold cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Insert</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/70 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
