import asyncHandler from "../utils/asyncHandler.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart?.items?.length) {
    res.status(400);
    throw new Error("Cart is empty");
  }
  const itemsPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const taxPrice = Math.round(itemsPrice * 0.08 * 100) / 100;
  const shippingPrice = itemsPrice > 50 ? 0 : 5.99;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const order = await Order.create({
    user: req.user._id,
    items: cart.items.map((i) => ({
      book: i.book,
      googleId: i.googleId,
      title: i.title,
      author: i.author,
      coverImage: i.coverImage,
      price: i.price,
      quantity: i.quantity,
    })),
    shippingAddress: req.body.shippingAddress || req.user.address,
    paymentMethod: req.body.paymentMethod || "card",
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid: true,
    paidAt: new Date(),
    status: "processing",
  });

  cart.items = [];
  await cart.save();
  res.status(201).json({ success: true, order });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || String(order.user) !== String(req.user._id)) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json({ success: true, order });
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json({ success: true, order });
});

export const getAnalytics = asyncHandler(async (req, res) => {
  const orders = await Order.find({ isPaid: true });
  const revenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const byStatus = await Order.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  const monthly = await Order.aggregate([
    { $match: { isPaid: true } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        revenue: { $sum: "$totalPrice" },
        orders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $limit: 6 },
  ]);
  res.json({
    success: true,
    analytics: {
      totalOrders: orders.length,
      revenue: Math.round(revenue * 100) / 100,
      averageOrder: orders.length ? Math.round((revenue / orders.length) * 100) / 100 : 0,
      byStatus,
      monthly,
    },
  });
});
