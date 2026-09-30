import "dotenv/config";

import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);

app.get("/api/health", (_req, res) => {
    res.json({
        success: true,
        message: "Trackly API is running 🚀",
    });
});

app.get("/api/users", async (_req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Trackly API running on http://localhost:${PORT}`);
});