import { ACCESS_TOKEN, API_URL } from "../constants/environmentVariables"

export const fetchAvailableReports = async () => {
    const res = await fetch(`${API_URL}/reports`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.json();
};

export const fetchMonthlyReport = async (projectId) => {
    const res = await fetch(`${API_URL}/reports/earnedValue/${projectId}/2000-11-23`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.json();
};

export const fetchWeeklyReport = async (projectId) => {
    const res = await fetch(`${API_URL}/reports/weeklyReport/${projectId}/2000-11-23`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.json();
}