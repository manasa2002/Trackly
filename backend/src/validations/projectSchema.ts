import z from "zod";

export const createProjectSchema = z.object({
    name: z.string()
        .min(3, "Project name must be atleast 3 characters")
        .max(150, "project name can't exceed 150 characters").trim(),
    description: z.string()
        .max(500, "Description can't exceed 500 characters").trim().optional()
})