import { Request, Response } from "express";
import { getUsers, createUser as createUserService } from "../services/userService.js";
import { createUserSchema } from "../validations/userSchema.js";


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error("Error fetching Users:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {

        const result = createUserSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.issues,
            });
        }
        const { name, email, password } = result.data;
        const user = await createUserService(name, email, password);
        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};