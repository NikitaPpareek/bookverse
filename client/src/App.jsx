import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedBooks from "./components/FeaturedBooks";

function App() {

  // Dark mode by default
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

  }, [darkMode]);

  return (

    <div className="
    min-h-screen
    transition-colors duration-500

    bg-[#f8f3ea]
    dark:bg-zinc-950">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Hero />

      <FeaturedBooks />

    </div>
  );
}

export default App;