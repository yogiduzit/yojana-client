import { FETCH_CURRENT_USER } from '../actions/actionsTypes'

const initialState = {
  user: null
}

export default function useReducer (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_CURRENT_USER:
      return {
        ...state,
        user: payload
      }
    default:
      return state
  }
}
