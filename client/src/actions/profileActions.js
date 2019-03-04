import axios from 'axios'
import asyncWrapper from '../utils/asyncWrapper'

import {
  CLEAR_CURRENT_PROFILE,
  SET_PROFILE,
  PROFILE_LOADING,
  SET_ERRORS,
  SET_CURRENT_USER
} from './types'

export const setCurrentUser = (user = {}) => ({
  type: SET_CURRENT_USER,
  payload: user
})

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
  const { error, response } = await asyncWrapper(axios.get('/api/profile'))
  if (!error) return dispatch(setCurrentProfile(response.data))
  return dispatch(setCurrentProfile())
}

// Create Profile
export const createProfile = (profileData, history) => async dispatch => {
  const { error } = await asyncWrapper(axios.post('/api/profile', profileData))
  if (!error) return history.push('/dashboard')
  return dispatch(setErrorsAction(error.response.data))
}

// Delete Account & Profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    const { error } = await asyncWrapper(axios.delete('/api/profile'))
    if (!error) return dispatch(setCurrentUser())
    return dispatch(setErrorsAction(error.response.data))
  }
}

// Add Experience
export const addExperience = (expData, history) => async dispatch => {
  const { error } = await asyncWrapper(
    axios.post('/api/profile/experience', expData)
  )
  if (!error) return history.push('/dashboard')
  return dispatch(setErrorsAction(error.response.data))
}

// Delete Experience
export const deleteExperience = id => async dispatch => {
  const { error, response } = await asyncWrapper(
    axios.delete(`/api/profile/experience/${id}`)
  )
  if (!error) return dispatch(setCurrentProfile(response.data))
  return dispatch(setErrorsAction(error.response.data))
}

// Add Education
export const addEducation = (eduData, history) => async dispatch => {
  const { error } = await asyncWrapper(
    axios.post('/api/profile/education', eduData)
  )
  if (!error) return history.push('/dashboard')
  return dispatch(setErrorsAction(error.response.data))
}

// Delete Education
export const deleteEducation = id => async dispatch => {
  const { error, response } = await asyncWrapper(
    axios.delete(`/api/profile/education/${id}`)
  )
  if (!error) return dispatch(setCurrentProfile(response.data))
  return dispatch(setErrorsAction(error.response.data))
}
