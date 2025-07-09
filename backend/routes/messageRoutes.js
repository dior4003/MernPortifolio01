import express from "express";
import {
  sendMassage,
  getMassages,
  deleteMassage,
} from "../controllers/Massage.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", sendMassage);
router.get("/", isAuthenticated, isAdmin, getMassages);
router.delete("/:id", isAuthenticated, isAdmin, deleteMassage);

export default router;