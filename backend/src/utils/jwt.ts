import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
export type TokenPayload = {
    userId: number;
    email: string;
    role: string;
};

export const generateToken = (payload: TokenPayload) => {
    return jwt.sign(
        { payload }, JWT_SECRET, { expiresIn: "1d" }
    )
}