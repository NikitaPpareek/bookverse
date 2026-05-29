const BASE = "https://www.googleapis.com/books/v1";

const FALLBACK_COVER =
  "https://via.placeholder.com/128x192/DAB8AE/967C7C?text=No+Cover";

const getCoverImage = (info) => {
  const links = info.imageLinks || {};
  const raw =
    links.medium ||
    links.large ||
    links.thumbnail ||
    links.smallThumbnail ||
    "";
  if (!raw) return FALLBACK_COVER;
  return raw.replace("http:", "https:").replace("&edge=curl", "").replace("zoom=1", "zoom=2");
};

export const mapGoogleBook = (item) => {
  const info = item.volumeInfo || {};
  const sale = item.saleInfo || {};
  const price =
    sale.listPrice?.amount ??
    sale.retailPrice?.amount ??
    9.99 + (item.id?.length % 20);
  const categories = info.categories || ["General"];
  const description = info.description
    ? info.description.replace(/<[^>]*>/g, "").slice(0, 500)
    : "No description available.";

  return {
    googleId: item.id,
    title: info.title || "Untitled",
    author: (info.authors || ["Unknown Author"]).join(", "),
    description,
    coverImage: getCoverImage(info),
    category: categories[0],
    categories,
    price: Math.round(price * 100) / 100,
    rating: info.averageRating ?? null,
    ratingsCount: info.ratingsCount ?? 0,
    publishedDate: info.publishedDate || "",
    pageCount: info.pageCount || 0,
    language: info.language || "en",
    publisher: info.publisher || "",
    isbn: info.industryIdentifiers?.[0]?.identifier || "",
  };
};

export const searchGoogleBooks = async (query, { startIndex = 0, maxResults = 20, orderBy = "relevance" } = {}) => {
  const params = new URLSearchParams({
    q: query,
    startIndex: String(startIndex),
    maxResults: String(Math.min(maxResults, 40)),
    orderBy,
    printType: "books",
  });
  const res = await fetch(`${BASE}/volumes?${params}`);
  if (!res.ok) throw new Error("Google Books API request failed");
  const data = await res.json();
  return {
    totalItems: data.totalItems || 0,
    books: (data.items || []).map(mapGoogleBook),
  };
};

export const getGoogleBookById = async (id) => {
  const res = await fetch(`${BASE}/volumes/${id}`);
  if (!res.ok) throw new Error("Book not found");
  const data = await res.json();
  return mapGoogleBook(data);
};

export const getFeaturedBooks = async () =>
  searchGoogleBooks("bestseller fiction award winning", { maxResults: 8, orderBy: "relevance" });

export const getTrendingBooks = async () => {
  const queries = ["bestseller 2024", "popular nonfiction", "classic literature must read"];
  const idx = Math.floor(Date.now() / 3600000) % queries.length;
  return searchGoogleBooks(queries[idx], { maxResults: 8, orderBy: "relevance" });
};
