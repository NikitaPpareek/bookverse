import { Moon, Sun, ShoppingBag, Menu } from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full px-4 pt-5 md:px-8 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto max-w-[98%]">
        <div className="bg-[#F3E7DB]/95 dark:bg-[#401F1D]/95 border border-[#DBC6B1] dark:border-[#5C2E2B] rounded-[24px] px-8 py-5 shadow-[0_10px_40px_rgba(64,31,29,0.08)] flex items-center justify-between backdrop-blur-xl transition-all duration-300">
          
          {/* LEFT: Branding */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-[#721136] flex items-center justify-center text-[#F3E7DB] font-black text-2xl shadow-md">
              B
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black leading-none tracking-tight">
                <span className="text-[#721136] dark:text-[#F3E7DB] transition-all duration-300">
                  Book
                </span>
                <span className="text-[#DBC6B1] dark:text-[#DBC6B1]/80">
                  Verse
                </span>
              </h1>
              <p className="text-[11px] tracking-[3px] uppercase text-[#721136]/70 dark:text-[#DBC6B1]/60 mt-1 font-bold">
                Modern Library
              </p>
            </div>
          </div>

          {/* CENTER: Updated Font Family (Using a premium Serif stack here) */}
          {/* TIP: Swap 'font-serif' to 'font-sans' or a custom 'font-["Playfair_Display"]' as desired */}
          <ul className="hidden lg:flex items-center gap-12 text-xl font-extrabold tracking-wide font-serif text-[#721136] dark:text-[#F3E7DB]">
            {["Home", "Books", "Categories", "Contact"].map((item) => (
              <li key={item} className="relative group cursor-pointer py-1 flex flex-col items-center">
                <span className="transition-all duration-300 group-hover:text-[#721136]/75 dark:group-hover:text-[#DBC6B1]/80">
                  {item}
                </span>
                <div className="absolute bottom-[-2px] w-0 h-[3.5px] bg-[#721136] dark:bg-[#F3E7DB] rounded-full transition-all duration-300 group-hover:w-full"></div>
              </li>
            ))}
          </ul>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-4">
            
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-12 h-12 rounded-xl bg-[#DBC6B1]/60 dark:bg-[#5C2E2B] flex items-center justify-center shadow-sm hover:scale-105 transition-all duration-300"
            >
              {darkMode ? (
                <Sun size={22} className="text-[#F3E7DB]" />
              ) : (
                <Moon size={21} className="text-[#721136]" />
              )}
            </button>

            {/* Cart */}
            <button className="relative flex w-12 h-12 rounded-xl bg-[#721136] items-center justify-center text-white shadow-sm hover:scale-105 transition-all duration-300">
              <ShoppingBag size={21} />
              <span className="absolute -top-1.5 -right-1.5 bg-[#401F1D] dark:bg-[#F3E7DB] text-white dark:text-[#401F1D] text-[11px] w-5.5 h-5.5 rounded-full flex items-center justify-center font-bold ring-2 ring-[#F3E7DB] dark:ring-[#401F1D]">
                2
              </span>
            </button>

            <div className="hidden md:block w-[1px] h-6 bg-[#DBC6B1] dark:bg-[#5C2E2B] mx-0.5" />

            {/* Login */}
            <button className="hidden md:block px-5.5 py-3 rounded-xl border border-[#721136] dark:border-[#F3E7DB] text-[#721136] dark:text-[#F3E7DB] text-[15px] font-extrabold tracking-wide hover:bg-[#721136] hover:text-white dark:hover:bg-[#F3E7DB] dark:hover:text-[#401F1D] transition-all duration-300">
              Login
            </button>

            {/* Sign Up */}
            <button className="hidden md:block px-5.5 py-3 rounded-xl bg-[#721136] dark:bg-[#F3E7DB] text-white dark:text-[#401F1D] text-[15px] font-extrabold tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] hover:bg-[#590C29] dark:hover:bg-[#EBD3BC] transition-all duration-300">
              Sign Up
            </button>

            {/* Mobile Menu */}
            <button className="lg:hidden w-12 h-12 rounded-xl bg-[#DBC6B1]/60 dark:bg-[#5C2E2B] flex items-center justify-center transition-transform active:scale-95">
              <Menu size={24} className="text-[#721136] dark:text-[#F3E7DB]" />
            </button>

          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;