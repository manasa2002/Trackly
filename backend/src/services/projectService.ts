import { getProjectsByOwner } from "../repositories/projectRepository.js"

export const getMyProjects = async (userId: number) => {
    return await getProjectsByOwner(userId)
}