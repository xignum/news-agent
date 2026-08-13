import Link from "next/link";

export default function Nav() {
  return (
    <nav className="max-w-2xl mx-auto px-6 pt-6 flex items-center justify-between text-sm font-medium">
      {/* Left side: news category pages */}
      <div className="flex gap-4">
        <Link href="/" className="hover:underline">
          All
        </Link>
        <Link href="/global" className="hover:underline">
          Global
        </Link>
        <Link href="/taiwan" className="hover:underline">
          Taiwan Offshore Wind
        </Link>
      </div>

      {/* Right side: tools/features, separate from news categories */}
      <div className="flex gap-4">
        <Link href="/graphs" className="hover:underline">
          Graphs
        </Link>
      </div>
    </nav>
  );
}