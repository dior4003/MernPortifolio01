import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["info", "success", "warning", "error", "request", "reply"],
    default: "info",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const Notification = mongoose.model("Notification", notificationSchema);