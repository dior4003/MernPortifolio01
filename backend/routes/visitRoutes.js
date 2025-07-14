import express from "express";
import {
  logVisit,
  getVisitStats,
  clearVisits,
} from "../controller/VisitController.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", logVisit);
router.get("/", isAuthenticated, isAdmin, getVisitStats);
router.delete("/", isAuthenticated, isAdmin, clearVisits);

export default router;