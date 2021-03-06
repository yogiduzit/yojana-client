import { ACCESS_TOKEN, API_URL } from "../constants/environmentVariables";

export const fetchAllPaygrades = async () => {
  const res = await fetch(`${API_URL}/paygrades`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    }
  });
  return res.json();    
};