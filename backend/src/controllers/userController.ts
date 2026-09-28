import { Request, Response } from "express";
import { getUsers } from "../services/userService.js";


export const getAllUsers = async(req: Request, res:Response) => {
    try {
        const users = await getUsers();

        res.status(200).json({
            success: true,
            data:users,
        });

    } catch(error) {
        console.error("Error fetching Users:",error);

        res.status(500).json({
            success:false,
            message:"Failed to fetch users",
        });
    }
};