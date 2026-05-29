import "dotenv/config";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Wishlist from "../models/Wishlist.js";

const seed = async () => {
  await connectDB();
  await User.deleteMany();
  await Cart.deleteMany();
  await Wishlist.deleteMany();

  const admin = await User.create({
    name: "Admin User",
    email: "admin@bookverse.com",
    password: "admin123",
    role: "admin",
  });
  const demo = await User.create({
    name: "Demo Reader",
    email: "demo@bookverse.com",
    password: "demo123",
    role: "user",
  });

  await Cart.create({ user: admin._id, items: [] });
  await Cart.create({ user: demo._id, items: [] });
  await Wishlist.create({ user: admin._id, items: [] });
  await Wishlist.create({ user: demo._id, items: [] });

  console.log("Seed complete! (Users only — books fetched live from Google Books API)");
  console.log("Admin: admin@bookverse.com / admin123");
  console.log("Demo:  demo@bookverse.com / demo123");
  process.exit(0);
};

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
