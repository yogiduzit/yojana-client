import {  ACCESS_TOKEN, API_URL } from "../constants/environementVariables"

export const isLoggedIn = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return token && token.length > 0;
};

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

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
}