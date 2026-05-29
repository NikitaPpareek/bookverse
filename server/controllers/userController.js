import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json({ success: true, users });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({ success: true, user });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { new: true }
  ).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({ success: true, user });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({ success: true, message: "User removed" });
});

export const saveRecentlyViewed = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const book = req.body;
  user.recentlyViewed = [
    book,
    ...user.recentlyViewed.filter((b) => b.googleId !== book.googleId && String(b._id) !== String(book._id)),
  ].slice(0, 12);
  await user.save();
  res.json({ success: true, recentlyViewed: user.recentlyViewed });
});

export const getRecentlyViewed = asyncHandler(async (req, res) => {
  res.json({ success: true, recentlyViewed: req.user.recentlyViewed || [] });
});

export const subscribeNewsletter = asyncHandler(async (req, res) => {
  res.json({ success: true, message: "Subscribed successfully!" });
});
