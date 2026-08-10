import Parser from "rss-parser";

type Article = {
  id: string;
  title: string;
  source: string;
  summary: string;
  link: string;
  pubDate?: string;
};

const FEED_URLS = [
  "https://rss.app/feeds/trrRkJuwWJMO8WP6.xml",
  "https://rss.app/feeds/t1Xq6S4JjgGJDoxd.xml"
];

async function getArticles(): Promise<Article[]> {
  const parser = new Parser();

  // Fetch all feeds at the same time instead of one-by-one
  const feeds = await Promise.all(
    FEED_URLS.map((url) => parser.parseURL(url))
  );

  // Flatten all feeds' articles into a single array
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

  // Sort newest first
  articles.sort((a, b) => {
    if (!a.pubDate || !b.pubDate) return 0;
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });

  return articles;
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">News Digest</h1>
      <div className="space-y-4">
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block border rounded-lg p-4 shadow-sm hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{article.source}</p>
            <p className="text-gray-700">{article.summary}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
