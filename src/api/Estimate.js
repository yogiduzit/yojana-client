import { ACCESS_TOKEN, API_URL } from "../constants/environementVariables";

export const fetchAllEstimates = async (id, wpId) => {
  const res = await fetch(`${API_URL}/estimates`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    }
  });
  return res.json();    
};