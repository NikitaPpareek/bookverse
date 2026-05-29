import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
  },
  { timestamps: true }
);

const bookSchema = new mongoose.Schema(
  {
    googleId: { type: String, sparse: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    category: { type: String, default: "General" },
    categories: [String],
    price: { type: Number, required: true, default: 14.99 },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    publishedDate: { type: String, default: "" },
    pageCount: { type: Number, default: 0 },
    language: { type: String, default: "en" },
    publisher: { type: String, default: "" },
    isbn: { type: String, default: "" },
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
