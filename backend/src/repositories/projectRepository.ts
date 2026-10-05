import { prisma } from "../lib/prisma.js"


export const getProjectsByOwner = async (ownerId: number) => {
    return await prisma.projects.findMany({
        where: {
            owner_id: ownerId
        },
    })
}