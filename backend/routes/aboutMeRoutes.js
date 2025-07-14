import express from "express";
import {
  getAboutMe,
  updateAboutMe
} from "../controller/AboutMe.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAboutMe);
router.post("/", isAuthenticated, isAdmin, updateAboutMe);
router.put("/:id", isAuthenticated, isAdmin, updateAboutMe);


export default router;