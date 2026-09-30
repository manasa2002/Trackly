import { Request, Response } from "express";
import { getUsers, createUser as createUserService } from "../services/userService.js";


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
        const { name, email, password } = req.body;
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