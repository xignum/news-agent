import { getArticles } from "@/lib/articles";
import ArticleList from "@/components/ArticleList";
export const dynamic = "force-dynamic";
import { GLOBAL_FEEDS } from "@/lib/feeds";
export default async function GlobalPage() {
  const articles = await getArticles(FEED_URLS);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Global News</h1>
      <p className="text-sm text-gray-500 mb-6">
        Showing {articles.length} article{articles.length === 1 ? "" : "s"} from the last 7 days
      </p>
      <ArticleList articles={articles} />
    </main>
  );
}
