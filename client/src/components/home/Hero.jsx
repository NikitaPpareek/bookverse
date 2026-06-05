// import { Link } from "react-router-dom";
// import { HiArrowRight, HiTrendingUp } from "react-icons/hi";
// import SearchBar from "../books/SearchBar";
// import HeroBookshelf from "./HeroBookshelf";

// export default function Hero() {
//   return (
//     <section className="relative overflow-hidden border-b border-border dark:border-dark-border">
//       <div className="hero-gradient absolute inset-0 -z-10" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10 relative">
//         <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
//           <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left animate-fade-in z-10">
//             <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card dark:bg-dark-elevated border border-border dark:border-dark-border text-[11px] font-bold uppercase tracking-widest text-primary dark:text-lavender mb-4 shadow-sm">
//               <span className="w-1.5 h-1.5 rounded-full bg-primary" />
//               Digital library · 40M+ titles
//             </p>

//             <h1 className="font-display text-[2rem] sm:text-4xl md:text-[2.65rem] font-bold leading-[1.12] text-foreground dark:text-[#f0eef2] mb-3 tracking-tight">
//               Discover Your Next{" "}
//               <span className="text-primary dark:text-lavender">Favorite</span>{" "}
//               Book
//             </h1>

//             <p className="text-[15px] sm:text-base text-muted dark:text-[#f0eef2]/65 max-w-lg mx-auto lg:mx-0 mb-6 leading-relaxed">
//               Search millions of titles, explore curated shelves, and build your personal reading list.
//             </p>

//             <div className="max-w-xl mx-auto lg:mx-0 mb-6">
//               <SearchBar large />
//             </div>

//             <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
//               <Link to="/discover" className="btn-primary px-6 py-2.5 text-sm group">
//                 Explore Books
//                 <HiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
//               </Link>
//               <Link
//                 to="/trending"
//                 className="btn-secondary px-6 py-2.5 text-sm dark:bg-dark-card dark:text-[#f0eef2] dark:border-dark-border"
//               >
//                 <HiTrendingUp className="text-primary dark:text-lavender" />
//                 Trending Reads
//               </Link>
//             </div>
//           </div>

//           <div className="hidden lg:block shrink-0 w-[300px] xl:w-[340px] animate-float opacity-95 pointer-events-none">
//             <HeroBookshelf className="w-full h-auto drop-shadow-[0_20px_40px_rgba(26,26,26,0.12)]" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import { HiArrowRight, HiTrendingUp } from "react-icons/hi";
import SearchBar from "../books/SearchBar";
import HeroBookshelf from "./HeroBookshelf";

export default function Hero() {
  return (
    /* FIXED: Changed overflow-hidden to overflow-visible and added z-20 to keep the search bar dropdown on top */
    <section className="relative overflow-visible z-20 border-b border-border dark:border-dark-border">
      <div className="hero-gradient absolute inset-0 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10 relative">
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left animate-fade-in z-10">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card dark:bg-dark-elevated border border-border dark:border-dark-border text-[11px] font-bold uppercase tracking-widest text-primary dark:text-lavender mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Digital library · 40M+ titles
            </p>

            <h1 className="font-display text-[2rem] sm:text-4xl md:text-[2.65rem] font-bold leading-[1.12] text-foreground dark:text-[#f0eef2] mb-3 tracking-tight">
              Discover Your Next{" "}
              <span className="text-primary dark:text-lavender">Favorite</span>{" "}
              Book
            </h1>

            <p className="text-[15px] sm:text-base text-muted dark:text-[#f0eef2]/65 max-w-lg mx-auto lg:mx-0 mb-6 leading-relaxed">
              Search millions of titles, explore curated shelves, and build your personal reading list.
            </p>

            <div className="max-w-xl mx-auto lg:mx-0 mb-6">
              <SearchBar large />
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link to="/discover" className="btn-primary px-6 py-2.5 text-sm group">
                Explore Books
                <HiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/trending"
                className="btn-secondary px-6 py-2.5 text-sm dark:bg-dark-card dark:text-[#f0eef2] dark:border-dark-border"
              >
                <HiTrendingUp className="text-primary dark:text-lavender" />
                Trending Reads
              </Link>
            </div>
          </div>

          <div className="hidden lg:block shrink-0 w-[300px] xl:w-[340px] animate-float opacity-95 pointer-events-none">
            <HeroBookshelf className="w-full h-auto drop-shadow-[0_20px_40px_rgba(26,26,26,0.12)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
