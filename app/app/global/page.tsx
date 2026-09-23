import { getArticles } from "@/lib/articles";
import ArticleList from "@/components/ArticleList";

export const dynamic = "force-dynamic";

const FEED_URLS = [
  "https://www.offshorewind.biz/feed/",
  "https://news.google.com/rss/search?q=%22offshore+wind%22&hl=en-US&gl=US&ceid=US:en",
];

export default async function GlobalPage() {
  const { articles, failedFeedCount } = await getArticles(FEED_URLS);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Global Offshore Wind News</h1>

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
