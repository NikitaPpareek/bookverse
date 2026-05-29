import asyncHandler from "../utils/asyncHandler.js";
import Cart from "../models/Cart.js";

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

export const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  res.json({ success: true, cart });
});

export const addToCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  const item = req.body;
  const key = item.book || item.googleId;
  const existing = cart.items.find(
    (i) => String(i.book) === String(key) || i.googleId === item.googleId
  );
  if (existing) {
    existing.quantity += item.quantity || 1;
  } else {
    cart.items.push({
      book: item.book,
      googleId: item.googleId,
      title: item.title,
      author: item.author,
      coverImage: item.coverImage,
      price: item.price,
      quantity: item.quantity || 1,
    });
  }
  await cart.save();
  res.json({ success: true, cart });
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  const item = cart.items.id(req.params.itemId);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  item.quantity = Math.max(1, Number(req.body.quantity));
  await cart.save();
  res.json({ success: true, cart });
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  cart.items = cart.items.filter((i) => String(i._id) !== req.params.itemId);
  await cart.save();
  res.json({ success: true, cart });
});

export const clearCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  cart.items = [];
  await cart.save();
  res.json({ success: true, cart });
});
