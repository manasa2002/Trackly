import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// router.get("/", getAllUsers);

router.post("/", createUser);

router.get("/", authMiddleware, getAllUsers)
export default router;