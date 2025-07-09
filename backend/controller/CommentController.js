import { Comment } from "../models/Comment.js";
import { Post } from "../models/Post.js";

// 💬 Izoh qo‘shish
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post || post.isDeleted) {
      return res.status(404).json({ success: false, message: "Post topilmadi" });
    }

    const comment = await Comment.create({
      post: postId,
      user: req.user._id,
      text,
    });

    res.status(201).json({ success: true, message: "Izoh qo‘shildi", comment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📋 Postga tegishli barcha izohlar
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate("user", "name avatar");

    res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🗑️ Izohni o‘chirish (admin yoki o‘zi)
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ success: false, message: "Izoh topilmadi" });

    const isOwner = comment.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: "Ruxsat yo‘q" });
    }

    await comment.deleteOne();
    res.status(200).json({ success: true, message: "Izoh o‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};