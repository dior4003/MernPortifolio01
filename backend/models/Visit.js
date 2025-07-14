import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  path: String,
  method: String,
  statusCode: Number,
  referrer: String,
  isBot: Boolean,
  sessionId: String,
  country: String,
  city: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  duration: {
    type: Number, // sekundlarda
    
  },
}, { timestamps: true });
export const Visit = mongoose.model("Visit" , visitSchema)