import { findUserByEmail } from "../repositories/userRepository.js"
import bcrypt from "bcrypt";
export const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const ispasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!ispasswordValid) {
        throw new Error("Invalid email or password")
    }

    return user;
}