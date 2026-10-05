import { Request, Response } from "express";
import { getMyProjects } from "../services/projectService.js";
import { apiService, failureResponse, unAuthorisedResponse } from "../utils/commonAuthUtils.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const getProjects = asyncHandler(
    async (req: Request, res: Response) => {

        const userId = req.user?.userId;

        if (!userId) {
            return unAuthorisedResponse(
                res,
                "User not authenticated"
            );
        }

        const projects = await getMyProjects(userId);

        const response = apiService(
            "projects",
            projects
        );

        return res.status(200).json(response);
    }
);
// export const getProjects = async (req: Request,
//     res: Response): Promise<Response> => {
//     try {
//         const userId = req.user?.userId

//         if (!userId) {
//             return unAuthorisedResponse(res)
//         }

//         const projects = await getMyProjects(userId);
//         const response = apiService("projects", projects)
//         return res.status(200).json(response)
//     }
//     catch (error) {
//         console.error("Error fetching projects:", error);

//         return failureResponse(res, "Failed to fetch")
//     }
// };