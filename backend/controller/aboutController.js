import { About } from "../models/About.js";
import { Image } from "../models/Image.js";
import cloudinary from "../utils/Cloudinary.js";

// 📥 Yaratish yoki yangilash
export const updateAbout = async (req, res) => {
  try {
    const { name, title, subtitle, description, quote, avatar, avatarLabel } = req.body;

    let about = await About.findOne();
    if (!about) about = await About.create({});

    if (avatar) {
      // Eski rasmni bo‘shatish
      if (about.avatar) {
        const oldImage = await Image.findById(about.avatar);
        if (oldImage) {
          oldImage.usedIn = null;
          await oldImage.save();
        }
      }

      const result = await cloudinary.v2.uploader.upload(avatar, {
        folder: "portfolio/about",
        quality: "auto",
        fetch_format: "auto",
      });

      const newImage = await Image.create({
        key: "about",
        label: avatarLabel || name,
        public_id: result.public_id,
        url: result.secure_url,
        uploadedBy: req.user._id,
        usedIn: "about.avatar",
      });

      about.avatar = newImage._id;
    }

    about.name = name || about.name;
    about.title = title || about.title;
    about.subtitle = subtitle || about.subtitle;
    about.description = description || about.description;
    about.quote = quote || about.quote;

    await about.save();
    res.status(200).json({ success: true, message: "Ma’lumot saqlandi", about });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📋 Olish
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne().populate("avatar");
    res.status(200).json({ success: true, about });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};