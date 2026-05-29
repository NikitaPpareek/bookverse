import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HiHeart, HiOutlineHeart, HiShare, HiCalendar, HiBookOpen } from "react-icons/hi";
import { FiBookmark } from "react-icons/fi";
import SEO from "../components/common/SEO";
import StarRating from "../components/common/StarRating";
import BookCard from "../components/books/BookCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { getBookById, searchBooks } from "../services/googleBooks";
import { formatPublishedDate, getBookId, shareBook, trackRecentlyViewed } from "../utils/bookHelpers";
import BookCover from "../components/common/BookCover";
import { useLibrary } from "../contexts/LibraryContext";
import { useToast } from "../contexts/ToastContext";

export default function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isInWishlist, isSaved, toggleWishlist, toggleSaved } = useLibrary();
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    setBook(null);
    getBookById(id)
      .then((data) => {
        setBook(data);
        trackRecentlyViewed(data);
        const cat = data.category || "fiction";
        return searchBooks(cat, { maxResults: 5 });
      })
      .then((result) =>
        setRelated((result.books || []).filter((b) => getBookId(b) !== id).slice(0, 4))
      )
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = async () => {
    try {
      const native = await shareBook(book);
      toast(native ? "Shared!" : "Link copied to clipboard");
    } catch {
      toast("Could not share", "info");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="font-display text-3xl text-foreground dark:text-[#f0eef2]">Book not found</h2>
        <Link to="/discover" className="text-primary mt-4 inline-block hover:underline">
          ← Back to discover
        </Link>
      </div>
    );
  }

  const wished = isInWishlist(book);
  const saved = isSaved(book);

  return (
    <>
      <SEO title={book.title} description={book.description?.slice(0, 160)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 mb-14">
          <div className="rounded-2xl overflow-hidden bg-card dark:bg-dark-card shadow-md border border-border dark:border-dark-border">
            <BookCover
              src={book.coverImage}
              alt={book.title}
              containerClass="min-h-[380px] max-h-[520px]"
              className="p-6"
            />
          </div>

          <div>
            <span className="px-2.5 py-1 rounded-full bg-surface dark:bg-dark-elevated text-xs font-semibold text-primary dark:text-lavender">
              {book.category}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground dark:text-[#f0eef2] mt-3 mb-2">
              {book.title}
            </h1>
            <p className="text-lg text-muted dark:text-[#f0eef2]/60 mb-4">
              by {book.author}
            </p>
            <StarRating rating={book.rating} size={18} count={book.ratingsCount} />

            <p className="text-muted dark:text-[#f0eef2]/70 leading-relaxed my-6 line-clamp-4 lg:line-clamp-none">
              {book.description}
            </p>

            <dl className="grid sm:grid-cols-2 gap-3 text-sm mb-6">
              {book.publisher && (
                <div className="p-3 rounded-xl bg-surface dark:bg-dark-elevated border border-border/60 dark:border-dark-border">
                  <dt className="text-muted text-xs uppercase tracking-wide">Publisher</dt>
                  <dd className="font-medium mt-0.5">{book.publisher}</dd>
                </div>
              )}
              {book.pageCount > 0 && (
                <div className="p-3 rounded-xl bg-surface dark:bg-dark-elevated border border-border/60 dark:border-dark-border">
                  <dt className="text-muted text-xs uppercase tracking-wide">Pages</dt>
                  <dd className="font-medium mt-0.5 flex items-center gap-1">
                    <HiBookOpen size={14} /> {book.pageCount}
                  </dd>
                </div>
              )}
              {book.publishedDate && (
                <div className="p-3 rounded-xl bg-surface dark:bg-dark-elevated border border-border/60 dark:border-dark-border">
                  <dt className="text-muted text-xs uppercase tracking-wide">Published</dt>
                  <dd className="font-medium mt-0.5 flex items-center gap-1">
                    <HiCalendar size={14} /> {formatPublishedDate(book.publishedDate)}
                  </dd>
                </div>
              )}
              {book.language && (
                <div className="p-3 rounded-xl bg-surface dark:bg-dark-elevated border border-border/60 dark:border-dark-border">
                  <dt className="text-muted text-xs uppercase tracking-wide">Language</dt>
                  <dd className="font-medium mt-0.5 uppercase">{book.language}</dd>
                </div>
              )}
            </dl>

            {(book.categories || []).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {(book.categories || [book.category]).map((c) => (
                  <Link
                    key={c}
                    to={`/discover?genre=${encodeURIComponent(c)}`}
                    className="px-2.5 py-1 rounded-full border border-border text-xs text-muted hover:border-primary hover:text-primary transition-colors"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleWishlist(book)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-colors ${
                  wished
                    ? "bg-primary text-white shadow-sm"
                    : "border border-border text-primary dark:text-lavender hover:border-primary hover:bg-primary/5"
                }`}
              >
                {wished ? <HiHeart size={18} /> : <HiOutlineHeart size={18} />}
                {wished ? "Saved to Wishlist" : "Save Book"}
              </button>
              <button
                onClick={() => toggleSaved(book)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-colors ${
                  saved
                    ? "bg-secondary text-foreground"
                    : "border border-border hover:bg-surface dark:hover:bg-dark-elevated"
                }`}
              >
                <FiBookmark size={18} fill={saved ? "currentColor" : "none"} />
                {saved ? "Saved" : "Reading List"}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border font-semibold text-sm hover:bg-surface dark:hover:bg-dark-elevated transition-colors"
              >
                <HiShare size={18} /> Share Book
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold mb-6 text-foreground dark:text-[#f0eef2]">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((b) => (
                <BookCard key={getBookId(b)} book={b} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
