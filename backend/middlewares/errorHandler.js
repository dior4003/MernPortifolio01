// ❌ 404 Not Found
export const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `URL topilmadi: ${req.originalUrl}` });
};

// ❗ Global xatolik ushlovchi
export const errorHandler = (err, req, res, next) => {
  console.error("Xatolik:", err.stack);
  res.status(500).json({ success: false, message: err.message || "Server xatosi" });
};