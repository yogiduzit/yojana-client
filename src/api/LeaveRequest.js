import axios from 'axios'
import { ACCESS_TOKEN, API_URL } from '../constants/environmentVariables'

export const fetchAllLeaveRequests = () => {
  return axios.get(`${API_URL}/leaverequests`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    }
  })
}

export const createLeaveRequest = body => {
  const { empId, startDate, endDate, type, description } = body
  return axios.post(
    `${API_URL}/leaverequests`,
    {
      empId: empId,
      startDate: startDate,
      endDate: endDate,
      type: type,
      description: description
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        'Content-Type': 'application/json'
      }
    }
  )
}
