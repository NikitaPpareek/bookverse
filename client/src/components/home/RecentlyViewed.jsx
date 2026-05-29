import { useState, useEffect } from "react";
import { getRecentlyViewed } from "../../utils/bookHelpers";
import BookCard from "../books/BookCard";

export default function RecentlyViewed() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(getRecentlyViewed());
    const onStorage = () => setBooks(getRecentlyViewed());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!books.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-border dark:border-dark-border">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground dark:text-[#f0eef2] mb-7">
        Recently Viewed
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {books.slice(0, 4).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
