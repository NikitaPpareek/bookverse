import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  saveRecentlyViewed,
  getRecentlyViewed,
  subscribeNewsletter,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/auth.js";

const router = Router();
router.post("/newsletter", subscribeNewsletter);
router.get("/recent", protect, getRecentlyViewed);
router.post("/recent", protect, saveRecentlyViewed);
router.get("/", protect, admin, getUsers);
router.get("/:id", protect, admin, getUserById);
router.put("/:id/role", protect, admin, updateUserRole);
router.delete("/:id", protect, admin, deleteUser);

export default router;
