import mongoose from "mongoose";

const youtubeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
}, {
  timestamps: true,
});

export const Youtube =mongoose.model("Youtube",youtubeSchema)