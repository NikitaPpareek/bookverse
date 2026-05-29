import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiSearch, HiX, HiClock, HiTrendingUp } from "react-icons/hi";
import { FiLoader } from "react-icons/fi";
import useDebounce from "../../hooks/useDebounce";
import { getSuggestions } from "../../services/googleBooks";
import { useSearch } from "../../contexts/SearchContext";
import { TRENDING_SEARCHES, POPULAR_SEARCHES } from "../../utils/constants";
import BookCover from "../common/BookCover";
import StarRating from "../common/StarRating";
import { formatPublishedDate } from "../../utils/bookHelpers";

export default function SearchBar({ large = false, autoFocus = false }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const debounced = useDebounce(input, 350);
  const navigate = useNavigate();
  const { history, addToHistory, clearHistory } = useSearch();
  const ref = useRef(null);

  useEffect(() => {
    if (!debounced || debounced.length < 2) {
      setSuggestions([]);
      setError("");
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError("");
    getSuggestions(debounced)
      .then((data) => {
        if (!cancelled) setSuggestions(data);
      })
      .catch(() => {
        if (!cancelled) {
          setSuggestions([]);
          setError("Search unavailable. Please try again.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goToBook = (id) => {
    setOpen(false);
    setInput("");
    navigate(`/books/${id}`);
  };

  const submitSearch = (q = input) => {
    if (!q.trim()) return;
    addToHistory(q.trim());
    setOpen(false);
    navigate(`/discover?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div ref={ref} className={`relative w-full ${large ? "" : "max-w-2xl"}`}>
      <div
        className={`flex items-center gap-2 bg-card dark:bg-dark-card rounded-2xl border-2 border-border dark:border-dark-border transition-all px-3 ${
          large ? "py-2 search-prominent" : "py-1 shadow-sm focus-within:shadow-md focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/12"
        }`}
      >
        <HiSearch className="text-primary dark:text-lavender shrink-0" size={large ? 22 : 18} />
        <input
          type="search"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && submitSearch()}
          placeholder="Search by title, author, or genre..."
          autoFocus={autoFocus}
          autoComplete="off"
          aria-label="Search books"
          className={`flex-1 bg-transparent outline-none text-foreground dark:text-[#f0eef2] placeholder:text-muted/70 font-medium ${
            large ? "py-2.5 text-base" : "py-2 text-sm"
          }`}
        />
        {loading && <FiLoader size={18} className="animate-spin text-primary shrink-0" />}
        {input && !loading && (
          <button
            onClick={() => setInput("")}
            className="text-muted hover:text-foreground p-1"
            aria-label="Clear search"
          >
            <HiX size={16} />
          </button>
        )}
        <button
          onClick={() => submitSearch()}
          className={`shrink-0 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-all shadow-sm hover:shadow-md ${
            large ? "px-5 py-2 text-sm" : "px-4 py-1.5 text-xs"
          }`}
        >
          Search
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border shadow-xl overflow-hidden z-50 animate-fade-in">
          {error && (
            <p className="px-4 py-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20">
              {error}
            </p>
          )}

          {loading && (
            <div className="p-3 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 p-2">
                  <div className="skeleton w-10 h-14 rounded shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="skeleton h-3 w-3/4 rounded" />
                    <div className="skeleton h-2.5 w-1/2 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && suggestions.length > 0 && (
            <>
              <p className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                Suggestions
              </p>
              <ul className="max-h-[320px] overflow-y-auto pb-2">
                {suggestions.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => goToBook(s.id)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface dark:hover:bg-dark-elevated text-left transition-colors group"
                    >
                      <BookCover src={s.coverImage} alt={s.title} containerClass="w-10 h-14 shrink-0 rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground dark:text-[#f0eef2] line-clamp-1 group-hover:text-primary">
                          {s.title}
                        </p>
                        <p className="text-xs text-muted">{s.author}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {s.rating != null && <StarRating rating={s.rating} size={11} showValue={false} />}
                          {s.publishedDate && (
                            <span className="text-[10px] text-muted/70">
                              {formatPublishedDate(s.publishedDate)}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => submitSearch()}
                className="w-full px-4 py-2.5 text-sm text-primary dark:text-lavender font-medium border-t border-border dark:border-dark-border hover:bg-surface dark:hover:bg-dark-elevated transition-colors"
              >
                See all results for &ldquo;{input}&rdquo;
              </button>
            </>
          )}

          {!loading && !suggestions.length && input.length < 2 && (
            <div className="p-4">
              {history.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted flex items-center gap-1">
                      <HiClock size={12} /> Recent searches
                    </span>
                    <button onClick={clearHistory} className="text-[11px] text-primary hover:underline">
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {history.map((h) => (
                      <button
                        key={h}
                        onClick={() => submitSearch(h)}
                        className="px-2.5 py-1 rounded-lg bg-surface dark:bg-dark-elevated text-xs text-foreground hover:bg-primary hover:text-white transition-colors"
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted flex items-center gap-1 mb-2">
                <HiTrendingUp size={12} /> Trending
              </span>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {TRENDING_SEARCHES.map((t) => (
                  <button
                    key={t}
                    onClick={() => submitSearch(t)}
                    className="px-2.5 py-1 rounded-lg border border-border text-xs text-muted hover:border-primary hover:text-primary transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2 block">
                Popular
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SEARCHES.map((t) => (
                  <button
                    key={t}
                    onClick={() => submitSearch(t)}
                    className="px-2.5 py-1 rounded-lg bg-surface dark:bg-dark-elevated text-xs text-muted hover:text-primary transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!loading && input.length >= 2 && !suggestions.length && !error && (
            <p className="p-5 text-center text-sm text-muted">No books found. Try a different term.</p>
          )}
        </div>
      )}
    </div>
  );
}
