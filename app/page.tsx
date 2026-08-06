type Article = {
  id: number;
  title: string;
  source: string;
  summary: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: "Local City Council Approves New Park",
    source: "City Times",
    summary: "The council voted 5-2 to fund a new park in the downtown area, set to open next spring.",
  },
  {
    id: 2,
    title: "Tech Company Announces New AI Product",
    source: "Tech Daily",
    summary: "A major tech company unveiled a new AI tool aimed at helping small businesses automate tasks.",
  },
  {
    id: 3,
    title: "Local Team Wins Championship",
    source: "Sports Weekly",
    summary: "The city's team clinched the title in a close final match over the weekend.",
  },
];

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">News Digest</h1>
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{article.source}</p>
            <p className="text-gray-700">{article.summary}</p>
          </div>
        ))}
      </div>
    </main>
  );
}