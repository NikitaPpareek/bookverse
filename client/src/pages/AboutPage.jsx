import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { FiBookOpen } from "react-icons/fi";
import SEO from "../components/common/SEO";
import { STATS } from "../utils/constants";

export default function AboutPage() {
  return (
    <>
      <SEO title="About" description="Learn about BookVerse — your premium book discovery platform." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white mx-auto mb-6 shadow-md">
            <FiBookOpen size={28} />
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground dark:text-[#f0eef2] mb-4 tracking-tight">
            About BookVerse
          </h1>
          <p className="text-muted dark:text-[#f0eef2]/60 leading-relaxed">
            BookVerse blends the discovery magic of Goodreads, the polish of a premium bookstore,
            and Netflix-style browsing — all powered by the Google Books API. No clutter, no checkout
            friction: just beautiful search, curated shelves, and your personal library in the browser.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-2xl bg-card dark:bg-dark-card border border-border dark:border-dark-border text-center shadow-sm"
            >
              <p className="text-2xl font-bold text-primary dark:text-lavender">{s.value}</p>
              <p className="text-sm text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {[
            {
              title: "Instant Discovery",
              text: "Debounced search, autocomplete, filters, and trending queries help you find the right book in seconds.",
            },
            {
              title: "Your Library",
              text: "Wishlist, saved books, and reading lists live in localStorage — private to your device, no account required.",
            },
            {
              title: "Premium Experience",
              text: "Light and dark themes, glassmorphism navigation, skeleton loaders, and responsive layouts throughout.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-card dark:bg-dark-card border border-border dark:border-dark-border shadow-sm"
            >
              <h3 className="font-display text-xl font-bold mb-2 text-foreground dark:text-[#f0eef2]">
                {item.title}
              </h3>
              <p className="text-sm text-muted dark:text-[#f0eef2]/55 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/discover" className="btn-primary px-6 py-3 text-sm">
            Start Exploring <HiArrowRight />
          </Link>
        </div>
      </div>
    </>
  );
}
