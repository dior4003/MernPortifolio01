import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", isAuthenticated, isAdmin, createProject);
router.put("/:id", isAuthenticated, isAdmin, updateProject);
router.delete("/:id", isAuthenticated, isAdmin, deleteProject);

export default router;