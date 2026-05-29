import { useState } from "react";
import { Link } from "react-router-dom";
import { HiHeart, HiBookmark } from "react-icons/hi";
import { FiBook } from "react-icons/fi";
import SEO from "../components/common/SEO";
import BookCard from "../components/books/BookCard";
import EmptyState from "../components/common/EmptyState";
import { useLibrary } from "../contexts/LibraryContext";

const TABS = [
  { id: "wishlist", label: "Wishlist", icon: HiHeart },
  { id: "saved", label: "Saved Books", icon: HiBookmark },
  { id: "reading", label: "Reading List", icon: FiBook },
];

export default function LibraryPage() {
  const [tab, setTab] = useState("wishlist");
  const { wishlist, saved, readingList } = useLibrary();

  const lists = { wishlist, saved, reading: readingList };
  const books = lists[tab] || [];

  return (
    <>
      <SEO title="My Library" description="Your wishlist, saved books, and reading list on BookVerse." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground dark:text-[#f0eef2] mb-2">
          My Library
        </h1>
        <p className="text-sm text-muted dark:text-[#f0eef2]/50 mb-8">
          Stored locally on your device — no account needed
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                tab === id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-card dark:bg-dark-card border border-border dark:border-dark-border hover:border-primary/30"
              }`}
            >
              <Icon size={16} />
              {label}
              <span className="opacity-70">({lists[id]?.length || 0})</span>
            </button>
          ))}
        </div>

        {books.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={`No books in ${TABS.find((t) => t.id === tab)?.label}`}
            message="Save books from search or detail pages to build your collection."
            action={
              <Link
                to="/discover"
                className="inline-block mt-4 btn-primary px-5 py-2 text-sm"
              >
                Discover Books
              </Link>
            }
          />
        )}
      </div>
    </>
  );
}
