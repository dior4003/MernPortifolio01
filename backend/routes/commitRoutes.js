import express from "express";
import {
  addComment,
  getCommentsByPost,
  deleteComment,
} from "../controllers/CommentController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:postId", isAuthenticated, addComment);
router.get("/:postId", getCommentsByPost);
router.delete("/:id", isAuthenticated, deleteComment);

export default router;