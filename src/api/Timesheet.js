import { ACCESS_TOKEN, API_URL } from "../constants/environementVariables"

export const fetchAllTimesheets = async () => {
    const res = await fetch(`${API_URL}/timesheets`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
      }
    });
    return res.json();    
};

export const createTimesheet = async (body) => {
    const res = await fetch(`${API_URL}/timesheets`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            'Content-Type': "application/json",
        },
        body: JSON.stringify(body)
    });
    return res.json();
};