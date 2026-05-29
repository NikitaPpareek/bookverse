const BASE = "https://www.googleapis.com/books/v1";

const FALLBACK_COVER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect fill='%23EECFD4' width='200' height='280' rx='8'/%3E%3Ctext x='100' y='140' text-anchor='middle' fill='%23C287E8' font-family='Georgia,serif' font-size='14'%3ENo Cover%3C/text%3E%3C/svg%3E";

export const getCoverImage = (info = {}) => {
  const links = info.imageLinks || {};
  const raw =
    links.extraLarge ||
    links.large ||
    links.medium ||
    links.thumbnail ||
    links.smallThumbnail ||
    "";
  if (!raw) return FALLBACK_COVER;
  return raw
    .replace("http:", "https:")
    .replace("&edge=curl", "")
    .replace("zoom=1", "zoom=2");
};

export const mapGoogleBook = (item) => {
  const info = item.volumeInfo || {};
  const sale = item.saleInfo || {};
  const categories = info.categories || ["General"];
  const description = info.description
    ? info.description.replace(/<[^>]*>/g, "").slice(0, 1200)
    : "No description available.";

  return {
    googleId: item.id,
    id: item.id,
    title: info.title || "Untitled",
    author: (info.authors || ["Unknown Author"]).join(", "),
    authors: info.authors || ["Unknown Author"],
    description,
    coverImage: getCoverImage(info),
    category: categories[0],
    categories,
    rating: info.averageRating ?? null,
    ratingsCount: info.ratingsCount ?? 0,
    publishedDate: info.publishedDate || "",
    pageCount: info.pageCount || 0,
    language: info.language || "en",
    publisher: info.publisher || "",
    isbn: info.industryIdentifiers?.[0]?.identifier || "",
    isFreeEbook: sale.saleability === "FREE" || sale.isEbook === true,
    previewLink: info.previewLink || item.volumeInfo?.previewLink || "",
  };
};

export const buildSearchQuery = (q, filters = {}) => {
  const { filterType = "all", genre = "", freeEbooks = false } = filters;
  let query = q?.trim() || "bestseller";

  if (filterType === "title") query = `intitle:${query}`;
  else if (filterType === "author") query = `inauthor:${query}`;
  else if (filterType === "genre" && genre) query = `subject:${genre}`;
  else if (genre) query = `${query} subject:${genre}`;

  if (freeEbooks) query += " ebook free-ebooks";
  return query;
};

export const searchBooks = async (
  q,
  {
    startIndex = 0,
    maxResults = 20,
    orderBy = "relevance",
    filterType = "all",
    genre = "",
    freeEbooks = false,
    newReleases = false,
  } = {}
) => {
  const query = buildSearchQuery(q, { filterType, genre, freeEbooks });
  const params = new URLSearchParams({
    q: query,
    startIndex: String(startIndex),
    maxResults: String(Math.min(maxResults, 40)),
    orderBy: newReleases ? "newest" : orderBy,
    printType: "books",
  });
  if (freeEbooks) params.set("filter", "ebooks");

  const res = await fetch(`${BASE}/volumes?${params}`);
  if (!res.ok) throw new Error("Google Books API request failed");
  const data = await res.json();

  return {
    totalItems: data.totalItems || 0,
    books: (data.items || []).map(mapGoogleBook),
    hasMore: (data.totalItems || 0) > startIndex + (data.items?.length || 0),
  };
};

export const getBookById = async (id) => {
  const res = await fetch(`${BASE}/volumes/${id}`);
  if (!res.ok) throw new Error("Book not found");
  const data = await res.json();
  return mapGoogleBook(data);
};

export const getSuggestions = async (q, maxResults = 6) => {
  if (!q || q.length < 2) return [];
  const { books } = await searchBooks(q, { maxResults, orderBy: "relevance" });
  return books;
};

export const getSectionBooks = async (query, maxResults = 8) =>
  searchBooks(query, { maxResults, orderBy: "relevance" });

export const SECTION_QUERIES = {
  trending: "bestseller popular 2024",
  newReleases: "new releases 2024 fiction",
  fiction: "award winning fiction novel",
  nonfiction: "bestselling nonfiction",
  editorsChoice: "critically acclaimed must read",
  popularAuthors: "Stephen King OR J.K. Rowling OR Colleen Hoover",
};
