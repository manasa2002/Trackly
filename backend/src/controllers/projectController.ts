import { Request, Response } from "express";
import { getMyProjects } from "../services/projectService.js";
import { apiService, failureResponse, unAuthorisedResponse } from "../utils/commonAuthUtils.js";


export const getProjects = async (req: Request,
    res: Response): Promise<Response> => {
    try {
        const userId = req.user?.userId

        if (!userId) {
            return unAuthorisedResponse(res)
        }

        const projects = await getMyProjects(userId);
        const response = apiService("projects", projects)
        return res.status(200).json(response)
    }
    catch (error) {
        console.error("Error fetching projects:", error);

        return failureResponse(res, "Failed to fetch projects")
    }
};