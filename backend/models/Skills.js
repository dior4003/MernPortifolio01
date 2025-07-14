import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
  image1: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  image2: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  image3: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  image4: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  image5: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  image6: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
}, {
  timestamps: true,
});
export const Skills =mongoose.model("Skills",skillsSchema)