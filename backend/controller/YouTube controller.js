import { Youtube } from "../models/Youtube.js";
import { Image } from "../models/Image.js";
import cloudinary from "../utils/cloudinary.js";

// 📥 Yangi video qo‘shish
export const createYoutube = async (req, res) => {
  try {
    const { title, url, image, imageLabel } = req.body;

    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio/youtube",
      quality: "auto",
      fetch_format: "auto",
    });

    const newImage = await Image.create({
      key: "youtube",
      label: imageLabel || title,
      public_id: result.public_id,
      url: result.secure_url,
      uploadedBy: req.user._id,
      usedIn: "youtube",
    });

    const video = await Youtube.create({
      title,
      url,
      image: newImage._id,
    });

    res.status(201).json({ success: true, message: "Video qo‘shildi", video });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📋 Barcha videolar
export const getAllYoutube = async (req, res) => {
  try {
    const videos = await Youtube.find().sort({ createdAt: -1 }).populate("image");
    res.status(200).json({ success: true, videos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};