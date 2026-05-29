import SEO from "../components/common/SEO";
import BookSection from "../components/home/BookSection";
import { SECTION_QUERIES } from "../services/googleBooks";

export default function TrendingPage() {
  return (
    <>
      <SEO title="Trending" description="Trending books on BookVerse — what readers love right now." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground dark:text-[#f0eef2] mb-2">
          Trending Reads
        </h1>
        <p className="text-muted dark:text-[#f0eef2]/55 text-sm max-w-xl leading-relaxed">
          The hottest titles across fiction, nonfiction, and more — refreshed from Google Books.
        </p>
      </div>
      <BookSection
        title="This Week's Hits"
        query={SECTION_QUERIES.trending}
        viewAllLink="/discover"
      />
      <BookSection
        title="Rising Stars"
        query="viral book club pick 2024"
        viewAllLink="/discover"
      />
      <BookSection
        title="Award Winners"
        query="award winning bestseller"
        viewAllLink="/discover"
      />
    </>
  );
}
