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
    default: 0,   // ⏱️ agar duration bo'lmasa 0 sifatida saqlanadi
  },
  updates: {
    type: [Date], // 🔄 har bir update vaqti bu arrayga push qilinadi
    default: [],  // 🔔 boshlang‘ich qiymat bo‘sh massiv
  },
}, { timestamps: true }); // createdAt & updatedAt avtomatik

export const Visit = mongoose.model("Visit", visitSchema);
