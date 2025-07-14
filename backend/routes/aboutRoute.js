import express from "express";
import { getAbout, updateAbout } from "../controller/aboutController.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAbout);
router.put("/", isAuthenticated, isAdmin, updateAbout);

export default router;