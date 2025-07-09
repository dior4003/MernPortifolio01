import express from "express";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/Skills controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", isAuthenticated, isAdmin, createSkill);
router.put("/:id", isAuthenticated, isAdmin, updateSkill);
router.delete("/:id", isAuthenticated, isAdmin, deleteSkill);

export default router;