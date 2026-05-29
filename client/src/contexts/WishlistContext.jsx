import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";
import { getBookId, normalizeBook } from "../utils/bookHelpers";

const WishlistContext = createContext();
const LOCAL_KEY = "bv_guest_wishlist";

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState([]);

  const loadWishlist = useCallback(async () => {
    if (user) {
      try {
        const { wishlist } = await api.get("/wishlist");
        setItems(wishlist.items || []);
      } catch {
        setItems([]);
      }
    } else {
      const saved = localStorage.getItem(LOCAL_KEY);
      setItems(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  useEffect(() => {
    if (!user) localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  }, [items, user]);

  const isInWishlist = (book) => {
    const id = getBookId(normalizeBook(book));
    return items.some((i) => i.googleId === id || String(i.book) === String(id) || i._localId === id);
  };

  const toggleWishlist = async (book) => {
    const b = normalizeBook(book);
    const id = getBookId(b);

    if (isInWishlist(b)) {
      const item = items.find((i) => i.googleId === id || i._localId === id);
      if (user && item?._id) {
        const { wishlist } = await api.delete(`/wishlist/${item._id}`);
        setItems(wishlist.items);
      } else {
        setItems((prev) => prev.filter((i) => (i.googleId || i._localId) !== id));
      }
      toast("Removed from wishlist", "info");
      return;
    }

    const payload = {
      book: b._id,
      googleId: b.googleId || b.id,
      title: b.title,
      author: b.author,
      coverImage: b.coverImage,
      price: b.price,
      category: b.category,
      description: b.description,
      rating: b.rating,
    };

    if (user) {
      const { wishlist } = await api.post("/wishlist", payload);
      setItems(wishlist.items);
    } else {
      setItems((prev) => [...prev, { ...payload, _localId: id, _id: id }]);
    }
    toast("Added to wishlist");
  };

  const removeItem = async (itemId) => {
    if (user) {
      const { wishlist } = await api.delete(`/wishlist/${itemId}`);
      setItems(wishlist.items);
    } else {
      setItems((prev) => prev.filter((i) => String(i._id) !== String(itemId)));
    }
  };

  return (
    <WishlistContext.Provider value={{ items, isInWishlist, toggleWishlist, removeItem, loadWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
