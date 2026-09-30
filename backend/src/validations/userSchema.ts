import z from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2, "Name must be atleast 2 characters")
        .max(100, "Name must not exceed 100 characters"),
    email: z.string().email("please provide a valid email"),
    password: z.string().min(6, "password must be atleast 6 characters"),
})