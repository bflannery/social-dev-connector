import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorsReducer from './errorsReducer'
import profilesReducer from './profilesReducer'
import postsReducer from './postsReducer'

export default combineReducers({
  auth: authReducer,
  profiles: profilesReducer,
  posts: postsReducer,
  errors: errorsReducer
})
