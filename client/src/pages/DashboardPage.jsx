import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { User, Package, Heart, Settings, BookMarked, Loader2, ArrowRight, LogOut } from "lucide-react";
import SEO from "../components/common/SEO";
import ProtectedRoute from "../layouts/ProtectedRoute";
import { useAuth } from "../contexts/AuthContext";
import { useLibrary } from "../contexts/LibraryContext";
import api from "../services/api";

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
  const navigate = useNavigate();
  
  const { user, loadUser, logout } = useAuth(); 
  const { wishlist = [], saved = [], savedBooks = saved, clearLibrary } = useLibrary();
  
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState({ name: user?.name || "", phone: user?.phone || "" });
  
  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name || "", phone: user.phone || "" });
    }
  }, [user]);

  useEffect(() => {
    if (tab === "orders") {
      setLoadingData(true);
      api.get("/orders/my")
        .then((d) => setOrders(d.orders || d || []))
        .catch((err) => console.error("Error fetching orders:", err))
        .finally(() => setLoadingData(false));
    }
  }, [tab]);

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/auth/profile", profile);
      await loadUser();
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      // 1. Terminate user session context
      if (logout) {
        await logout(); 
      } else {
        localStorage.removeItem("token");
      }

      // 2. Erase booklists tracking state so lists don't leak to next login session
      if (clearLibrary) {
        clearLibrary();
      }

      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <SEO title="Dashboard" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="font-display text-4xl font-bold text-brown dark:text-cream mb-8">My Dashboard</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <nav className="lg:w-56 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setParams({ tab: id })}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
                  tab === id 
                    ? "bg-wine text-cream shadow-md font-medium" 
                    : "bg-white/80 dark:bg-[#1a1212] border border-beige dark:border-[#3d2525] text-brown/80 dark:text-cream/80 hover:bg-beige/20"
                }`}
              >
                <Icon size={18} /> {label}
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap transition-all mt-auto border border-red-200/40 dark:border-red-900/40 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 font-medium"
            >
              <LogOut size={18} /> Log Out
            </button>
          </nav>

          {/* Active Content Window */}
          <div className="flex-1 p-6 rounded-2xl bg-white/80 dark:bg-[#1a1212] border border-beige dark:border-[#3d2525] min-h-[400px] relative">
            
            {loadingData && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-black/20 rounded-2xl">
                <Loader2 className="animate-spin text-wine" size={32} />
              </div>
            )}

            {/* TAB: PROFILE */}
            {tab === "profile" && (
              <div>
                <h2 className="font-display text-2xl font-bold text-brown dark:text-cream mb-4">My Profile</h2>
                <div className="mb-6 space-y-1 text-sm">
                  <p className="text-brown/70 dark:text-cream/70"><strong>Email Address:</strong> {user?.email}</p>
                  <p className="text-brown/70 dark:text-cream/70"><strong>Account Role:</strong> <span className="capitalize text-wine font-semibold">{user?.role || "User"}</span></p>
                </div>
                <form onSubmit={saveProfile} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-brown/60 dark:text-cream/60">Full Name</label>
                    <input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-beige dark:border-[#3d2525] bg-transparent text-brown dark:text-cream focus:outline-wine"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-brown/60 dark:text-cream/60">Phone Number</label>
                    <input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-beige dark:border-[#3d2525] bg-transparent text-brown dark:text-cream focus:outline-wine"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-wine text-cream font-semibold hover:bg-wine/90 transition-colors disabled:opacity-50">
                    {saving ? "Saving Changes..." : "Save Profile"}
                  </button>
                </form>
              </div>
            )}

            {/* TAB: ORDERS */}
            {tab === "orders" && (
              <div>
                <h2 className="font-display text-2xl font-bold text-brown dark:text-cream mb-4">Order History</h2>
                {!orders.length ? (
                  <p className="text-brown/60 dark:text-cream/60">No orders placed yet. <Link to="/discover" className="text-wine font-medium hover:underline">Start exploring shelves</Link></p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((o) => (
                      <div key={o._id} className="p-4 rounded-xl border border-beige dark:border-[#3d2525] bg-white/40 dark:bg-black/20 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-brown dark:text-cream">Order #{o._id.slice(-6).toUpperCase()}</span>
                            <span className={`capitalize px-2 py-0.5 rounded-full text-xs font-medium ${o.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-beige text-brown'}`}>{o.status}</span>
                          </div>
                          <p className="text-xs text-brown/60 dark:text-cream/60">{new Date(o.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })} · {o.items?.length || 0} items</p>
                        </div>
                        <p className="text-wine font-bold text-lg">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(o.totalPrice)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: WISHLIST */}
            {tab === "wishlist" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-display text-2xl font-bold text-brown dark:text-cream">My Wishlist ({wishlist.length})</h2>
                  <Link to="/library" className="text-wine text-sm font-medium flex items-center gap-1 hover:underline">View Expanded Library <ArrowRight size={14} /></Link>
                </div>
                {!wishlist.length ? (
                  <p className="text-brown/60 dark:text-cream/60">Your wishlist is currently empty. Go favorite some books!</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlist.map((book) => (
                      <Link to={`/books/${book.id || book._id}`} key={book.id || book._id} className="p-3 rounded-xl border border-beige dark:border-[#3d2525] flex gap-3 items-center hover:bg-beige/10 transition-colors bg-white/50 dark:bg-black/10">
                        <img src={book.coverImage || '/book-placeholder.png'} alt={book.title} className="w-12 h-16 object-cover rounded shadow" />
                        <div className="overflow-hidden">
                          <h4 className="font-medium text-sm text-brown dark:text-cream truncate">{book.title}</h4>
                          <p className="text-xs text-brown/60 dark:text-cream/60 truncate">{book.author || 'Unknown Author'}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: SAVED */}
            {tab === "saved" && (
              <div>
                <h2 className="font-display text-2xl font-bold text-brown dark:text-cream mb-4">Saved Books ({savedBooks.length})</h2>
                {!savedBooks.length ? (
                  <p className="text-brown/60 dark:text-cream/60">No books bookmarked yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {savedBooks.map((book) => (
                      <Link to={`/books/${book.id || book._id}`} key={book.id || book._id} className="p-3 rounded-xl border border-beige dark:border-[#3d2525] flex gap-3 items-center hover:bg-beige/10 transition-colors bg-white/50 dark:bg-black/10">
                        <img src={book.coverImage || '/book-placeholder.png'} alt={book.title} className="w-12 h-16 object-cover rounded shadow" />
                        <div className="overflow-hidden">
                          <h4 className="font-medium text-sm text-brown dark:text-cream truncate">{book.title}</h4>
                          <p className="text-xs text-brown/60 dark:text-cream/60 truncate">{book.author || 'Unknown Author'}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: SETTINGS */}
            {tab === "settings" && (
              <div>
                <h2 className="font-display text-2xl font-bold text-brown dark:text-cream mb-4">Account Settings</h2>
                <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 text-sm text-orange-800 dark:text-orange-300 max-w-md">
                  To security-update or change your existing password, please use the credential reset modules at login or contact system admin management.
                </div>
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