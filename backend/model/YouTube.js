import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  public_id: String,
  url: String,
}, { _id: false });

const youtubeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  image: imageSchema,
}, {
  timestamps: true,
});

export const Youtube = mongoose.model("Youtube", youtubeSchema);