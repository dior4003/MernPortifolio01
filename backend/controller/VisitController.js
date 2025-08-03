import { Visit } from "../models/Visit.js";

// 📥 Tashrifni log qilish (har kim)

export const logVisit = async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const path = req.body.path || req.originalUrl;

    const country = req.body.country || "Unknown";
    const city = req.body.city || "Unknown";
    const device = req.body.device || "Unknown";

    const existingVisit = await Visit.findOne({ ip, userAgent, path });

    if (existingVisit) {
      // 🗓️ Yangilangan vaqtni massivga push qilamiz
      existingVisit.country = country;
      existingVisit.city = city;
      existingVisit.device = device;

      existingVisit.updates.push(Date.now()); // 📍 Update tarixini qo‘shish

      await existingVisit.save();

      return res.status(200).json({ success: true, message: "Tashrif yangilandi" });
    }

    await Visit.create({
      ip,
      userAgent,
      path,
      country,
      city,
      device,
      updates: [] // 🔔 Birinchi yozuvda bo‘sh list
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
