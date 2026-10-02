import Parser from "rss-parser";

export type Article = {
  id: string;
  title: string;
  source: string;
  summary: string;
  link: string;
  pubDate?: string;
  language?: "en" | "zh";
};

export type ArticlesResult = {
  articles: Article[];
  failedFeedCount: number;
};

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function cleanSummary(raw?: string): string {
  if (!raw) return "No summary available.";
  return (
    raw
      .replace(/<[^>]*>?/gm, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/\s+/g, " ")
      .trim() || "No summary available."
  );
}

function detectLanguage(text: string): "en" | "zh" {
  return /[\u4e00-\u9fa5]/.test(text) ? "zh" : "en";
}

function cleanSource(feedTitle?: string, articleTitle?: string): string {
  if (feedTitle && !feedTitle.includes("Google") && !feedTitle.includes("http")) {
    return feedTitle;
  }
  if (articleTitle) {
    const dashIndex = articleTitle.lastIndexOf(" - ");
    if (dashIndex !== -1 && dashIndex < articleTitle.length - 3) {
      return articleTitle.substring(dashIndex + 3).trim();
    }
  }
  return feedTitle || "Offshore Wind News";
}

export async function getArticles(feedUrls: string[]): Promise<ArticlesResult> {
  const parser = new Parser({
    timeout: 10000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    },
  });

  const results = await Promise.allSettled(
    feedUrls.map((url) => parser.parseURL(url))
  );

  const feeds = [];
  let failedFeedCount = 0;

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status === "fulfilled") {
      feeds.push(result.value);
    } else {
      failedFeedCount++;
      console.error(`Feed failed to load: ${feedUrls[i]}`, result.reason);
    }
  }

  const allArticles = feeds.flatMap((feed) =>
    (feed.items || []).map((item, index) => {
      const title = item.title ?? "Untitled";
      const source = cleanSource(feed.title, title);
      const summary = cleanSummary(item.contentSnippet || item.content);
      const language = detectLanguage(title + " " + summary);

      return {
        id: item.guid ?? `${feed.title}-${index}`,
        title,
        source,
        summary,
        link: item.link ?? "#",
        pubDate: item.pubDate,
        language,
      };
    })
  );

  const uniqueArticlesMap = new Map<string, Article>();
  for (const article of allArticles) {
    const cleanLink = article.link.split("#")[0].replace(/\/+$/, "");
    if (!uniqueArticlesMap.has(cleanLink)) {
      uniqueArticlesMap.set(cleanLink, article);
    }
  }

  const uniqueArticles = Array.from(uniqueArticlesMap.values());
  const now = Date.now();

  const recentArticles = uniqueArticles.filter((article) => {
    if (!article.pubDate) return false;
    const published = new Date(article.pubDate).getTime();
    if (isNaN(published)) return false;
    return now - published <= SEVEN_DAYS_MS;
  });

  recentArticles.sort((a, b) => {
    if (!a.pubDate || !b.pubDate) return 0;
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });

  return {
    articles: recentArticles,
    failedFeedCount,
  };
}
