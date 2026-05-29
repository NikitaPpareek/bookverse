import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getAnalytics,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/auth.js";

const router = Router();
router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/analytics", protect, admin, getAnalytics);
router.get("/all", protect, admin, getAllOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
