import { useState, useEffect } from "react";
import { BarChart3, Users, BookOpen, Package, DollarSign } from "lucide-react";
import SEO from "../components/common/SEO";
import ProtectedRoute from "../layouts/ProtectedRoute";
import api from "../services/api";
import { formatPrice } from "../utils/bookHelpers";

const adminTabs = ["analytics", "users", "books", "orders"];

function AdminContent() {
  const [tab, setTab] = useState("analytics");
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (tab === "analytics") api.get("/orders/analytics").then((d) => setAnalytics(d.analytics)).catch(() => {});
    if (tab === "users") api.get("/users").then((d) => setUsers(d.users || [])).catch(() => {});
    if (tab === "books") api.get("/books?limit=20").then((d) => setBooks(d.books || [])).catch(() => {});
    if (tab === "orders") api.get("/orders/all").then((d) => setOrders(d.orders || [])).catch(() => {});
  }, [tab]);

  const updateOrderStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
  };

  return (
    <>
      <SEO title="Admin Dashboard" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="font-display text-4xl font-bold text-brown dark:text-cream mb-8">Admin Dashboard</h1>
        <div className="flex flex-wrap gap-2 mb-8">
          {adminTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-xl capitalize font-semibold transition-colors ${
                tab === t ? "bg-wine text-cream" : "bg-white/80 dark:bg-[#1a1212] border border-beige"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "analytics" && analytics && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: DollarSign, label: "Revenue", value: formatPrice(analytics.revenue) },
              { icon: Package, label: "Orders", value: analytics.totalOrders },
              { icon: BarChart3, label: "Avg Order", value: formatPrice(analytics.averageOrder) },
              { icon: Users, label: "Status Groups", value: analytics.byStatus?.length || 0 },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="p-6 rounded-2xl bg-wine text-cream">
                <Icon className="mb-2 opacity-80" size={24} />
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-cream/80 text-sm">{label}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "users" && (
          <div className="overflow-x-auto rounded-2xl border border-beige dark:border-[#3d2525]">
            <table className="w-full text-left">
              <thead className="bg-beige/30 dark:bg-[#2a1a1a]">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t border-beige dark:border-[#3d2525]">
                    <td className="p-4">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4 capitalize">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "books" && (
          <div className="grid gap-4">
            {books.map((b) => (
              <div key={b.googleId || b._id} className="flex items-center gap-4 p-4 rounded-xl border border-beige dark:border-[#3d2525]">
                <BookOpen size={20} className="text-wine shrink-0" />
                <div>
                  <p className="font-semibold">{b.title}</p>
                  <p className="text-sm text-brown/60">{b.author} · {formatPrice(b.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "orders" && (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o._id} className="p-4 rounded-xl border border-beige dark:border-[#3d2525] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{o.user?.name || "User"} · {formatPrice(o.totalPrice)}</p>
                  <p className="text-sm text-brown/60">{new Date(o.createdAt).toLocaleString()}</p>
                </div>
                <select
                  value={o.status}
                  onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                  className="px-3 py-2 rounded-lg border border-beige bg-transparent capitalize"
                >
                  {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminContent />
    </ProtectedRoute>
  );
}
