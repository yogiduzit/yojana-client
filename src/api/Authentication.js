import { API_URL } from "../constants/environementVariables"

export const login = async (username, password) => {
    const res = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({username, password})
    });
    return res.json();    
}