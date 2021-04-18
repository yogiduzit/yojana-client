import { ACCESS_TOKEN, API_URL } from "../constants/environmentVariables"

export const fetchAllProjects = async () => {
    const res = await fetch(`${API_URL}/projects`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.json();
};

export const fetchProject = async (id) => {
    const res = await fetch(`${API_URL}/projects/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.json();
};

export const createProject = async (body) => {
    const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            'Content-Type': "application/json",
        },
        body: JSON.stringify(body)
    });
    return res.json();
};

export const updateProject = async (id, body) => {
    const res = await fetch(`${API_URL}/projects/${id}`, {
        body: JSON.stringify(body),
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            'Content-Type': "application/json",
        }
    });
    return res.json();
}