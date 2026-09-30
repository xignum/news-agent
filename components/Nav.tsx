import Link from "next/link";

export default function Nav() {
  return (
    <nav className="max-w-2xl mx-auto px-6 pt-6 flex items-center justify-between text-sm font-medium">
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
    </nav>
  );
}
