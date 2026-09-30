import { getArticles } from "@/lib/articles";
import { TAIWAN_FEEDS } from "@/lib/feeds";
import ArticleList from "@/components/ArticleList";

export const dynamic = "force-dynamic";

export default async function TaiwanPage() {
  const { articles, failedFeedCount } = await getArticles(TAIWAN_FEEDS);

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
