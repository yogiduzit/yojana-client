import { API_URL } from "../constants/environementVariables"

export const login = async (username, password) => {
    const res = await fetch(`${API_URL}/authentication`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({username, password})
    });
    return res.text();    
}