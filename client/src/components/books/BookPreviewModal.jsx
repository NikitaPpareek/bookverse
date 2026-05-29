import { X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearch } from "../../contexts/SearchContext";
import { useCart } from "../../contexts/CartContext";
import { formatPrice, getBookId, formatPublishedDate } from "../../utils/bookHelpers";
import StarRating from "../common/StarRating";
import BookCover from "../common/BookCover";

export default function BookPreviewModal() {
  const { previewBook, setPreviewBook } = useSearch();
  const { addToCart } = useCart();

  if (!previewBook) return null;
  const id = getBookId(previewBook);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-2xl w-full bg-surface dark:bg-[#383532] rounded-2xl shadow-2xl overflow-hidden border border-secondary/50 dark:border-[#4a4540]">
        <button
          onClick={() => setPreviewBook(null)}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-accent dark:bg-[#3d3835] flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
        <div className="grid md:grid-cols-2 gap-0">
          <BookCover
            src={previewBook.coverImage}
            alt={previewBook.title}
            containerClass="h-64 md:h-full min-h-[260px]"
          />
          <div className="p-6 md:p-8">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">{previewBook.category}</span>
            <h2 className="font-display text-2xl font-bold text-foreground dark:text-[#e8e4dc] mt-1 mb-1">{previewBook.title}</h2>
            <p className="text-sm text-foreground/65 dark:text-[#e8e4dc]/65 mb-3">{previewBook.author}</p>
            <div className="mb-3">
              <StarRating rating={previewBook.rating} size={15} />
            </div>
            {previewBook.publishedDate && (
              <p className="text-xs text-foreground/45 mb-3">{formatPublishedDate(previewBook.publishedDate)}</p>
            )}
            <p className="text-sm text-foreground/55 dark:text-[#e8e4dc]/55 line-clamp-4 mb-4">{previewBook.description}</p>
            <p className="text-2xl font-bold text-primary mb-5">{formatPrice(previewBook.price)}</p>
            <div className="flex gap-2">
              <button
                onClick={() => { addToCart(previewBook); setPreviewBook(null); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <Link
                to={`/books/${id}`}
                onClick={() => setPreviewBook(null)}
                className="flex-1 py-2.5 rounded-lg border border-primary/40 text-primary dark:text-secondary text-sm text-center font-semibold hover:bg-primary/10 transition-colors"
              >
                Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
