import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { searchBooks } from "../../services/googleBooks";

export default function PopularAuthors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    searchBooks("bestselling author fiction", { maxResults: 20 })
      .then(({ books }) => {
        const seen = new Set();
        const list = [];
        for (const book of books) {
          const name = book.author?.split(",")[0]?.trim();
          if (name && !seen.has(name)) {
            seen.add(name);
            list.push({ name, cover: book.coverImage, query: name });
          }
          if (list.length >= 8) break;
        }
        setAuthors(list);
      })
      .catch(() => setAuthors([]));
  }, []);

  if (!authors.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-border dark:border-dark-border">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground dark:text-[#f0eef2] tracking-tight">
            Popular Authors
          </h2>
          <p className="text-sm text-muted dark:text-[#f0eef2]/55 mt-1">
            Explore works from trending voices
          </p>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-1">
        {authors.map((a) => (
          <Link
            key={a.name}
            to={`/discover?q=${encodeURIComponent(a.name)}&filter=author`}
            className="group flex flex-col items-center shrink-0 w-24 sm:w-28"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-border dark:border-dark-border bg-card shadow-sm group-hover:border-primary group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
              <img src={a.cover} alt={a.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <p className="mt-2 text-xs sm:text-sm font-bold text-center text-foreground dark:text-[#f0eef2] line-clamp-2 group-hover:text-primary transition-colors">
              {a.name}
            </p>
          </Link>
        ))}
        <Link
          to="/discover"
          className="flex flex-col items-center justify-center shrink-0 w-24 text-primary dark:text-lavender"
        >
          <span className="w-20 h-20 rounded-full border-2 border-dashed border-border flex items-center justify-center group-hover:border-primary transition-colors">
            <HiArrowRight size={22} />
          </span>
          <span className="mt-2 text-xs font-bold">See more</span>
        </Link>
      </div>
    </section>
  );
}
