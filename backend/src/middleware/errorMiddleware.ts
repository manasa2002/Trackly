import { NextFunction, Request, Response } from "express";
import { failureResponse } from "../utils/commonAuthUtils.js";


export const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): Response => {
    console.error("Unhandled Error:", error);
    return failureResponse(res, error.message || "02",
        500
    )
}