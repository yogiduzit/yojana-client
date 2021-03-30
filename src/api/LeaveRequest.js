import axios from 'axios'
import { ACCESS_TOKEN, API_URL } from "../constants/environementVariables"

export const fetchAllLeaveRequests = () => {
  return axios.get(`${API_URL}/leaverequest`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    }
  })
}