import express from "express";
import {
  getVideos,
  createVideo,
  deleteVideo,
} from "../controllers/YouTube controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getVideos);
router.post("/", isAuthenticated, isAdmin, createVideo);
router.delete("/:id", isAuthenticated, isAdmin, deleteVideo);

export default router;