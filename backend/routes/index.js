import express from "express";

import postRoutes from "./postRoutes.js";
import commentRoutes from "./commentRoute.js";
import timelineRoutes from "./timelineRoutes.js";
import userRoutes from "./User.js";
import visitRoutes from "./visitRoutes.js";
import aboutRoutes from "./aboutRoute.js";
import aboutMeRoutes from "./aboutMeRoutes.js";
import massageRoutes from "./massageRoutes.js";
import skillsRoutes from "./skillsRoutes.js";
import projectRoutes from "./projectRoutes.js";
import { notificationRoutes } from "./notificationRoute.js";
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
router.use("/notification ",notificationRoutes);

export default router;