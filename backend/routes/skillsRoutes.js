import express from "express";
import {
  getSkills,
  uploadSkillImage
  
} from "../controller/Skills controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", isAuthenticated, isAdmin,uploadSkillImage);
router.put("/:id", isAuthenticated, isAdmin, uploadSkillImage);

export default router;