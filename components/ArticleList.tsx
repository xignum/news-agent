"use client";

import { useState, useMemo } from "react";
import { Article } from "@/lib/articles";

function formatRelativeTime(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    const diffMins = Math.max(1, Math.floor(diffMs / (1000 * 60)));
    return `${diffMins}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  if (diffDays === 1) {
    return "Yesterday";
  }
  return `${diffDays}d ago`;
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ArticleList({ articles }: { articles: Article[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [langFilter, setLangFilter] = useState<"all" | "en" | "zh">("all");
  const [timeFilter, setTimeFilter] = useState<"7d" | "3d" | "24h">("7d");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    const now = Date.now();
    return articles.filter((item) => {
      // Language filter
      if (langFilter === "en" && item.language !== "en") return false;
      if (langFilter === "zh" && item.language !== "zh") return false;

      // Time filter
      if (item.pubDate) {
        const itemTime = new Date(item.pubDate).getTime();
        if (!isNaN(itemTime)) {
          const diffMs = now - itemTime;
          if (timeFilter === "24h" && diffMs > 24 * 60 * 60 * 1000) return false;
          if (timeFilter === "3d" && diffMs > 3 * 24 * 60 * 60 * 1000) return false;
          if (timeFilter === "7d" && diffMs > 7 * 24 * 60 * 60 * 1000) return false;
        }
      }

      // Keyword search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(query);
        const inSummary = item.summary.toLowerCase().includes(query);
        const inSource = item.source.toLowerCase().includes(query);
        return inTitle || inSummary || inSource;
      }

      return true;
    });
  }, [articles, searchTerm, langFilter, timeFilter]);

  const copyUrl = (e: React.MouseEvent, link: string, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (link && navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-3">
        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles, companies, locations..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Language filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-medium">Language:</span>
            <div className="inline-flex rounded-md border border-gray-200 bg-gray-50 p-0.5">
              <button
                type="button"
                onClick={() => setLangFilter("all")}
                className={`rounded px-2.5 py-1 font-medium transition-colors ${
                  langFilter === "all"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setLangFilter("en")}
                className={`rounded px-2.5 py-1 font-medium transition-colors ${
                  langFilter === "en"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLangFilter("zh")}
                className={`rounded px-2.5 py-1 font-medium transition-colors ${
                  langFilter === "zh"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                繁體中文
              </button>
            </div>
          </div>

          {/* Time window filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-medium">Time:</span>
            <div className="inline-flex rounded-md border border-gray-200 bg-gray-50 p-0.5">
              <button
                type="button"
                onClick={() => setTimeFilter("24h")}
                className={`rounded px-2.5 py-1 font-medium transition-colors ${
                  timeFilter === "24h"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                24h
              </button>
              <button
                type="button"
                onClick={() => setTimeFilter("3d")}
                className={`rounded px-2.5 py-1 font-medium transition-colors ${
                  timeFilter === "3d"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                3d
              </button>
              <button
                type="button"
                onClick={() => setTimeFilter("7d")}
                className={`rounded px-2.5 py-1 font-medium transition-colors ${
                  timeFilter === "7d"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                7d
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
          <p className="font-medium text-gray-700">No articles found</p>
          <p className="text-xs text-gray-500 mt-1">
            {searchTerm
              ? `No articles matched "${searchTerm}". Try another keyword or clear filters.`
              : "No articles found for the selected language or time range."}
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setLangFilter("all");
              setTimeFilter("7d");
            }}
            className="mt-3 text-xs font-medium text-blue-600 hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Article List */}
      <div className="space-y-4">
        {filteredArticles.map((article) => {
          const isChinese = article.language === "zh";
          return (
            <a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block border rounded-lg p-4 shadow-sm hover:bg-gray-50 bg-white transition-colors"
            >
              <h2 className="text-xl font-semibold text-gray-900">{article.title}</h2>
              <div className="text-sm text-gray-500 mb-2 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-medium text-gray-700">{article.source}</span>
                {isChinese && (
                  <span className="rounded bg-amber-50 px-1.5 py-0.2 text-[11px] font-medium text-amber-700 border border-amber-200">
                    繁中
                  </span>
                )}
                {article.pubDate && (
                  <>
                    <span>·</span>
                    <span>{formatRelativeTime(article.pubDate)}</span>
                    <span className="text-gray-400">({formatDate(article.pubDate)})</span>
                  </>
                )}
                <button
                  type="button"
                  onClick={(e) => copyUrl(e, article.link, article.id)}
                  className="ml-auto text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {copiedId === article.id ? "✓ Copied" : "Copy link"}
                </button>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{article.summary}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
