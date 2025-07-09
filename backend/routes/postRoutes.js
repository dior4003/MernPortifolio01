import express from "express";
import {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  toggleLike,
} from "../controllers/PostController.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getSinglePost);
router.post("/", isAuthenticated, isAdmin, createPost);
router.put("/:id", isAuthenticated, isAdmin, updatePost);
router.delete("/:id", isAuthenticated, isAdmin, deletePost);
router.post("/:id/like", isAuthenticated, toggleLike);

export default router;