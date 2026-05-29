import mongoose from "mongoose";

const wishlistItemSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  googleId: String,
  title: String,
  author: String,
  coverImage: String,
  price: Number,
  category: String,
  description: String,
  rating: Number,
});

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [wishlistItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);
