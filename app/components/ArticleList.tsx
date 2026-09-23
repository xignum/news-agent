import { Article } from "@/lib/articles";

export default function ArticleList({ articles }: { articles: Article[] }) {
  // If there are no articles to show, display a friendly message
  // instead of just leaving a blank space on the page.
  if (articles.length === 0) {
    return (
      <p className="text-gray-500 italic">
        No articles found in the last 7 days.
      </p>
    );
  }

  return (
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
          <p className="text-sm text-gray-500 mb-2">
            {article.source}
            {article.pubDate && (
              <>
                {" · "}
                {new Date(article.pubDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </>
            )}
          </p>
          <p className="text-gray-700">{article.summary}</p>
        </a>
      ))}
    </div>
  );
}
