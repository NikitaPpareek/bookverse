import { Router } from "express";
import {
  getBooks,
  getBookById,
  getFeatured,
  getTrending,
  searchSuggestions,
  createBook,
  updateBook,
  deleteBook,
  addReview,
  syncFromGoogle,
} from "../controllers/bookController.js";
import { protect, admin } from "../middleware/auth.js";

const router = Router();
router.get("/", getBooks);
router.get("/featured", getFeatured);
router.get("/trending", getTrending);
router.get("/suggestions", searchSuggestions);
router.get("/:id", getBookById);
router.post("/:id/reviews", protect, addReview);
router.post("/sync/:googleId", protect, admin, syncFromGoogle);
router.post("/", protect, admin, createBook);
router.put("/:id", protect, admin, updateBook);
router.delete("/:id", protect, admin, deleteBook);

export default router;
