import { ACCESS_TOKEN, API_URL } from "../constants/environementVariables"

export const fetchAllWorkPackages = async (id) => {
    const res = await fetch(`${API_URL}/projects/${id}/workPackages`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.json();
};

export const fetchWorkPackagesByHierarchy = async (id, hierarchyLevel) => {
    const res = await fetch(`${API_URL}/projects/${id}/workPackages?hierarchyLevel=${hierarchyLevel}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.json();
};

export const fetchChildWorkPackages = async (id, wpId) => {
    const res = await fetch(`${API_URL}/projects/${id}/workPackages/${wpId}/children`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.json();
};

export const fetchRespEngWorkPackages = async () => {
    const res = await fetch(`${API_URL}/projects/get/respEng`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.json();
};

export const fetchWorkPackage = async (id, wpId) => {
    const res = await fetch(`${API_URL}/projects/${id}/workPackages/${wpId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.json();
};

export const createWorkPackage = async (id, body) => {
    const res = await fetch(`${API_URL}/projects/${id}/workPackages`, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            'Content-Type': "application/json",
        }
    });
    return res.json();
};

export const updateWorkPackage = async (id, wpId, body) => {
    const res = await fetch(`${API_URL}/projects/${id}/workPackages/${wpId}`, {
        body: JSON.stringify(body),
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            'Content-Type': "application/json",
        }
    });
    return res.json();
};

export const fetchCharges = async (id, wpId) => {
    const res = await fetch(`${API_URL}/projects/${id}/workPackages/${wpId}/charge`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.json();
};

export const fetchWeeklyCharges = async (id, wpId) => {
    const res = await fetch(`${API_URL}/projects/${id}/workPackages/${wpId}/weeklyCharges`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.json();
};
