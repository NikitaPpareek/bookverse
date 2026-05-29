import asyncHandler from "../utils/asyncHandler.js";
import Wishlist from "../models/Wishlist.js";

const getOrCreate = async (userId) => {
  let list = await Wishlist.findOne({ user: userId });
  if (!list) list = await Wishlist.create({ user: userId, items: [] });
  return list;
};

export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getOrCreate(req.user._id);
  res.json({ success: true, wishlist });
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getOrCreate(req.user._id);
  const item = req.body;
  const exists = wishlist.items.some(
    (i) =>
      (item.book && String(i.book) === String(item.book)) ||
      (item.googleId && i.googleId === item.googleId)
  );
  if (!exists) {
    wishlist.items.push(item);
    await wishlist.save();
  }
  res.json({ success: true, wishlist });
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getOrCreate(req.user._id);
  wishlist.items = wishlist.items.filter((i) => String(i._id) !== req.params.itemId);
  await wishlist.save();
  res.json({ success: true, wishlist });
});

export const moveToCart = asyncHandler(async (req, res) => {
  res.json({ success: true, message: "Use cart endpoint with wishlist item data" });
});
