import { prisma } from "../lib/prisma.js";
import { getProjectsByOwner } from "../repositories/projectRepository.js"

export const getMyProjects = async (userId: number) => {

    console.log("Fetching projects for userID:", userId);

    const projects = await prisma.project_members.findMany({
        where: {
            user_id: userId,
        },
        include: {
            projects: true,
        },
    });

    console.log("Projects from database:", projects)
    return projects;
    // return await getProjectsByOwner(userId)
}