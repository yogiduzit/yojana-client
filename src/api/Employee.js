import { ACCESS_TOKEN, API_URL } from "../constants/environementVariables"

export const fetchAllEmployees = async () => {
    const res = await fetch(`${API_URL}/employees`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
      }
    });
    return res.json();    
};
