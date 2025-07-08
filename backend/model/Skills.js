import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  public_id: String,
  url: String,
}, { _id: false });

const skillsSchema = new mongoose.Schema({
  image1: imageSchema,
  image2: imageSchema,
  image3: imageSchema,
  image4: imageSchema,
  image5: imageSchema,
  image6: imageSchema,
}, {
  timestamps: true,
});

export const Skills = mongoose.model("Skills", skillsSchema);