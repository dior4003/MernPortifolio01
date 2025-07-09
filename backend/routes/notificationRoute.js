import express from "express";
import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", isAuthenticated, getNotifications);
router.put("/:id/read", isAuthenticated, markNotificationAsRead);
router.delete("/:id", isAuthenticated, deleteNotification);

export default router;