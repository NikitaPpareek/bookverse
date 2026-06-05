import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useToast } from "./ToastContext";
import { getBookId, normalizeBook } from "../utils/bookHelpers";

const LibraryContext = createContext();

const KEYS = {
  wishlist: "bv_wishlist",
  saved: "bv_saved_books",
  reading: "bv_reading_list",
};

const loadList = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const saveList = (key, items) => localStorage.setItem(key, JSON.stringify(items));

export const LibraryProvider = ({ children }) => {
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState(() => loadList(KEYS.wishlist));
  const [saved, setSaved] = useState(() => loadList(KEYS.saved));
  const [readingList, setReadingList] = useState(() => loadList(KEYS.reading));

  useEffect(() => saveList(KEYS.wishlist, wishlist), [wishlist]);
  useEffect(() => saveList(KEYS.saved, saved), [saved]);
  useEffect(() => saveList(KEYS.reading, readingList), [readingList]);

  const inList = (list, book) => {
    const id = getBookId(normalizeBook(book));
    return list.some((i) => getBookId(i) === id);
  };

  const toggleInList = useCallback((list, setList, book, label) => {
    const b = normalizeBook(book);
    const id = getBookId(b);
    if (inList(list, b)) {
      setList((prev) => prev.filter((i) => getBookId(i) !== id));
      toast(`Removed from ${label}`, "info");
      return false;
    }
    setList((prev) => [b, ...prev.filter((i) => getBookId(i) !== id)]);
    toast(`Added to ${label}`);
    return true;
  }, [toast]);

  const isInWishlist = (book) => inList(wishlist, book);
  const isSaved = (book) => inList(saved, book);
  const isInReadingList = (book) => inList(readingList, book);

  const toggleWishlist = (book) => toggleInList(wishlist, setWishlist, book, "wishlist");
  const toggleSaved = (book) => toggleInList(saved, setSaved, book, "saved books");
  const toggleReadingList = (book) => toggleInList(readingList, setReadingList, book, "reading list");

  const removeFromWishlist = (id) =>
    setWishlist((prev) => prev.filter((i) => getBookId(i) !== id));

  // Wipes all user-specific library records instantly on logout
  const clearLibrary = useCallback(() => {
    setWishlist([]);
    setSaved([]);
    setReadingList([]);
    localStorage.removeItem(KEYS.wishlist);
    localStorage.removeItem(KEYS.saved);
    localStorage.removeItem(KEYS.reading);
  }, []);

  return (
    <LibraryContext.Provider
      value={{
        wishlist,
        saved,
        readingList,
        isInWishlist,
        isSaved,
        isInReadingList,
        toggleWishlist,
        toggleSaved,
        toggleReadingList,
        removeFromWishlist,
        clearLibrary, // Exposed to the app here
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);