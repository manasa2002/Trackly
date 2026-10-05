import { Response } from "express";

type ApiResponse = {
    status: boolean;
    scode: string;
    sdesc: string;
    [key: string]: unknown;
}

export const apiService = (
    apiServiceName: string,
    repoMethod: Record<string, unknown>[]
): ApiResponse => {
    try {
        if (repoMethod.length > 0) {
            return {
                status: true,
                scode: "01",
                sdesc: "Data found",
                [apiServiceName]: repoMethod,
                data_count: repoMethod.length,
            }
        } else {
            return {
                status: false,
                scode: "03",
                sdesc: "No data found",
                [apiServiceName]: "No data found",
                data_count: 0,
            }
        }
    } catch (error) {

        console.error("Error in apiService:", error);
        return {
            status: false,
            scode: "02",
            sdesc: "Internal server issue",
            [apiServiceName]: "No data found",
            data_count: 0,
        }
    }
};

export const successResponse = (
    res: Response,
    message = "Successfully Submitted.",
    data?: unknown,
    status = 200
): Response => {
    return res.status(status).json({
        status: true,
        scode: "01",
        sdesc: message,
        ...(data !== undefined && { data }),
    });
};


export const failureResponse = (
    res: Response,
    errorMessage?: string,
    status = 500
): Response => {

    if (!errorMessage || errorMessage.trim() === "" || errorMessage === "02") {

        return res.status(status).json({
            status: false,
            scode: "02",
            sdesc: "Failed Due To: Internal Server Issue",
        });
    }

    return res.status(status).json({
        status: false,
        scode: "03",
        sdesc: `Failed Due To: ${errorMessage}`,
    });
};


export const unAuthorisedResponse = (
    res: Response,
    message = "Unauthorized request"
): Response => {

    const finalData: Record<string, unknown> = {};

    finalData.status = false;
    finalData.scode = "401";
    finalData.sdesc = message;

    return res.status(401).json(finalData);
};