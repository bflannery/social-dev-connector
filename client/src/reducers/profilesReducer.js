import {
  SET_PROFILES,
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
    case SET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default profilesReducer
