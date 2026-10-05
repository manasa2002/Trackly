import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getProjects } from "../controllers/projectController.js";

const router = Router();

router.get("/", authMiddleware, getProjects);

export default router;