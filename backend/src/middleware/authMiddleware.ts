
import jwt from "jsonwebtoken";
import { TokenPayload } from "../utils/jwt.js";
import { Request, Response, NextFunction } from "express";
import { unAuthorisedResponse } from "../utils/commonAuthUtils.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const authMiddleware = (req: Request, res: Response,
    next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            unAuthorisedResponse(res, "Authentication token is required");
            return;
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            unAuthorisedResponse(res, "Invalid authorization header")
        }

        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
        req.user = decoded;

        next();

    } catch (error) {
        unAuthorisedResponse(res, "Invalid or expired token")
    }
}