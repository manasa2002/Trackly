import { Response } from "express";

export const apiService = (
    apiServiceName: string,
    repoMethod: Record<string, unknown>[]
): Record<string, unknown> => {

    const finalData: Record<string, unknown> = {};

    try {

        if (repoMethod.length > 0) {

            finalData.status = true;
            finalData.scode = "01";
            finalData.sdesc = "Data found";
            finalData[apiServiceName] = repoMethod;
            finalData.data_count = repoMethod.length;

        } else {

            finalData.status = false;
            finalData.scode = "03";
            finalData.sdesc = "No data found";
            finalData[apiServiceName] = "No data found";
            finalData.data_count = 0;
        }

    } catch (error) {

        console.error("Error in apiService:", error);

        finalData.status = false;
        finalData.scode = "02";
        finalData.sdesc = "Internal server issue";
        finalData[apiServiceName] = "No data found";
        finalData.data_count = 0;
    }

    return finalData;
};


export const successResponse = (
    res: Response
): Response => {

    const finalData: Record<string, unknown> = {};

    finalData.status = true;
    finalData.scode = "01";
    finalData.sdesc = "Successfully Submitted.";

    return res.status(200).json(finalData);
};


export const failureResponse = (
    res: Response,
    errorMessage: string
): Response => {

    const finalData: Record<string, unknown> = {};

    finalData.status = false;

    if (
        errorMessage === "02" ||
        errorMessage.trim() === ""
    ) {

        finalData.scode = "02";
        finalData.sdesc =
            "Failed Due To: Internal Server Issue";

    } else {

        finalData.scode = "03";
        finalData.sdesc =
            `Failed Due To: ${errorMessage}`;
    }

    return res.status(200).json(finalData);
};


export const unAuthorisedResponse = (
    res: Response
): Response => {

    const finalData: Record<string, unknown> = {};

    finalData.status = false;
    finalData.scode = "401";
    finalData.sdesc = "Unauthorized request";

    return res.status(401).json(finalData);
};