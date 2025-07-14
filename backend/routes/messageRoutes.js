import express from "express";
import {
  sendMessage,
  getAllMessages,
  deleteMessage,
  markAsRead
} from "../controller/Massage.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/", isAuthenticated, isAdmin, getAllMessages);
router.delete("/:id", isAuthenticated, isAdmin, deleteMessage);
router.get("/:id",isAuthenticated,markAsRead)

export default router;