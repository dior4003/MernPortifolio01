import express from "express";
import {
  getAboutMe,
  createAboutMe,
  updateAboutMe,
  deleteAboutMe,
} from "../controller/AboutMe.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAboutMe);
router.post("/", isAuthenticated, isAdmin, createAboutMe);
router.put("/:id", isAuthenticated, isAdmin, updateAboutMe);
router.delete("/:id", isAuthenticated, isAdmin, deleteAboutMe);

export default router;