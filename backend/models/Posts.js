import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Sarlavha majburiy"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Kontent majburiy"],
  },
  tags: {
    type: [String],
    default: [],
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const Post = mongoose.model("Post", postSchema);