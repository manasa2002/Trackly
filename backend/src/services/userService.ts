import { getAllUsers } from "../repositories/userRepository.js"

export const getUsers = async () => {
    return await getAllUsers();
}