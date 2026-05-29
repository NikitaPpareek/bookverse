import { createContext, useContext, useState } from "react";

const SearchContext = createContext();
const HISTORY_KEY = "bv_search_history";

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [previewBook, setPreviewBook] = useState(null);

  const addToHistory = (term) => {
    if (!term?.trim()) return;
    setHistory((prev) => {
      const next = [term, ...prev.filter((h) => h !== term)].slice(0, 8);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return (
    <SearchContext.Provider
      value={{ query, setQuery, history, addToHistory, clearHistory, previewBook, setPreviewBook }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
