import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import { CATEGORIES } from "../utils/constants";

export default function CategoriesPage() {
  return (
    <>
      <SEO title="Categories" description="Browse books by category on BookVerse." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground dark:text-[#f0eef2] mb-2 tracking-tight">
          Categories
        </h1>
        <p className="text-muted dark:text-[#f0eef2]/55 mb-10 max-w-xl text-sm leading-relaxed">
          Explore curated collections across every genre. Find your next great read.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/discover?genre=${encodeURIComponent(cat.slug)}`}
              className="group relative overflow-hidden rounded-2xl p-6 bg-card dark:bg-dark-card border border-border dark:border-dark-border hover:border-primary/35 hover:shadow-md transition-all min-h-[160px] flex flex-col justify-end"
            >
              <span className="text-4xl mb-3 block group-hover:scale-105 transition-transform">{cat.icon}</span>
              <h2 className="font-display text-xl font-bold text-foreground dark:text-[#f0eef2] group-hover:text-primary transition-colors">
                {cat.name}
              </h2>
              <p className="text-muted text-xs mt-1 group-hover:text-primary transition-colors">Browse →</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
