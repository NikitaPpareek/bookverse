import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";
import { getBookId, normalizeBook } from "../utils/bookHelpers";

const CartContext = createContext();
const LOCAL_KEY = "bv_guest_cart";

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = useCallback(async () => {
    if (user) {
      setLoading(true);
      try {
        const { cart } = await api.get("/cart");
        setItems(cart.items || []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    } else {
      const saved = localStorage.getItem(LOCAL_KEY);
      setItems(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    if (!user) localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  }, [items, user]);

  const addToCart = async (book, qty = 1) => {
    const b = normalizeBook(book);
    const payload = {
      book: b._id,
      googleId: b.googleId || b.id,
      title: b.title,
      author: b.author,
      coverImage: b.coverImage,
      price: b.price,
      quantity: qty,
    };

    if (user) {
      const { cart } = await api.post("/cart", payload);
      setItems(cart.items);
    } else {
      setItems((prev) => {
        const key = getBookId(b);
        const existing = prev.find((i) => (i.googleId || i._localId) === key);
        if (existing) {
          return prev.map((i) =>
            (i.googleId || i._localId) === key ? { ...i, quantity: i.quantity + qty } : i
          );
        }
        return [...prev, { ...payload, _localId: key, _id: key }];
      });
    }
    toast(`"${b.title}" added to cart`);
  };

  const updateQuantity = async (itemId, quantity) => {
    if (user) {
      const { cart } = await api.put(`/cart/${itemId}`, { quantity });
      setItems(cart.items);
    } else {
      setItems((prev) =>
        prev.map((i) => (String(i._id) === String(itemId) ? { ...i, quantity } : i))
      );
    }
  };

  const removeItem = async (itemId) => {
    if (user) {
      const { cart } = await api.delete(`/cart/${itemId}`);
      setItems(cart.items);
    } else {
      setItems((prev) => prev.filter((i) => String(i._id) !== String(itemId)));
    }
    toast("Item removed from cart", "info");
  };

  const clearCart = async () => {
    if (user) await api.delete("/cart");
    setItems([]);
  };

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, loading, count, subtotal, addToCart, updateQuantity, removeItem, clearCart, loadCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
