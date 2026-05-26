import { Link } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (

    <nav className="
    w-full
    border-b

    bg-[#f5efe4]
    border-orange-100

    dark:bg-zinc-950
    dark:border-zinc-800

    transition-all duration-500">

      <div className="
      max-w-7xl
      mx-auto
      px-6 py-4

      flex items-center justify-between">

        {/* Logo */}
        <h1 className="
        text-4xl
        font-extrabold

        bg-gradient-to-r
        from-orange-500
        to-amber-700

        dark:from-emerald-400
        dark:to-teal-500

        text-transparent
        bg-clip-text">

          BookVerse

        </h1>

        {/* Nav Links */}
        <div className="
        hidden md:flex
        items-center gap-8
        font-medium">

          <Link
            to="/"
            className="
            text-stone-700
            hover:text-orange-600

            dark:text-zinc-300
            dark:hover:text-emerald-400

            transition"
          >
            Home
          </Link>

          <Link
            to="/books"
            className="
            text-stone-700
            hover:text-orange-600

            dark:text-zinc-300
            dark:hover:text-emerald-400

            transition"
          >
            Books
          </Link>

          <Link
            to="/categories"
            className="
            text-stone-700
            hover:text-orange-600

            dark:text-zinc-300
            dark:hover:text-emerald-400

            transition"
          >
            Categories
          </Link>

          <Link
            to="/contact"
            className="
            text-stone-700
            hover:text-orange-600

            dark:text-zinc-300
            dark:hover:text-emerald-400

            transition"
          >
            Contact
          </Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`
              relative w-16 h-9 rounded-full
              transition-all duration-500
              flex items-center px-1

              ${
                darkMode
                  ? "bg-zinc-800"
                  : "bg-orange-200"
              }
            `}
          >

            {/* Sliding Circle */}
            <div
              className={`
                w-7 h-7 rounded-full
                flex items-center justify-center
                text-sm
                shadow-md
                transition-all duration-500

                ${
                  darkMode
                    ? "translate-x-7 bg-orange-400 text-white"
                    : "translate-x-0 bg-white text-orange-500"
                }
              `}
            >

              {darkMode ? "☀" : "☾"}

            </div>

          </button>

          {/* Login */}
          <button className="
          px-5 py-2.5
          rounded-xl
          border

          border-orange-500
          text-orange-600

          hover:bg-orange-500
          hover:text-white

          dark:border-emerald-500
          dark:text-emerald-400
          dark:hover:bg-emerald-500

          transition-all duration-300">

            Login

          </button>

          {/* Signup */}
          <button className="
          px-5 py-2.5
          rounded-xl
          text-white

          bg-gradient-to-r
          from-orange-500
          to-amber-700

          dark:from-emerald-500
          dark:to-teal-500

          hover:scale-105

          transition-all duration-300">

            Sign Up

          </button>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;