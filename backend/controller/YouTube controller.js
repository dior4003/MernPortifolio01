import { Youtube } from "../models/Youtube.js";
import cloudinary from "../utils/cloudinary.js";

// 📥 Yangi video qo‘shish (admin)
export const createYoutube = async (req, res) => {
  try {
    const { title, url, image } = req.body;

    let uploadedImage = null;

    if (image) {
      const result = await cloudinary.v2.uploader.upload(image, {
        folder: "portfolio/youtube",
      });

      uploadedImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const video = await Youtube.create({
      title,
      url,
      image: uploadedImage,
    });

    res.status(201).json({ success: true, message: "Video qo‘shildi", video });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📋 Barcha videolarni olish
export const getAllYoutube = async (req, res) => {
  try {
    const videos = await Youtube.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, videos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✏️ Videoni yangilash (admin)
export const updateYoutube = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, image } = req.body;

    const video = await Youtube.findById(id);
    if (!video) return res.status(404).json({ success: false, message: "Video topilmadi" });

    if (title) video.title = title;
    if (url) video.url = url;

    if (image) {
      if (video.image?.public_id) {
        await cloudinary.v2.uploader.destroy(video.image.public_id);
      }

      const result = await cloudinary.v2.uploader.upload(image, {
        folder: "portfolio/youtube",
      });

      video.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    await video.save();
    res.status(200).json({ success: true, message: "Video yangilandi", video });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🗑️ Videoni o‘chirish (admin)
export const deleteYoutube = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Youtube.findById(id);
    if (!video) return res.status(404).json({ success: false, message: "Topilmadi" });

    if (video.image?.public_id) {
      await cloudinary.v2.uploader.destroy(video.image.public_id);
    }

    await video.deleteOne();
    res.status(200).json({ success: true, message: "Video o‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};