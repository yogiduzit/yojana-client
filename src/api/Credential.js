import { ACCESS_TOKEN, API_URL } from "../constants/environmentVariables"

export const createCredential = async (body) => {
  const res = await fetch(`${API_URL}/credentials`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      'Content-Type': "application/json",
    },
    body: JSON.stringify(body)
  });
  return res.json();    
};