import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { HiAdjustments } from "react-icons/hi";
import SEO from "../components/common/SEO";
import BookCard from "../components/books/BookCard";
import SkeletonCard from "../components/common/SkeletonCard";
import EmptyState from "../components/common/EmptyState";
import SearchBar from "../components/books/SearchBar";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { searchBooks } from "../services/googleBooks";
import { SEARCH_FILTERS, CATEGORIES } from "../utils/constants";
import { useSearch } from "../contexts/SearchContext";

export default function DiscoverPage() {
  const [params, setParams] = useSearchParams();
  const { addToHistory } = useSearch();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const q = params.get("q") || "";
  const filter = params.get("filter") || "all";
  const genre = params.get("genre") || "";
  const free = params.get("free") === "1";
  const isNew = params.get("new") === "1";
  const focus = params.get("focus") === "1";

  const fetchBooks = useCallback(
    async (index, append = false) => {
      setLoading(true);
      setError("");
      try {
        const result = await searchBooks(q || genre || "bestseller", {
          startIndex: index,
          maxResults: 12,
          filterType: filter,
          genre,
          freeEbooks: free,
          newReleases: isNew,
          orderBy: isNew ? "newest" : "relevance",
        });
        setBooks((prev) => (append ? [...prev, ...result.books] : result.books));
        setHasMore(result.hasMore);
        if (q) addToHistory(q);
      } catch (err) {
        setError(err.message);
        if (!append) setBooks([]);
      } finally {
        setLoading(false);
      }
    },
    [q, filter, genre, free, isNew, addToHistory]
  );

  useEffect(() => {
    setStartIndex(0);
    fetchBooks(0, false);
  }, [fetchBooks]);

  const loadMore = () => {
    const next = startIndex + 12;
    setStartIndex(next);
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
      <SEO title="Discover" description="Search and explore millions of books on BookVerse." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground dark:text-[#f0eef2] mb-2">
            Discover Books
          </h1>
          <p className="text-muted dark:text-[#f0eef2]/55 mb-6 text-sm">
            Instant search powered by Google Books
          </p>
          <SearchBar autoFocus={focus} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:w-64 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-28 p-5 rounded-2xl bg-card dark:bg-dark-card border border-border dark:border-dark-border shadow-sm space-y-5">
              <h3 className="font-semibold text-foreground dark:text-[#f0eef2] flex items-center gap-2">
                <HiAdjustments size={18} /> Filters
              </h3>

              <div>
                <label className="text-sm font-medium text-muted">Search by</label>
                <select
                  value={filter}
                  onChange={(e) => updateFilter("filter", e.target.value === "all" ? "" : e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-border dark:border-dark-border bg-background text-sm text-foreground"
                >
                  {SEARCH_FILTERS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-muted">Genre</label>
                <select
                  value={genre}
                  onChange={(e) => updateFilter("genre", e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-border dark:border-dark-border bg-background text-sm text-foreground"
                >
                  <option value="">All genres</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={free}
                  onChange={(e) => updateFilter("free", e.target.checked ? "1" : "")}
                  className="rounded accent-primary"
                />
                Free ebooks only
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => updateFilter("new", e.target.checked ? "1" : "")}
                  className="rounded accent-primary"
                />
                New releases
              </label>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-border dark:border-dark-border bg-card text-sm"
              >
                <HiAdjustments size={16} /> Filters
              </button>
              <p className="text-sm text-muted dark:text-[#f0eef2]/50">
                {q ? `Results for "${q}"` : genre ? `${genre} books` : "Explore the catalog"}
              </p>
            </div>

            {error && (
              <div className="p-4 mb-6 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-sm">
                {error}
              </div>
            )}

            {loading && !books.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : books.length ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
                {hasMore && (
                  <div ref={lastRef} className="h-20 flex items-center justify-center mt-8">
                    {loading && <span className="text-muted text-sm">Loading more...</span>}
                  </div>
                )}
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
