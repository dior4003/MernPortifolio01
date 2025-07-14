import { Post } from "../models/Posts.js";
import { Image } from "../models/Image.js";
import cloudinary from "../utils/Cloudinary.js";

// 📥 Post yaratish
export const createPost = async (req, res) => {
  try {
    const { title, content, tags, image, imageLabel } = req.body;

    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio/posts",
      quality: "auto",
      fetch_format: "auto",
    });

    const newImage = await Image.create({
      key: "post",
      label: imageLabel || title,
      public_id: result.public_id,
      url: result.secure_url,
      uploadedBy: req.user._id,
      usedIn: "post",
    });

    const post = await Post.create({
      title,
      content,
      tags,
      image: newImage._id,
    });

    res.status(201).json({ success: true, message: "Post yaratildi", post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📋 Barcha postlar
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .populate("image");

    res.status(200).json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📄 Bitta post
export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("image");
    if (!post || post.isDeleted) {
      return res.status(404).json({ success: false, message: "Post topilmadi" });
    }

    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✏️ Post yangilash
export const updatePost = async (req, res) => {
  try {
    const { title, content, tags, image, imageLabel } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post || post.isDeleted) {
      return res.status(404).json({ success: false, message: "Post topilmadi" });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (tags) post.tags = tags;

    if (image) {
      const oldImage = await Image.findById(post.image);
      if (oldImage) {
        oldImage.usedIn = null;
        await oldImage.save();
      }

      const result = await cloudinary.v2.uploader.upload(image, {
        folder: "portfolio/posts",
        quality: "auto",
        fetch_format: "auto",
      });

      const newImage = await Image.create({
        key: "post",
        label: imageLabel || title,
        public_id: result.public_id,
        url: result.secure_url,
        uploadedBy: req.user._id,
        usedIn: "post",
      });

      post.image = newImage._id;
    }

    await post.save();
    res.status(200).json({ success: true, message: "Post yangilandi", post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🗑️ Postni o‘chirish (soft delete)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.isDeleted) {
      return res.status(404).json({ success: false, message: "Post topilmadi" });
    }

    post.isDeleted = true;

    if (post.image) {
      const image = await Image.findById(post.image);
      if (image) {
        image.usedIn = null;
        await image.save();
      }
    }

    await post.save();
    res.status(200).json({ success: true, message: "Post o‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ❤️ Like / Unlike
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.isDeleted) {
      return res.status(404).json({ success: false, message: "Post topilmadi" });
    }

    const userId = req.user._id.toString();
    const index = post.likes.findIndex(id => id.toString() === userId);

    if (index === -1) {
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ success: true, message: "Like bosildi" });
    } else {
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({ success: true, message: "Like olib tashlandi" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};