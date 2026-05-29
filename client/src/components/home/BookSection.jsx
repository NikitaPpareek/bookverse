import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import BookCard from "../books/BookCard";
import SkeletonCard from "../common/SkeletonCard";
import { searchBooks } from "../../services/googleBooks";

export default function BookSection({
  title,
  subtitle,
  query,
  viewAllLink = "/discover",
  orderBy = "relevance",
  maxResults = 8,
  featured = false,
}) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    searchBooks(query, { maxResults, orderBy })
      .then(({ books: data }) => {
        if (!cancelled) setBooks(data);
      })
      .catch(() => {
        if (!cancelled) setBooks([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query, maxResults, orderBy]);

  const content = (
    <>
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          {featured && (
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary dark:text-lavender mb-2">
              Now trending
            </span>
          )}
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground dark:text-[#f0eef2] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-muted dark:text-[#f0eef2]/55 mt-1">{subtitle}</p>
          )}
        </div>
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-sm font-bold text-primary dark:text-lavender hover:text-primary-hover transition-colors shrink-0"
        >
          View all <HiArrowRight size={16} />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : books.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted py-6 text-center">No books found right now. Try again later.</p>
      )}
    </>
  );

  return (
    <section
      className={`max-w-7xl mx-auto px-4 sm:px-6 ${
        featured ? "pt-3 pb-8" : "py-8 lg:py-10"
      }`}
    >
      {featured ? (
        <div className="section-panel p-5 sm:p-7">{content}</div>
      ) : (
        <div className="border-t border-border dark:border-dark-border pt-8 first:border-0 first:pt-0">
          {content}
        </div>
      )}
    </section>
  );
}
