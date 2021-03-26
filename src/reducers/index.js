import { combineReducers } from 'redux'
import auth from './auth'
import sidebar from './sidebar'

export default combineReducers({
  auth,
  sidebar
})
