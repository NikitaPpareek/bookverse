import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import SEO from "../components/common/SEO";
import EmptyState from "../components/common/EmptyState";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { formatPrice } from "../utils/bookHelpers";
import api from "../services/api";
import { useToast } from "../contexts/ToastContext";
import { useState } from "react";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [checkingOut, setCheckingOut] = useState(false);

  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const checkout = async () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: "/cart" } } });
      return;
    }
    setCheckingOut(true);
    try {
      await api.post("/orders", {
        shippingAddress: user.address || { city: "Default City", country: "US" },
      });
      await clearCart();
      toast("Order placed successfully!");
      navigate("/dashboard?tab=orders");
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setCheckingOut(false);
    }
  };

  if (!items.length) {
    return (
      <>
        <SEO title="Cart" />
        <EmptyState
          title="Your cart is empty"
          message="Discover amazing books and add them to your cart."
          action={
            <Link to="/books" className="px-6 py-3 rounded-xl bg-wine text-cream font-semibold">
              Browse Books
            </Link>
          }
        />
      </>
    );
  }

  return (
    <>
      <SEO title="Shopping Cart" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="font-display text-4xl font-bold text-brown dark:text-cream mb-8">Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 p-4 rounded-2xl bg-white/80 dark:bg-[#1a1212] border border-beige dark:border-[#3d2525]"
              >
                <img src={item.coverImage} alt={item.title} className="w-20 h-28 object-cover rounded-lg" loading="lazy" />
                <div className="flex-1">
                  <h3 className="font-semibold text-brown dark:text-cream">{item.title}</h3>
                  <p className="text-sm text-brown/60 dark:text-cream/60">{item.author}</p>
                  <p className="text-wine font-bold mt-1">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 rounded-lg border border-beige flex items-center justify-center"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-semibold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-beige flex items-center justify-center"
                    >
                      <Plus size={14} />
                    </button>
                    <button onClick={() => removeItem(item._id)} className="ml-auto text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="font-bold text-brown dark:text-cream">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#1a1212] border border-beige dark:border-[#3d2525] h-fit sticky top-32">
            <h2 className="font-display text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-3 text-brown/80 dark:text-cream/80 mb-6">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>{formatPrice(tax)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></div>
              <div className="flex justify-between font-bold text-lg text-brown dark:text-cream pt-3 border-t border-beige">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
            <button
              onClick={checkout}
              disabled={checkingOut}
              className="w-full py-3.5 rounded-xl bg-wine text-cream font-semibold hover:bg-brown disabled:opacity-60 transition-colors"
            >
              {checkingOut ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
