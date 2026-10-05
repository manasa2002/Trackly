import { Request, Response } from "express";
import { getUsers, createUser as createUserService } from "../services/userService.js";
import { createUserSchema } from "../validations/userSchema.js";
import { apiService, failureResponse, successResponse } from "../utils/commonAuthUtils.js";


export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await getUsers();
        const response = apiService("users", users)
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching Users:", error);
        return failureResponse(res,
            "Failed to fetch users"
        )
    }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = createUserSchema.safeParse(req.body);
        if (!result.success) {
            return failureResponse(res, "Validation failed")
        }
        const { name, email, password } = result.data;
        const user = await createUserService(name, email, password);
        return successResponse(res, "User created successfully", user);

    } catch (error) {
        console.error("Error creating user:", error);
        return failureResponse(res, "Failed to create User")
    }
};