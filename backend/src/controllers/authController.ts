import { Request, Response } from "express";
import { loginSchema } from "../validations/authSchema.js";
import { loginUser } from "../services/authService.js";

export const login = async (req: Request, res: Response) => {
    try {
        const result = loginSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.issues,
            });
        }

        const { email, password } = result.data;

        const user = await loginUser(email, password);

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            data: user,
        })
    }
    catch (error) {
        console.error("Login error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
    }
}