import { prisma } from "../lib/prisma.js";

export const getAllUsers = async () => {
    return await prisma.users.findMany();
};

export const createUser = async (name: string, email: string, password: string) => {
    return await prisma.users.create({
        data: {
            name, email, password,
        },
    });
};