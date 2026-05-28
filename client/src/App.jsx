import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import CategoryPills from "./components/CategoryPills";
import FeaturedBooks from "./components/FeaturedBooks";
import Footer from "./components/Footer";

function App() {

  return (

    <div className="bg-[#F7F4EA] dark:bg-[#121212] transition-all duration-300 min-h-screen overflow-x-hidden">

      <Navbar />

      <Hero />

      <SearchBar />

      <CategoryPills />

      <FeaturedBooks />

      <Footer />

    </div>

  );

}

export default App;