import { Visit } from "../models/Visit.js";

// 📥 Tashrifni log qilish (har kim)
export const logVisit = async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const path = req.body.path || req.originalUrl;

    await Visit.create({
      ip,
      userAgent,
      path,
      country: req.body.country || "Unknown",
      city: req.body.city || "Unknown",
      device: req.body.device || "Unknown",
    });

    res.status(201).json({ success: true, message: "Tashrif log qilindi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📊 Statistikani olish (admin)
export const getVisitStats = async (req, res) => {
  try {
    const visits = await Visit.find().sort({ createdAt: -1 }).limit(1000);
    res.status(200).json({ success: true, visits });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🧹 Barcha tashriflarni tozalash (admin)
export const clearVisits = async (req, res) => {
  try {
    await Visit.deleteMany();
    res.status(200).json({ success: true, message: "Barcha tashriflar o‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};