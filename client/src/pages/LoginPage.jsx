import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SEO from "../components/common/SEO";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      toast(`Welcome back, ${data.user.name}!`);
      navigate(data.user.role === "admin" ? "/admin" : from);
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Login" />
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="p-8 rounded-3xl bg-white/80 dark:bg-[#1a1212] border border-beige dark:border-[#3d2525] shadow-lg">
          <h1 className="font-display text-3xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-center text-brown/60 dark:text-cream/60 mb-8">Sign in to your BookVerse account</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-beige bg-transparent outline-none focus:border-wine"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-beige bg-transparent outline-none focus:border-wine"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-wine text-cream font-semibold hover:bg-brown disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-brown/60">
            Don&apos;t have an account? <Link to="/register" className="text-wine font-semibold hover:underline">Sign up</Link>
          </p>
          <p className="text-center mt-4 text-xs text-brown/40">Demo: demo@bookverse.com / demo123</p>
        </div>
      </div>
    </>
  );
}
