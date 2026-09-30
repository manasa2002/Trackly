import { getAllUsers, createUser as createUserRepository } from "../repositories/userRepository.js"
import bcrypt from "bcrypt";

export const getUsers = async () => {
    return await getAllUsers();
}

export const createUser = async (name: string, email: string, password: string) => {

    const hashedpassword = await bcrypt.hash(password, 12)
    return await createUserRepository(name, email, hashedpassword);
};