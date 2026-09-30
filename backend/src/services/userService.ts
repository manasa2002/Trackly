import { getAllUsers, createUser as createUserRepository } from "../repositories/userRepository.js"

export const getUsers = async () => {
    return await getAllUsers();
}

export const createUser = async (name: string, email: string, password: string) => {
    return await createUserRepository(name, email, password);
};