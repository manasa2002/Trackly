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

export const findUserByEmail = async (email: string) => {
    return await prisma.users.findUnique({
        where: {
            email,
        }
    })
}