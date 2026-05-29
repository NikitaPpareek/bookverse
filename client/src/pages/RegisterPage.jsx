import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/common/SEO";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await register(form.name, form.email, form.password);
      toast(`Welcome to BookVerse, ${data.user.name}!`);
      navigate("/dashboard");
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Register" />
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="p-8 rounded-3xl bg-white/80 dark:bg-[#1a1212] border border-beige dark:border-[#3d2525] shadow-lg">
          <h1 className="font-display text-3xl font-bold text-center mb-2">Join BookVerse</h1>
          <p className="text-center text-brown/60 dark:text-cream/60 mb-8">Create your reader account</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-beige bg-transparent outline-none focus:border-wine"
            />
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
              minLength={6}
              placeholder="Password (min 6 chars)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-beige bg-transparent outline-none focus:border-wine"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-wine text-cream font-semibold hover:bg-brown disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-brown/60">
            Already have an account? <Link to="/login" className="text-wine font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
