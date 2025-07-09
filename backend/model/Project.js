
export const Project = mongoose.model("Project", projectSchema);
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: String,
  description: String,
  techStack: String,
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true,
});