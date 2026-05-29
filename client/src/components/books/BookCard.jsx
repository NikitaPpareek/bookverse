import { useState } from "react";
import { Link } from "react-router-dom";
import { HiHeart, HiOutlineHeart, HiShare, HiExternalLink } from "react-icons/hi";
import { FiBookmark } from "react-icons/fi";
import BookCover from "../common/BookCover";
import StarRating from "../common/StarRating";
import { getBookId, normalizeBook, formatPublishedDate, getPublishedYear, shareBook } from "../../utils/bookHelpers";
import { useLibrary } from "../../contexts/LibraryContext";
import { useToast } from "../../contexts/ToastContext";

export default function BookCard({ book }) {
  const b = normalizeBook(book);
  const id = getBookId(b);
  const { isInWishlist, isSaved, toggleWishlist, toggleSaved } = useLibrary();
  const { toast } = useToast();
  const [sharing, setSharing] = useState(false);
  const wished = isInWishlist(b);
  const saved = isSaved(b);
  const published = formatPublishedDate(b.publishedDate);
  const year = getPublishedYear(b.publishedDate);

  const handleShare = async (e) => {
    e.preventDefault();
    setSharing(true);
    try {
      const usedNative = await shareBook(b);
      toast(usedNative ? "Shared!" : "Link copied to clipboard");
    } catch {
      toast("Could not share", "info");
    } finally {
      setSharing(false);
    }
  };

  return (
    <article className="group flex flex-col rounded-xl overflow-hidden bg-card dark:bg-dark-card border border-border dark:border-dark-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] dark:hover:shadow-black/40 hover:-translate-y-1 hover:border-primary/20 transition-all duration-300">
      <div className="relative overflow-hidden bg-[#f0ebe3] dark:bg-dark-elevated">
        <Link to={`/books/${id}`} className="block">
          <BookCover
            src={b.coverImage}
            alt={b.title}
            containerClass="aspect-[2/3] w-full"
            className="group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(b);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md border transition-all ${
              wished
                ? "bg-primary text-white border-primary"
                : "bg-card text-primary border-border hover:bg-primary hover:text-white"
            }`}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          >
            {wished ? <HiHeart size={15} /> : <HiOutlineHeart size={15} />}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSaved(b);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md border transition-all ${
              saved
                ? "bg-secondary text-white border-secondary"
                : "bg-card text-primary border-border hover:bg-accent"
            }`}
            aria-label={saved ? "Unsave book" : "Save book"}
          >
            <FiBookmark size={14} fill={saved ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleShare}
            disabled={sharing}
            className="w-8 h-8 rounded-full bg-card text-primary flex items-center justify-center shadow-md border border-border hover:bg-surface transition-all"
            aria-label="Share book"
          >
            <HiShare size={14} />
          </button>
        </div>
      </div>

      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        <span className="inline-block self-start px-2 py-0.5 rounded-md bg-surface dark:bg-dark-elevated text-[10px] font-bold text-primary dark:text-lavender mb-2 uppercase tracking-wide">
          {b.category || "General"}
        </span>

        <Link to={`/books/${id}`}>
          <h3 className="font-display text-base font-bold text-foreground dark:text-[#f0eef2] line-clamp-2 mb-1 leading-snug group-hover:text-primary transition-colors">
            {b.title}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm text-muted dark:text-[#f0eef2]/55 mb-2.5 line-clamp-1">{b.author}</p>

        <div className="flex items-center justify-between mb-3 mt-auto">
          <StarRating rating={b.rating} size={12} />
          {(published || year) && (
            <span className="text-[11px] font-medium text-muted tabular-nums">{year || published}</span>
          )}
        </div>

        <Link
          to={`/books/${id}`}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-white text-xs font-bold tracking-wide hover:bg-primary-hover transition-colors shadow-sm"
        >
          <HiExternalLink size={13} /> View Details
        </Link>
      </div>
    </article>
  );
}
