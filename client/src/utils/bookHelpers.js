export const FALLBACK_COVER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect fill='%23EDE6DA' width='200' height='280' rx='8'/%3E%3Ctext x='100' y='140' text-anchor='middle' fill='%23810B38' font-family='Georgia,serif' font-size='14'%3ENo Cover%3C/text%3E%3C/svg%3E";

export const getBookId = (book) => book?.googleId || book?.id || book?._id;

export const normalizeBook = (book) => ({
  ...book,
  id: getBookId(book),
  coverImage: book?.coverImage || book?.image || FALLBACK_COVER,
  description: book?.description || "No description available for this title.",
  rating: book?.rating ?? book?.averageRating ?? null,
});

export const formatPublishedDate = (date) => {
  if (!date) return null;
  const parts = date.split("-");
  if (parts.length === 1) return date;
  if (parts.length === 2) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[Number(parts[1]) - 1] || parts[1]} ${parts[0]}`;
  }
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

export const getPublishedYear = (date) => {
  if (!date) return null;
  return date.split("-")[0];
};

export const renderStars = (rating = 0) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return { full, half, empty: 5 - full - (half ? 1 : 0) };
};

export const upgradeCoverUrl = (url) => {
  if (!url || url.startsWith("data:")) return url;
  return url.replace("http:", "https:").replace("&edge=curl", "").replace("zoom=1", "zoom=2");
};

export const shareBook = async (book) => {
  const url = `${window.location.origin}/books/${getBookId(book)}`;
  const text = `Check out "${book.title}" by ${book.author} on BookVerse`;
  if (navigator.share) {
    await navigator.share({ title: book.title, text, url });
    return true;
  }
  await navigator.clipboard.writeText(url);
  return false;
};

export const trackRecentlyViewed = (book) => {
  if (!book) return;
  const id = getBookId(book);
  const key = "bv_recently_viewed";
  try {
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    const entry = normalizeBook(book);
    const next = [entry, ...list.filter((b) => getBookId(b) !== id)].slice(0, 12);
    localStorage.setItem(key, JSON.stringify(next));
  } catch {
    /* ignore */
  }
};

export const getRecentlyViewed = () => {
  try {
    return JSON.parse(localStorage.getItem("bv_recently_viewed") || "[]");
  } catch {
    return [];
  }
};
