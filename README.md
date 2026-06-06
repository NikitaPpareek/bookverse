# 📚 BookVerse — Full Stack Book Discovery & Library Platform

BookVerse is a modern full-stack web application that helps users discover books, build personal reading collections, manage wishlists, and explore millions of books through the Google Books API.

Built with React, Node.js, Express, MongoDB, and JWT Authentication, BookVerse provides a complete end-to-end book browsing experience with secure user accounts and cloud deployment.

## 🚀 Live Demo

Frontend: https://bookverse-ecru-nine.vercel.app

Backend API: https://bookverse-i50q.onrender.com

---

## ✨ Features

### Authentication

* Secure JWT Authentication
* User Registration & Login
* Protected Routes
* Persistent Login Sessions

### Book Discovery

* Search millions of books using Google Books API
* Filter by:

  * Title
  * Author
  * Genre
  * Free eBooks
  * New Releases
* Autocomplete Search Suggestions
* Detailed Book Information

### Personal Library

* Save Books
* Wishlist Management
* Reading List Tracking
* Book Preview Links

### Shopping Experience

* Add Books to Cart
* Remove Books from Cart
* Quantity Management
* Order Management System

### User Experience

* Dark & Light Theme
* Responsive Design
* Skeleton Loaders
* Lazy Loaded Routes
* Toast Notifications
* Modern UI

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS v4
* React Router
* React Icons

### Backend

* Node.js
* Express.js
* JWT Authentication
* REST API

### Database

* MongoDB Atlas
* Mongoose

### External APIs

* Google Books API

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## 📂 Project Structure

```bash
BookVerse/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/NikitaPpareek/bookverse.git
cd bookverse
```

### Install Dependencies

```bash
npm install
cd client && npm install
cd ../server && npm install
```

### Environment Variables

Create a `.env` file inside the server folder:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Optional:

```env
VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

### Run Application

Frontend:

```bash
cd client
npm run dev
```

Backend:

```bash
cd server
npm run dev
```

---

## 🎯 Future Enhancements

* AI-powered Book Recommendations
* Reading Progress Tracking
* User Reviews & Ratings
* Social Reading Communities
* Personalized Book Suggestions
* Admin Dashboard Analytics

---

## 👩‍💻 Author

Nikita Pareek

Portfolio:
https://nikita-portfolio-orcin.vercel.app/

GitHub:
https://github.com/NikitaPpareek
