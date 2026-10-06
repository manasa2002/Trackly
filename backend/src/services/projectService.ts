import { prisma } from "../lib/prisma.js";
import { getProjectsByOwner } from "../repositories/projectRepository.js"


export const createProject = async (userId: number, name: string, description?: string) => {
    const existingproject = await prisma.projects.findFirst({
        where: {
            owner_id: userId,
            name,
        }
    })

    if (existingproject) {
        throw new Error("Project already exists");
    }

    const result = await prisma.$transaction(async (tx) => {
        const project = await tx.projects.create({
            data: {
                name, description, owner_id: userId,
            }
        })

        const projectMember = await tx.project_members.create({
            data: {
                project_id: project.id,
                user_id: userId,
                role: "owner",
            }
        })

        return { project, projectMember }
    })

    return result;

}

export const getMyProjects = async (userId: number) => {

    const projects = await prisma.project_members.findMany({
        where: {
            user_id: userId,
        },
        include: {
            projects: true,
        },
    });

    return projects;
    // return await getProjectsByOwner(userId)
}