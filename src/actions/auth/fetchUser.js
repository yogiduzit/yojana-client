import axios from 'axios'
import { ACCESS_TOKEN, API_URL } from '../../constants/environementVariables'
import { FETCH_CURRENT_USER } from '../actionsTypes'

export const fetchUser = () => async dispatch => {
  if (localStorage.accessToken) {
    const res = await axios.get(`${API_URL}/employees/get/currentUser`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
      }
    })
    try {
      const modifiedEmployee = res.data.data.employee
      delete modifiedEmployee.credential
      dispatch({
        type: FETCH_CURRENT_USER,
        payload: modifiedEmployee
      })
    } catch {
      console.error('Failed to fetch and load user.')
    }
  }
}
