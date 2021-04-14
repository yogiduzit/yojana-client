import { ACCESS_TOKEN, API_URL } from "../constants/environementVariables";

export const fetchAllEstimates = async (projectId, wpId) => {
    const res = await fetch(`${API_URL}/projects/${projectId}/workPackages/${wpId}/estimates`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.json();
};

export const fetchAllEstimatesOfType = async (projectId, wpId, type) => {
    const res = await fetch(`${API_URL}/projects/${projectId}/workPackages/${wpId}/estimates?type=${type}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.json();
};

export const createEstimate = async (body) => {
    const res = await fetch(`${API_URL}/estimates`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            'Content-Type': "application/json",
        },
        body: JSON.stringify(body)
    });
    return res.json();
};

export const createEstimateRow = async (estimateId, body) => {
    const res = await fetch(`${API_URL}/estimates/${estimateId}/rows`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            'Content-Type': "application/json",
        },
        body: JSON.stringify(body)
    });
    return res.json();
};