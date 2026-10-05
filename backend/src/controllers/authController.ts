import { Request, Response } from "express";
import { loginSchema } from "../validations/authSchema.js";
import { loginUser } from "../services/authService.js";
import { failureResponse, successResponse, unAuthorisedResponse } from "../utils/commonAuthUtils.js";

export const login = async (req: Request,
    res: Response): Promise<Response> => {
    try {
        const result = loginSchema.safeParse(req.body);

        if (!result.success) {
            return failureResponse(res, "validation failed")
        }

        const { email, password } = result.data;

        const user = await loginUser(email, password);

        return successResponse(res, "Login Successful", user)
    }
    catch (error) {
        console.error("Login error:", error);

        return unAuthorisedResponse(res, "Invalid email or password")
    };
}