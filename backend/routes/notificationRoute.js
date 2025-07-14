import express from "express";
import {
  getMyNotifications,
  sendNotification,
  markNotificationAsRead,
  deleteNotification,
} from "../controller/notificationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", isAuthenticated, getMyNotifications);
router.put("/:id/read", isAuthenticated, markNotificationAsRead);
router.delete("/:id", isAuthenticated, deleteNotification);
router.post("/",isAuthenticated,sendNotification)


export default router;