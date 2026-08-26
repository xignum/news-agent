import Parser from "rss-parser";

export type Article = {
  id: string;
  title: string;
  source: string;
  summary: string;
  link: string;
  pubDate?: string;
};

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// This function can be reused by any page — just pass it a different
// list of feed URLs depending on which category you want.
export async function getArticles(feedUrls: string[]): Promise<Article[]> {
  const parser = new Parser();

 const results = await Promise.allSettled(
  feedUrls.map((url) => parser.parseURL(url))
);

const feeds = [];
for (let i = 0; i < results.length; i++) {
  const result = results[i];
  if (result.status === "fulfilled") {
    feeds.push(result.value);
  } else {
    console.error(`Feed failed to load: ${feedUrls[i]}`, result.reason);
  }
}

  const articles = feeds.flatMap((feed) =>
    feed.items.map((item, index) => ({
      id: item.guid ?? `${feed.title}-${index}`,
      title: item.title ?? "Untitled",
      source: feed.title ?? "Unknown source",
      summary: item.contentSnippet ?? item.content ?? "No summary available.",
      link: item.link ?? "#",
      pubDate: item.pubDate,
    }))
  );
  
const uniqueArticlesMap = new Map<string, Article>();
for (const article of allArticles) {
  uniqueArticlesMap.set(article.link, article);
}
  
const uniqueArticles = Array.from(uniqueArticlesMap.values());
  const now = Date.now();
  const recentArticles = articles.filter((article) => {
    if (!article.pubDate) return false;
    const published = new Date(article.pubDate).getTime();
    return now - published <= SEVEN_DAYS_MS;
  });

  recentArticles.sort((a, b) => {
    if (!a.pubDate || !b.pubDate) return 0;
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });

  return recentArticles;
}
