import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createProject, getProjects } from "../controllers/projectController.js";

const router = Router();

router.get("/", authMiddleware, getProjects);
router.get("/createProject", authMiddleware, createProject);

export default router;