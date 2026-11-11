import api from "./axios";

export interface CreateProjectPayload {
    name: string;
    description?: string;
}

export const getProjects = async () => {
    const response = await api.get("/projects");
    return response.data;
}

export const createProject = async (payload: CreateProjectPayload) => {
    const response = await api.post("/projects/createproject", payload);
    return response.data;
}