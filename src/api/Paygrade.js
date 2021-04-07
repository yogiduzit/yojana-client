import { ACCESS_TOKEN, API_URL } from "../constants/environementVariables";

export const fetchAllPaygrades = async (id, wpId) => {
  const res = await fetch(`${API_URL}/paygrades`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    }
  });
  return res.json();    
};