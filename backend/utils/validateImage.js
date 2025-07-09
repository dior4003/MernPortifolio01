// Ruxsat etilgan MIME turlar
const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/**
 * Rasmni tekshiradi
 * @param {Object} file - Fayl obyekt (mulohazali: multer yoki base64)
 * @param {Number} maxSizeMB - Maksimal hajm (MB)
 * @returns {Object} - { valid: Boolean, message: String }
 */
export const validateImage = (file, maxSizeMB = 7) => {
  if (!file) {
    return { valid: false, message: "Rasm topilmadi" };
  }

  const { mimetype, size } = file;

  if (!allowedTypes.includes(mimetype)) {
    return {
      valid: false,
      message: `Ruxsat etilmagan format: ${mimetype}. Faqat JPEG, PNG, WEBP, GIF.`,
    };
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (size > maxSizeBytes) {
    return {
      valid: false,
      message: `Rasm hajmi ${maxSizeMB}MB dan oshmasligi kerak.`,
    };
  }

  return { valid: true };
};