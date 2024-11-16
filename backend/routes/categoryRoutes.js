import express from "express";
const router = express.Router();
import { createCategory, removeCategory, listCategory, readCategory } from "../controllers/categoryController.js";
import { authenticate } from "../middleware/authMiddleware.js";

router.post("/", authenticate, createCategory);
router.delete("/:categoryId", authenticate, removeCategory);
router.get("/categories", listCategory);
router.get("/:id", readCategory);

export default router;
