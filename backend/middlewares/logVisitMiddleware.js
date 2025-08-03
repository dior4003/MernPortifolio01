// middleware/logVisitMiddleware.js
import { Visit } from "../models/Visit.js";

export const logVisitMiddleware = async (req, res, next) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const path = req.originalUrl;
    const method = req.method;
    const referrer = req.headers["referer"] || "Unknown";
    const statusCode = res.statusCode;
    const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
    const sessionId = req.headers["session-id"] || null;

    // Optional: country/city from headers or IP detection service
    const country = req.headers["x-country"] || "Unknown";
    const city = req.headers["x-city"] || "Unknown";
    const device = req.headers["x-device"] || "Unknown";

    const existingVisit = await Visit.findOne({ ip, userAgent, path });

    if (existingVisit) {
      existingVisit.method = method;
      existingVisit.statusCode = statusCode;
      existingVisit.referrer = referrer;
      existingVisit.isBot = isBot;
      existingVisit.sessionId = sessionId;
      existingVisit.country = country;
      existingVisit.city = city;
      existingVisit.device = device;
      existingVisit.updates.push(Date.now());

      await existingVisit.save();
    } else {
      await Visit.create({
        ip,
        userAgent,
        path,
        method,
        statusCode,
        referrer,
        isBot,
        sessionId,
        country,
        city,
        device,
        updates: []
      });
    }

    next(); // 📌 Asosiy route’ga o‘tkazamiz
  } catch (err) {
    console.error("LogVisitMiddleware xatosi:", err.message);
    next(); // hatolik bo‘lsa ham route ishlashi kerak
  }
};
