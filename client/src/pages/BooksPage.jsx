import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import SEO from "../components/common/SEO";
import BookCard from "../components/books/BookCard";
import SkeletonCard from "../components/common/SkeletonCard";
import EmptyState from "../components/common/EmptyState";
import SearchBar from "../components/books/SearchBar";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import api from "../services/api";
import { SORT_OPTIONS, CATEGORIES } from "../utils/constants";
import { useSearch } from "../contexts/SearchContext";

export default function BooksPage() {
  const [params, setParams] = useSearchParams();
  const { addToHistory } = useSearch();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const q = params.get("q") || "";
  const category = params.get("category") || "";
  const sort = params.get("sort") || "relevance";
  const minRating = params.get("minRating") || "";
  const minPrice = params.get("minPrice") || "";
  const maxPrice = params.get("maxPrice") || "";
  const author = params.get("author") || "";

  const fetchBooks = useCallback(
    async (pageNum, append = false) => {
      setLoading(true);
      setError("");
      try {
        const query = new URLSearchParams({
          q: q || "fiction",
          page: pageNum,
          limit: 12,
          sort,
          source: "google",
          ...(category && { category }),
          ...(author && { author }),
          ...(minRating && { minRating }),
          ...(minPrice && { minPrice }),
          ...(maxPrice && { maxPrice }),
        });
        const data = await api.get(`/books?${query}`);
        setBooks((prev) => (append ? [...prev, ...data.books] : data.books));
        setHasMore(pageNum < (data.pages || 1));
        if (q) addToHistory(q);
      } catch (err) {
        setError(err.message);
        if (!append) setBooks([]);
      } finally {
        setLoading(false);
      }
    },
    [q, category, sort, author, minRating, minPrice, maxPrice, addToHistory]
  );

  useEffect(() => {
    setPage(1);
    fetchBooks(1, false);
  }, [fetchBooks]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchBooks(next, true);
  };

  const lastRef = useInfiniteScroll({ onLoadMore: loadMore, hasMore, loading });

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  return (
    <>
      <SEO title="Books" description="Browse and filter thousands of books on BookVerse." />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brown dark:text-cream mb-4">Browse Books</h1>
          <SearchBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:w-64 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-32 p-6 rounded-2xl bg-white/80 dark:bg-[#1a1212] border border-beige dark:border-[#3d2525] space-y-5">
              <h3 className="font-semibold text-brown dark:text-cream flex items-center gap-2">
                <SlidersHorizontal size={18} /> Filters
              </h3>
              <div>
                <label className="text-sm font-medium text-brown/70 dark:text-cream/70">Category</label>
                <select
                  value={category}
                  onChange={(e) => updateFilter("category", e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-beige bg-transparent text-brown dark:text-cream"
                >
                  <option value="">All</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Min Rating</label>
                <select
                  value={minRating}
                  onChange={(e) => updateFilter("minRating", e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-beige bg-transparent"
                >
                  <option value="">Any</option>
                  {[4, 3.5, 3].map((r) => (
                    <option key={r} value={r}>{r}+ stars</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Min $</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => updateFilter("minPrice", e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-beige bg-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Max $</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => updateFilter("maxPrice", e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-beige bg-transparent"
                    placeholder="50"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Author</label>
                <input
                  value={author}
                  onChange={(e) => updateFilter("author", e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-beige bg-transparent"
                  placeholder="Author name"
                />
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-beige"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
              <select
                value={sort}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="px-4 py-2 rounded-xl border border-beige bg-white dark:bg-[#1a1212] text-brown dark:text-cream"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <p className="text-sm text-brown/60 dark:text-cream/60">
                {q ? `Results for "${q}"` : "All books"}
              </p>
            </div>

            {error && (
              <div className="p-4 mb-6 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200">
                {error}. Make sure the server is running.
              </div>
            )}

            {loading && !books.length ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : books.length ? (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {books.map((book) => (
                    <BookCard key={book.googleId || book._id} book={book} />
                  ))}
                </div>
                {hasMore && <div ref={lastRef} className="h-20 flex items-center justify-center mt-8">
                  {loading && <span className="text-brown/50">Loading more...</span>}
                </div>}
              </>
            ) : (
              <EmptyState title="No books found" message="Try adjusting your filters or search term." />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
