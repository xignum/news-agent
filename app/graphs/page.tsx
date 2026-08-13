import { getArticles } from "@/lib/articles";
import ArticleList from "@/components/ArticleList";

const FEED_URLS = [
  "   http://news.google.com/rss/search?q=%22Taiwan+offshore+wind%22&hl=en-US&gl=US&ceid=US:en",
  // add more feed URLs here to include them on the "All" page
];

export default function GraphsPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Graphs</h1>
      <p className="text-gray-600">
        This page is a placeholder. Charts and visualizations will go here later.
      </p>
    </main>
  );
}
