import { Link } from "react-router-dom";
import { ShoppingCart, Trash2 } from "lucide-react";
import SEO from "../components/common/SEO";
import EmptyState from "../components/common/EmptyState";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { formatPrice, getBookId } from "../utils/bookHelpers";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addToCart } = useCart();

  const moveToCart = async (item) => {
    await addToCart(item);
    await removeItem(item._id);
  };

  if (!items.length) {
    return (
      <>
        <SEO title="Wishlist" />
        <EmptyState
          title="Your wishlist is empty"
          message="Save books you love and come back to them anytime."
          action={<Link to="/books" className="px-6 py-3 rounded-xl bg-wine text-cream font-semibold">Browse Books</Link>}
        />
      </>
    );
  }

  return (
    <>
      <SEO title="Wishlist" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="font-display text-4xl font-bold text-brown dark:text-cream mb-8">My Wishlist</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="rounded-2xl overflow-hidden bg-white/80 dark:bg-[#1a1212] border border-beige dark:border-[#3d2525]">
              <Link to={`/books/${getBookId(item)}`}>
                <img src={item.coverImage} alt={item.title} className="w-full h-48 object-cover" loading="lazy" />
              </Link>
              <div className="p-5">
                <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                <p className="text-sm text-brown/60 mb-2">{item.author}</p>
                <p className="text-wine font-bold mb-4">{formatPrice(item.price)}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-wine text-cream text-sm font-semibold"
                  >
                    <ShoppingCart size={16} /> Move to Cart
                  </button>
                  <button onClick={() => removeItem(item._id)} className="w-10 h-10 rounded-xl border border-beige flex items-center justify-center text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
