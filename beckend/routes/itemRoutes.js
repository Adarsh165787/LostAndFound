import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createItem,
  getItems,
  deleteItem,
  searchItems,
} from "../controllers/itemController.js";

const router = express.Router();

router.post("/", protect, createItem);
router.get("/", protect, getItems);
router.delete("/:id", protect, deleteItem);
router.get("/search", protect, searchItems);

export default router;