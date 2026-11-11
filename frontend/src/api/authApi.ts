import api from "./axios";


export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export const loginUser = async (payload: LoginPayload) => {
    const response = await api.post("/auth/login", payload);
    return response.data;
}

export const registerUser = async (payload: RegisterPayload) =>