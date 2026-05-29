import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { User, Package, Heart, Settings, BookMarked } from "lucide-react";
import SEO from "../components/common/SEO";
import ProtectedRoute from "../layouts/ProtectedRoute";
import { useAuth } from "../contexts/AuthContext";
import { useWishlist } from "../contexts/WishlistContext";
import api from "../services/api";
import { formatPrice } from "../utils/bookHelpers";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "saved", label: "Saved Books", icon: BookMarked },
  { id: "settings", label: "Settings", icon: Settings },
];

function DashboardContent() {
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") || "profile";
  const { user, loadUser } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState({ name: user?.name || "", phone: user?.phone || "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (tab === "orders") {
      api.get("/orders/my").then((d) => setOrders(d.orders || [])).catch(() => {});
    }
  }, [tab]);

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/auth/profile", profile);
      await loadUser();
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SEO title="Dashboard" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="font-display text-4xl font-bold text-brown dark:text-cream mb-8">My Dashboard</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <nav className="lg:w-56 flex lg:flex-col gap-2 overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setParams({ tab: id })}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap transition-colors ${
                  tab === id ? "bg-wine text-cream" : "bg-white/80 dark:bg-[#1a1212] border border-beige dark:border-[#3d2525]"
                }`}
              >
                <Icon size={18} /> {label}
              </button>
            ))}
          </nav>
          <div className="flex-1 p-6 rounded-2xl bg-white/80 dark:bg-[#1a1212] border border-beige dark:border-[#3d2525]">
            {tab === "profile" && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">Profile</h2>
                <p className="text-brown/70 mb-4"><strong>Email:</strong> {user?.email}</p>
                <p className="text-brown/70 mb-4"><strong>Role:</strong> {user?.role}</p>
                <form onSubmit={saveProfile} className="space-y-4 max-w-md">
                  <input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-beige bg-transparent"
                    placeholder="Name"
                  />
                  <input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-beige bg-transparent"
                    placeholder="Phone"
                  />
                  <button type="submit" disabled={saving} className="px-6 py-2 rounded-xl bg-wine text-cream font-semibold">
                    {saving ? "Saving..." : "Save Profile"}
                  </button>
                </form>
              </div>
            )}
            {tab === "orders" && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">Order History</h2>
                {!orders.length ? (
                  <p className="text-brown/60">No orders yet. <Link to="/books" className="text-wine">Start shopping</Link></p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((o) => (
                      <div key={o._id} className="p-4 rounded-xl border border-beige dark:border-[#3d2525]">
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold">Order #{o._id.slice(-6)}</span>
                          <span className="capitalize px-2 py-0.5 rounded-full bg-beige/50 text-sm">{o.status}</span>
                        </div>
                        <p className="text-sm text-brown/60">{new Date(o.createdAt).toLocaleDateString()} · {o.items?.length} items</p>
                        <p className="text-wine font-bold mt-1">{formatPrice(o.totalPrice)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {tab === "wishlist" && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">Wishlist ({wishlistItems.length})</h2>
                <Link to="/wishlist" className="text-wine hover:underline">View full wishlist →</Link>
              </div>
            )}
            {tab === "saved" && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">Saved Books</h2>
                <p className="text-brown/60">Books you&apos;ve recently viewed appear on the home page.</p>
              </div>
            )}
            {tab === "settings" && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">Account Settings</h2>
                <p className="text-brown/60 mb-4">Update your password from the profile section.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
