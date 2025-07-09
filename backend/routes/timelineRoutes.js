import express from "express";
import {
  getTimeline,
  createTimeline,
  updateTimeline,
  deleteTimeline,
} from "../controllers/TimelineController.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getTimeline);
router.post("/", isAuthenticated, isAdmin, createTimeline);
router.put("/:id", isAuthenticated, isAdmin, updateTimeline);
router.delete("/:id", isAuthenticated, isAdmin, deleteTimeline);

export default router;