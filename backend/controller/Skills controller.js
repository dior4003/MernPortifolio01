import { Skills } from "../models/Skills.js";
import { Image } from "../models/Image.js";
import cloudinary from "../utils/Cloudinary.js";

// 📥 Bitta skill rasm yuklash
export const uploadSkillImage = async (req, res) => {
  try {
    const { key, image, label } = req.body;

    const allowedKeys = ["image1", "image2", "image3", "image4", "image5", "image6"];
    if (!allowedKeys.includes(key)) {
      return res.status(400).json({ success: false, message: "Noto‘g‘ri kalit" });
    }

    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio/skills",
      quality: "auto",
      fetch_format: "auto",
    });

    const newImage = await Image.create({
      key: "skill",
      label,
      public_id: result.public_id,
      url: result.secure_url,
      uploadedBy: req.user._id,
      usedIn: `skills.${key}`,
    });

    let skills = await Skills.findOne();
    if (!skills) skills = await Skills.create({});

    // Eski rasmni bo‘shatish
    if (skills[key]) {
      const oldImage = await Image.findById(skills[key]);
      if (oldImage) {
        oldImage.usedIn = null;
        await oldImage.save();
      }
    }

    skills[key] = newImage._id;
    await skills.save();

    res.status(200).json({ success: true, message: `${key} yuklandi`, image: newImage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📋 Barcha skill rasmlarni olish
export const getSkills = async (req, res) => {
  try {
    const skills = await Skills.findOne().populate([
      "image1", "image2", "image3", "image4", "image5", "image6",
    ]);
    res.status(200).json({ success: true, skills });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};