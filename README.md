# BookVerse

A premium book discovery platform powered by the **Google Books API**. Search millions of titles, explore curated shelves, and manage your personal library — all in the browser with no database required.

## Tech Stack

- **React** + **Vite**
- **Tailwind CSS v4**
- **React Router**
- **React Icons**
- **Google Books API** (client-side)

## Features

- Instant debounced search with autocomplete
- Filters: title, author, genre, free ebooks, new releases
- Trending, fiction, nonfiction, editor's choice sections
- Book detail pages with save, wishlist, and share
- Dark / light theme (localStorage)
- Wishlist, saved books, reading list (localStorage)
- Lazy-loaded routes and skeleton loaders

## Getting Started

```bash
npm run install:all
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
client/src/
├── components/
│   ├── books/       # BookCard, SearchBar
│   ├── common/      # BookCover, SEO, Skeleton, StarRating
│   ├── home/        # Hero, sections, CategoryPills
│   └── layout/      # Navbar, Footer
├── contexts/        # Theme, Search, Library, User, Toast
├── hooks/           # useDebounce, useInfiniteScroll
├── layouts/         # MainLayout
├── pages/           # Route pages
├── services/        # googleBooks.js
└── utils/           # constants, bookHelpers
```

## Environment

No API key required for basic Google Books usage. Optional `VITE_GOOGLE_BOOKS_KEY` can be added later if you enable API key restrictions.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
