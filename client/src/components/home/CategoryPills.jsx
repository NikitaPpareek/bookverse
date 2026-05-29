import { Link } from "react-router-dom";
import { CATEGORIES } from "../../utils/constants";

export default function CategoryPills() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-10">
      <div className="section-panel p-6 sm:p-8">
        <div className="text-center mb-7">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground dark:text-[#f0eef2] mb-1.5 tracking-tight">
            Browse by Category
          </h2>
          <p className="text-sm text-muted dark:text-[#f0eef2]/55">Explore every genre in our catalog</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/discover?genre=${encodeURIComponent(cat.slug)}`}
              className="group p-4 sm:p-5 rounded-xl bg-background dark:bg-dark-elevated border border-border dark:border-dark-border hover:border-primary/35 hover:shadow-md transition-all text-center"
            >
              <span className="text-2xl sm:text-3xl mb-2 block group-hover:scale-105 transition-transform">{cat.icon}</span>
              <span className="text-sm font-bold text-foreground dark:text-[#f0eef2] group-hover:text-primary dark:group-hover:text-lavender transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
