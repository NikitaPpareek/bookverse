import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineSearch, HiOutlineMoon, HiOutlineSun, HiMenu, HiX } from "react-icons/hi";
import { FiBookOpen } from "react-icons/fi";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/discover", label: "Discover" },
  { to: "/categories", label: "Categories" },
  { to: "/trending", label: "Trending" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const isSignedIn = !!user;

  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative px-0.5 py-0.5 text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
      isActive
        ? "text-primary dark:text-lavender after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-primary dark:after:bg-lavender"
        : "text-muted dark:text-[#f0eef2]/65 hover:text-primary dark:hover:text-lavender"
    }`;

  const iconBtn =
    "w-8 h-8 rounded-lg bg-background dark:bg-dark-elevated border border-border dark:border-dark-border flex items-center justify-center hover:border-primary/30 hover:bg-surface dark:hover:bg-dark-card transition-all";

  const openSearch = () => {
    setMobileOpen(false);
    navigate("/discover?focus=1");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-1" : "py-2"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`glass flex items-center justify-between gap-3 px-3 sm:px-5 py-2 rounded-xl transition-all duration-300 ${
            scrolled ? "glass-elevated" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm group-hover:bg-primary-hover transition-colors">
              <FiBookOpen size={16} />
            </div>
            <span className="font-display text-lg font-bold text-foreground dark:text-[#f0eef2] tracking-tight">
              Book<span className="text-primary dark:text-lavender">Verse</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={linkClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <button onClick={toggleTheme} className={iconBtn} aria-label="Toggle theme">
              {darkMode ? (
                <HiOutlineSun size={17} className="text-lavender" />
              ) : (
                <HiOutlineMoon size={17} className="text-muted" />
              )}
            </button>

            <button onClick={openSearch} className={iconBtn} aria-label="Search books">
              <HiOutlineSearch size={17} className="text-muted dark:text-lavender" />
            </button>

            <Link
              to={isSignedIn ? "/dashboard" : "/login"}
              // to={isSignedIn ? "/library" : "/login"}
              
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-bold tracking-wide hover:bg-primary-hover transition-all shadow-sm hover:shadow-md"
            >
              {isSignedIn ? user?.name?.split(" ")[0] || "Account" : "Sign In"}
            </Link>

            <button
              className={`lg:hidden ${iconBtn}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <HiX size={18} className="text-primary dark:text-lavender" />
              ) : (
                <HiMenu size={18} className="text-muted dark:text-lavender" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden mt-1.5 p-3 rounded-xl glass glass-elevated animate-fade-in">
            <ul className="flex flex-col gap-0.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-primary/8 text-primary dark:text-lavender"
                          : "text-muted dark:text-[#f0eef2]/80 hover:bg-surface dark:hover:bg-dark-card"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}

              <li>
                <Link
                  to="/library"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-muted hover:bg-surface dark:hover:bg-dark-card"
                >
                  My Library
                </Link>
              </li>

              <li>
                <Link
                  to={isSignedIn ? "/dashboard" : "/login"}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-bold text-primary dark:text-lavender"
                >
                  {isSignedIn ? "Account" : "Sign In"}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}