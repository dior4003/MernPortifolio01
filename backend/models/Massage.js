import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Ism kerak"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email kerak"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Xabar matni kerak"],
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const Message = mongoose.model("Message", messageSchema);