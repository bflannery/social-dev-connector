import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorsReducer from './errorsReducer'
import profilesReducer from './profileReducer'

export default combineReducers({
  auth: authReducer,
  profiles: profilesReducer,
  errors: errorsReducer
})
