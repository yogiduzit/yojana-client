import axios from 'axios'
import { ACCESS_TOKEN, API_URL } from "../constants/environementVariables"

export const fetchAllEmployees = async () => {
    const res = await fetch(`${API_URL}/employees`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
      }
    });
    return res.json();    
};

export const createEmployee = async (body) => {
  console.log(body);
  const res = await fetch(`${API_URL}/employees`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      'Content-Type': "application/json",
    },
    body: JSON.stringify(body)
  });
  return res.json();    
};

export const fetchEmployeeById = async (id) => {
  return axios.get(`${API_URL}/employees/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    }
  })
}

