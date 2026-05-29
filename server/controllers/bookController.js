import asyncHandler from "../utils/asyncHandler.js";
import Book from "../models/Book.js";
import {
  searchGoogleBooks,
  getGoogleBookById,
  getTrendingBooks,
  getFeaturedBooks,
} from "../services/googleBooks.js";

export const getBooks = asyncHandler(async (req, res) => {
  const {
    q,
    category,
    author,
    minRating,
    minPrice,
    maxPrice,
    sort = "newest",
    page = 1,
    limit = 12,
    source = "auto",
  } = req.query;

  if (q || source === "google") {
    const startIndex = (Number(page) - 1) * Number(limit);
    let orderBy = "relevance";
    if (sort === "newest") orderBy = "newest";
    const result = await searchGoogleBooks(q || "fiction", {
      startIndex,
      maxResults: Number(limit),
      orderBy,
    });
    let books = result.books;
    if (category) books = books.filter((b) => b.category?.toLowerCase().includes(category.toLowerCase()));
    if (author) books = books.filter((b) => b.author?.toLowerCase().includes(author.toLowerCase()));
    if (minRating) books = books.filter((b) => b.rating >= Number(minRating));
    if (minPrice) books = books.filter((b) => b.price >= Number(minPrice));
    if (maxPrice) books = books.filter((b) => b.price <= Number(maxPrice));
    if (sort === "price-asc") books.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") books.sort((a, b) => b.price - a.price);
    if (sort === "rating") books.sort((a, b) => b.rating - a.rating);
    return res.json({
      success: true,
      source: "google",
      totalItems: result.totalItems,
      page: Number(page),
      pages: Math.ceil(result.totalItems / Number(limit)),
      books,
    });
  }

  const filter = {};
  if (category) filter.category = new RegExp(category, "i");
  if (author) filter.author = new RegExp(author, "i");
  if (minRating) filter.rating = { $gte: Number(minRating) };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  let sortOpt = { createdAt: -1 };
  if (sort === "price-asc") sortOpt = { price: 1 };
  if (sort === "price-desc") sortOpt = { price: -1 };
  if (sort === "rating") sortOpt = { rating: -1 };
  if (sort === "title") sortOpt = { title: 1 };

  const skip = (Number(page) - 1) * Number(limit);
  const [books, count] = await Promise.all([
    Book.find(filter).sort(sortOpt).skip(skip).limit(Number(limit)),
    Book.countDocuments(filter),
  ]);

  res.json({
    success: true,
    source: "database",
    totalItems: count,
    page: Number(page),
    pages: Math.ceil(count / Number(limit)),
    books,
  });
});

export const getBookById = asyncHandler(async (req, res) => {
  const { source } = req.query;
  if (source === "google" || req.params.id?.length > 20) {
    const book = await getGoogleBookById(req.params.id);
    return res.json({ success: true, book, source: "google" });
  }
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json({ success: true, book, source: "database" });
});

export const getFeatured = asyncHandler(async (req, res) => {
  const result = await getFeaturedBooks();
  res.json({ success: true, books: result.books, source: "google" });
});

export const getTrending = asyncHandler(async (req, res) => {
  const result = await getTrendingBooks();
  res.json({ success: true, books: result.books, source: "google" });
});

export const searchSuggestions = asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json({ success: true, suggestions: [] });
  const result = await searchGoogleBooks(q, { maxResults: 6 });
  const suggestions = result.books.map((b) => ({
    id: b.googleId,
    title: b.title,
    author: b.author,
    coverImage: b.coverImage,
    publishedDate: b.publishedDate,
    rating: b.rating,
  }));
  res.json({ success: true, suggestions });
});

export const createBook = asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ success: true, book });
});

export const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json({ success: true, book });
});

export const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json({ success: true, message: "Book removed" });
});

export const addReview = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(req.body.rating),
    comment: req.body.comment,
  };
  book.reviews.push(review);
  book.numReviews = book.reviews.length;
  book.rating =
    book.reviews.reduce((acc, r) => acc + r.rating, 0) / book.reviews.length;
  await book.save();
  res.status(201).json({ success: true, book });
});

export const syncFromGoogle = asyncHandler(async (req, res) => {
  const googleBook = await getGoogleBookById(req.params.googleId);
  let book = await Book.findOne({ googleId: googleBook.googleId });
  if (!book) book = await Book.create(googleBook);
  res.json({ success: true, book });
});
