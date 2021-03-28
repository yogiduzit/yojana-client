import { USER_LOGIN, USER_LOGOUT, USER_LOADED } from '../actions/actionsTypes'

const initialState = {
  user: null
  // ...
}

export default function useReducer (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_LOGIN:
      return {
        ...state
        //
      }
    case USER_LOGOUT:
      return {
        ...state
        //
      }
    case USER_LOADED:
      return {
        ...state
        //
      }
    default:
      return state
  }
}
