import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";
import SEO from "../components/common/SEO";
import { useUser } from "../contexts/UserContext";

export default function SignInPage() {
  const { signIn, signOut, user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ name, email });
    navigate("/");
  };

  return (
    <>
      <SEO title="Sign In" description="Sign in to BookVerse — stored locally, no server required." />
      <div className="max-w-md mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white mx-auto mb-4 shadow-sm">
            <FiBookOpen size={22} />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground dark:text-[#f0eef2] tracking-tight">
            {isSignedIn ? "Your Account" : "Sign In"}
          </h1>
          <p className="text-sm text-muted mt-2">
            Profile saved in your browser only — no password or database
          </p>
        </div>

        {isSignedIn ? (
          <div className="p-6 rounded-2xl bg-card dark:bg-dark-card border border-border dark:border-dark-border shadow-sm text-center">
            <p className="font-semibold text-lg text-foreground">{user.name}</p>
            <p className="text-sm text-muted mb-6">{user.email}</p>
            <button
              onClick={signOut}
              className="w-full py-2.5 rounded-xl border border-border text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
            >
              Sign Out
            </button>
            <Link to="/library" className="block mt-4 text-sm text-primary hover:underline">
              Go to My Library →
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl bg-card dark:bg-dark-card border border-border dark:border-dark-border shadow-sm space-y-4"
          >
            <div>
              <label className="text-sm font-medium text-muted">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-elevated text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                placeholder="Alex Reader"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-elevated text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                placeholder="you@email.com"
              />
            </div>
            <button type="submit" className="btn-primary w-full py-3 text-sm">
              Continue
            </button>
            <p className="text-xs text-center text-muted">
              By continuing you agree this is a demo local profile only.
            </p>
          </form>
        )}
      </div>
    </>
  );
}
