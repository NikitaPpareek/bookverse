import SEO from "../components/common/SEO";
import Hero from "../components/home/Hero";
import BookSection from "../components/home/BookSection";
import PopularAuthors from "../components/home/PopularAuthors";
import CategoryPills from "../components/home/CategoryPills";
import RecentlyViewed from "../components/home/RecentlyViewed";
import Newsletter from "../components/home/Newsletter";
import { SECTION_QUERIES } from "../services/googleBooks";

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        description="Discover your next favorite book. Search millions of titles, explore genres, and build your reading journey on BookVerse."
      />
      <Hero />
      <BookSection
        featured
        title="Trending Books"
        subtitle="What readers are loving right now"
        query={SECTION_QUERIES.trending}
        viewAllLink="/trending"
      />
      <PopularAuthors />
      <BookSection
        title="New Releases"
        subtitle="Fresh titles hitting shelves"
        query={SECTION_QUERIES.newReleases}
        viewAllLink="/discover?q=new+releases&new=1"
        orderBy="newest"
      />
      <BookSection
        title="Fiction Picks"
        subtitle="Immerse yourself in unforgettable stories"
        query={SECTION_QUERIES.fiction}
        viewAllLink="/discover?genre=fiction"
      />
      <BookSection
        title="Non-Fiction Picks"
        subtitle="Ideas that expand your world"
        query={SECTION_QUERIES.nonfiction}
        viewAllLink="/discover?genre=nonfiction"
      />
      <BookSection
        title="Editor's Choice"
        subtitle="Hand-picked standout reads"
        query={SECTION_QUERIES.editorsChoice}
        viewAllLink="/discover?q=editors+choice"
      />
      <CategoryPills />
      <RecentlyViewed />
      <Newsletter />
    </>
  );
}
