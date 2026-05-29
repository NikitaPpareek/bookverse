import { useState } from "react";
import { Link } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { CATEGORIES } from "../../utils/constants";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/discover", label: "Discover" },
  { to: "/trending", label: "Trending" },
  { to: "/categories", label: "Categories" },
  { to: "/library", label: "My Library" },
  { to: "/about", label: "About" },
];

const socialLinks = [
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaGithub, label: "GitHub", href: "#" },
  { icon: FaLinkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="mt-20 border-t border-border dark:border-dark-border bg-surface dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
              <FiBookOpen size={20} />
            </div>
            <span className="font-display text-2xl font-bold text-foreground dark:text-[#f0eef2] tracking-tight">
              BookVerse
            </span>
          </div>
          <p className="text-sm text-muted dark:text-[#f0eef2]/55 leading-relaxed max-w-xs">
            A premium discovery experience powered by Google Books. Find your next great read.
          </p>
          <div className="flex gap-2 mt-6">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-card dark:bg-dark-elevated border border-border dark:border-dark-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 dark:hover:text-lavender transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground dark:text-[#f0eef2] mb-4 text-xs uppercase tracking-widest">
            Navigation
          </h4>
          <ul className="space-y-2.5">
            {quickLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-muted dark:text-[#f0eef2]/55 hover:text-primary dark:hover:text-lavender transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground dark:text-[#f0eef2] mb-4 text-xs uppercase tracking-widest">
            Categories
          </h4>
          <ul className="space-y-2.5">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/discover?genre=${encodeURIComponent(cat.slug)}`}
                  className="text-sm text-muted dark:text-[#f0eef2]/55 hover:text-primary dark:hover:text-lavender transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground dark:text-[#f0eef2] mb-4 text-xs uppercase tracking-widest">
            Newsletter
          </h4>
          <p className="text-sm text-muted dark:text-[#f0eef2]/55 mb-4 leading-relaxed">
            Weekly picks and new releases in your inbox.
          </p>
          {subscribed ? (
            <p className="text-sm text-primary dark:text-lavender font-medium">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <div className="relative flex-1">
                <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-card dark:bg-dark-elevated border border-border dark:border-dark-border text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-all shadow-sm shrink-0"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-border dark:border-dark-border py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p className="flex items-center gap-1.5">
            <FiBookOpen size={14} className="text-primary/70" />
            © {new Date().getFullYear()} BookVerse. All rights reserved.
          </p>
          <p>Powered by Google Books API</p>
        </div>
      </div>
    </footer>
  );
}
