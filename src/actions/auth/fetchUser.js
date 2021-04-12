import { FETCH_CURRENT_USER } from '../actionsTypes'

export const fetchUser = user => dispatch => {
  let modifiedUser = null
  if (user) {
    modifiedUser = user
    delete modifiedUser.credential
    // // TODO: delete the below
    // modifiedUser.timesheetApprover = true
  }
  dispatch({
    type: FETCH_CURRENT_USER,
    payload: modifiedUser
  })
}
