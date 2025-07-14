import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMyProfile,
} from "../controller/User.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", isAuthenticated, getMyProfile);

export default router;