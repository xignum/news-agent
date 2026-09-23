import { getArticles } from "@/lib/articles";
import ArticleList from "@/components/ArticleList";

export const dynamic = "force-dynamic";

const FEED_URLS = [
  'https://news.google.com/rss/search?q=%E9%9B%A2%E5%B2%B8%E9%A2%A8%E9%9B%BB+%E5%8F%B0%E7%81%A3&hl=zh-TW&gl=TW&ceid=TW:zh-Hant',
  'https://news.google.com/rss/search?q=%E9%9B%A2%E5%B2%B8%E9%A2%A8%E9%9B%BB+%E9%A2%A8%E5%A0%B4&hl=zh-TW&gl=TW&ceid=TW:zh-Hant',
];

export default async function TaiwanPage() {
  const { articles, failedFeedCount } = await getArticles(FEED_URLS);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Taiwan Offshore Wind</h1>

      <p className="text-sm text-gray-500 mb-2">
        Showing {articles.length} article{articles.length === 1 ? "" : "s"} from the last 7 days
      </p>

      {failedFeedCount > 0 && (
        <p className="text-sm text-amber-600 mb-6">
          ⚠️ {failedFeedCount} source{failedFeedCount === 1 ? "" : "s"} could not be loaded right now.
        </p>
      )}

      <ArticleList articles={articles} />
    </main>
  );
}
