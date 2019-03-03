import axios from 'axios'
import asyncWrapper from '../utils/asyncWrapper'

import {
  CLEAR_CURRENT_PROFILE,
  SET_PROFILE,
  PROFILE_LOADING,
  SET_ERRORS
} from './types'

export const setProfileLoading = () => ({
  type: PROFILE_LOADING
})

export const setCurrentProfile = (profile = {}) => ({
  type: SET_PROFILE,
  payload: profile
})

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
})

export const setErrorsAction = error => ({
  type: SET_ERRORS,
  payload: error
})

// Get current profile
export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading())
  const { error, data } = await asyncWrapper(axios.get('/api/profile'))
  if (!error) return dispatch(setCurrentProfile(data))
  return dispatch(setCurrentProfile())
}

// Create Profile
export const createProfile = (profileData, history) => async dispatch => {
  const { error } = await asyncWrapper(axios.post('/api/profile', profileData))
  if (error) {
    return dispatch(setErrorsAction(error.response.data))
  }
  return history.push('/dashboard')
}
