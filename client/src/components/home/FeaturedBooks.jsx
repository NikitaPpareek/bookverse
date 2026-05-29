import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import api from "../../services/api";
import BookCard from "../books/BookCard";
import SkeletonCard from "../common/SkeletonCard";

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/books/featured")
      .then((d) => setBooks(d.books || []))
      .catch((err) => setError(err.message || "Failed to load featured books"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="rounded-2xl bg-accent/40 dark:bg-[#383532]/60 border border-secondary/40 dark:border-[#4a4540] p-6 sm:p-10">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-2">Featured Collection</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground dark:text-[#e8e4dc]">
            Books Readers Love
          </h2>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
            <AlertCircle size={18} />
            {error}. Ensure the server is running.
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : books.slice(0, 6).map((book) => (
                <BookCard key={book.googleId || book._id} book={book} />
              ))}
        </div>

        {!loading && !error && (
          <div className="text-center mt-8">
            <Link
              to="/books"
              className="inline-block px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Explore All Books
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
