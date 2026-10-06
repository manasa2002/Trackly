import { Request, Response } from "express";
import { getMyProjects, createProject as createProjectService, } from "../services/projectService.js";
import { apiService, successResponse, failureResponse, unAuthorisedResponse } from "../utils/commonAuthUtils.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { createProjectSchema } from "../validations/projectSchema.js";

//get my projects
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

//create project 

export const createProject = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?.userId;

        if (!userId) {
            return unAuthorisedResponse(res)
        }
        const result = createProjectSchema.safeParse(req.body);
        if (!result.success) {
            return failureResponse(res, "Validation failed", 400)
        }
        const { name, description, } = result.data;

        const project = await createProjectService(userId, name, description);

        return successResponse(res, "Project created successfully", project)
    }
)