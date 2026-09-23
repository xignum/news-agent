import { getArticles } from "@/lib/articles";
import ArticleList from "@/components/ArticleList";
import Nav from "@/components/Nav";
export const dynamic = "force-dynamic";
const FEED_URLS = [
  "   http://news.google.com/rss/search?q=%22Taiwan+offshore+wind%22&hl=en-US&gl=US&ceid=US:en",
  // add more feed URLs here to include them on the "All" page
];

export default async function Home() {
  const articles = await getArticles(FEED_URLS);

  return (
    <main className="max-w-2xl mx-auto p-6">
        <Nav />

      <h1 className="text-3xl font-bold mb-6">News Digest</h1>
      <p className="text-sm text-gray-500 mb-6">
        Showing {articles.length} article{articles.length === 1 ? "" : "s"} from the last 7 days
      </p>
      <ArticleList articles={articles} />
    </main>
  );
}

