import {
  SET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from '../actions/types'

const initialState = {
  profile: null,
  profiles: null,
  loading: false
}

export const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      }
    default:
      return state
  }
}

export default profilesReducer
