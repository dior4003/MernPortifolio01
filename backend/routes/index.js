import express from "express";

import postRoutes from "./postRoutes.js";
import commentRoutes from "./commentRoutes.js";
import timelineRoutes from "./timelineRoutes.js";
import userRoutes from "./userRoutes.js";
import visitRoutes from "./visitRoutes.js";
import aboutRoutes from "./aboutRoutes.js";
import aboutMeRoutes from "./aboutMeRoutes.js";
import massageRoutes from "./massageRoutes.js";
import skillsRoutes from "./skillsRoutes.js";
import projectRoutes from "./projectRoutes.js";
import youtubeRoutes from "./youtubeRoutes.js";

const router = express.Router();

router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/timeline", timelineRoutes);
router.use("/users", userRoutes);
router.use("/visits", visitRoutes);
router.use("/about", aboutRoutes);
router.use("/about-me", aboutMeRoutes);
router.use("/massages", massageRoutes);
router.use("/skills", skillsRoutes);
router.use("/projects", projectRoutes);
router.use("/youtube", youtubeRoutes);

export default router;