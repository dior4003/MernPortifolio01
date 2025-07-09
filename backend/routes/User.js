import express from "express";
import {
  register,
  login,
  logout,
  getMyProfile,
} from "../controllers/User.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", isAuthenticated, getMyProfile);

export default router;