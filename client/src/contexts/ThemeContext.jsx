import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("bv_theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-transition");

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("bv_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("bv_theme", "light");
    }

    const timer = setTimeout(() => root.classList.remove("theme-transition"), 350);
    return () => clearTimeout(timer);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((d) => !d);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
