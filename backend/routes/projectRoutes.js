import express from "express";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controller/projectController.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllProjects);
router.post("/", isAuthenticated, isAdmin, createProject);
router.put("/:id", isAuthenticated, isAdmin, updateProject);
router.delete("/:id", isAuthenticated, isAdmin, deleteProject);

export default router;