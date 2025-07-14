import { Youtube } from "../models/YouTube.js";
import { Image } from "../models/Image.js";
import cloudinary from "../utils/Cloudinary.js";

// 📥 Yangi video qo‘shish
export const createVideo = async (req, res) => {
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
export const getVideos = async (req, res) => {
  try {
    const videos = await Youtube.find().sort({ createdAt: -1 }).populate("image");
    res.status(200).json({ success: true, videos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteVideo = async (req, res) => 
  {
    try {
        const { id } = req.params;

        const video = await Youtube.findById(id);
        if (!video) return res.status(404).json({ success: false, message: "Topilmadi" });

         await video.deleteOne();
         res.status(200).json({ success: true, message: "Video o‘chirildi" });
    } catch (err) {
                 
      res.status(500).json({ success: false, message: err.message });
     }
    };
