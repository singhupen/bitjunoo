"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  ArrowUpRight,
  Globe,
  Share2,
  Calendar,
  Download,
  Sparkles,
} from "lucide-react";

const trafficSources = [
  { source: "Organic Search (Google, DuckDuckGo)", percentage: 48, visitors: "164,540", color: "bg-royal-blue" },
  { source: "Direct Traffic & Developer Bookmarks", percentage: 24, visitors: "82,270", color: "bg-purple" },
  { source: "Tech Communities (HackerNews, Reddit r/dotnet)", percentage: 16, visitors: "54,840", color: "bg-cyan-blue" },
  { source: "Engineering Networks (LinkedIn, Twitter/X)", percentage: 8, visitors: "27,420", color: "bg-indigo" },
  { source: "Newsletter Dispatch & RSS Feeds", percentage: 4, visitors: "13,710", color: "bg-emerald-500" },
];

const topArticles = [
  {
    rank: "01",
    title: "Autonomous AI Agents in Production: Guardrails, Latency, and Failover Design",
    views: "24,890",
    completionRate: "78%",
    shares: "1,420",
    category: "AI & Agents",
  },
  {
    rank: "02",
    title: "Zero-Downtime Database Migrations in High-Concurrency .NET 9 Microservices",
    views: "18,420",
    completionRate: "84%",
    shares: "980",
    category: "Backend & Systems",
  },
  {
    rank: "03",
    title: "Optimizing Next.js 16 Edge Rendering: 60fps WebGL with React 19 Compiler",
    views: "14,110",
    completionRate: "72%",
    shares: "640",
    category: "Frontend Architecture",
  },
  {
    rank: "04",
    title: "Implementing Zero-Trust Architecture in Hybrid Cloud Kubernetes Clusters",
    views: "12,300",
    completionRate: "69%",
    shares: "510",
    category: "Cloud & DevOps",
  },
];

const periods = ["Last 7 Days", "Last 30 Days", "Last Quarter", "Year to Date"] as const;

export default function AnalyticsOverview() {
  const [activePeriod, setActivePeriod] = useState<string>("Last 30 Days");

  return (
    <div className="space-y-6">
      {/* Top Filter and Export Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activePeriod === period
                  ? "bg-white text-slate-900 shadow-sm font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        <button
          onClick={() => alert(`Exporting analytics report for ${activePeriod}...`)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm self-start sm:self-center cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Analytics PDF</span>
        </button>
      </div>

      {/* 4 Primary Performance KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-royal-blue/30 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Total Article Reads</span>
            <Eye className="w-4 h-4 text-royal-blue" />
          </div>
          <div className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">342.8k</div>
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+31.4% vs previous</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-purple/30 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Unique Engineering Readers</span>
            <Users className="w-4 h-4 text-purple" />
          </div>
          <div className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">124.5k</div>
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+28.4% vs previous</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-cyan-blue/30 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Average Dwell Duration</span>
            <Clock className="w-4 h-4 text-cyan-blue" />
          </div>
          <div className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">4m 32s</div>
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.2% retention</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Newsletter Conversion</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">10.3%</div>
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+1.8% conversion</span>
          </div>
        </div>
      </div>

      {/* Traffic Sources & Geographic Breakdown */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left: Traffic Channels */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h3 className="font-heading font-bold text-base text-slate-900 mb-1">
            Readership Acquisition Channels
          </h3>
          <p className="text-xs text-slate-500 mb-5">
            Where senior engineers and technical decision-makers discover our publications.
          </p>

          <div className="space-y-4">
            {trafficSources.map((item) => (
              <div key={item.source}>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700">{item.source}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400">{item.visitors}</span>
                    <span className="font-mono text-slate-900">{item.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Regional Reach */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-royal-blue" />
                <span>Geographic Reach</span>
              </h3>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Top Markets</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Regional distribution of our global technical audience.
            </p>

            <div className="space-y-3">
              {[
                { country: "North America (US & Canada)", share: "42%", flag: "🇺🇸 🇨🇦" },
                { country: "Western Europe (UK, DE, NL)", share: "28%", flag: "🇬🇧 🇩🇪" },
                { country: "Asia-Pacific (India, SG, JP)", share: "22%", flag: "🇮🇳 🇸🇬" },
                { country: "Other International Hubs", share: "8%", flag: "🌐" },
              ].map((geo) => (
                <div
                  key={geo.country}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{geo.flag}</span>
                    <span className="font-medium text-slate-700">{geo.country}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">{geo.share}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Primary Platforms:</span>
            <span className="font-medium text-slate-700">Desktop (76%) &bull; Mobile (21%) &bull; Tablet (3%)</span>
          </div>
        </div>
      </div>

      {/* Top Performing Publications */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">
              Top Performing Technical Deep Dives
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked by total read completion, dwell time, and community bookmarks.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {topArticles.map((art) => (
            <div
              key={art.title}
              className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/50 px-2 rounded-xl transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-base font-extrabold text-slate-300 mt-0.5">
                  {art.rank}
                </span>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900 hover:text-royal-blue transition-colors">
                    {art.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {art.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs self-end md:self-center">
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-900">{art.views}</div>
                  <div className="text-[10px] text-slate-400">Total Reads</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-600">{art.completionRate}</div>
                  <div className="text-[10px] text-slate-400">Completion</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-purple">{art.shares}</div>
                  <div className="text-[10px] text-slate-400">Bookmarks</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
