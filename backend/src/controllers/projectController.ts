import { Request, Response } from "express";
import { getMyProjects } from "../services/projectService.js";


export const getProjects = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const projects = await getMyProjects(userId);

        return res.status(200).json({
            success: true,
            data: projects,
        });
    }
    catch (error) {
        console.error("Error fetching projects:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
        });
    }
};