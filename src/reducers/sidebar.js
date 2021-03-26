import { EXPAND_SIDEBAR, COLLAPSE_SIDEBAR } from '../actions/actionsTypes'

const initialState = {
  collapsed: false
}

export default function useReducer (state = initialState, action) {
  const { type } = action

  switch (type) {
    case EXPAND_SIDEBAR:
      return {
        ...state,
        collapsed: false
      }
    case COLLAPSE_SIDEBAR:
      return {
        ...state,
        collapsed: true
      }
    default:
      return state
  }
}
