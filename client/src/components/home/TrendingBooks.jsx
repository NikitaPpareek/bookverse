import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, AlertCircle } from "lucide-react";
import api from "../../services/api";
import BookCard from "../books/BookCard";
import SkeletonCard from "../common/SkeletonCard";

export default function TrendingBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/books/trending")
      .then((d) => setBooks(d.books || []))
      .catch((err) => setError(err.message || "Failed to load trending books"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-1.5">
            <TrendingUp size={14} /> Trending Now
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground dark:text-[#e8e4dc]">
            Hot This Week
          </h2>
        </div>
        <Link to="/books?sort=rating" className="text-sm text-primary font-semibold hover:underline hidden sm:block">
          View all →
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 mb-6 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading
          ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          : books.slice(0, 4).map((book) => (
              <BookCard key={book.googleId || book._id} book={book} />
            ))}
      </div>
    </section>
  );
}
