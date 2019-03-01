import axios from 'axios'
import jwt_decode from 'jwt-decode'

import setAuthToken from '../utils/setAuthToken'
import { SET_ERRORS, SET_CURRENT_USER } from './types'

// Set Errors
export const setErrorsAction = error => ({
  type: SET_ERRORS,
  payload: error.response.data
})

// Set Logged In User
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
})

export const registerUser = (userData, history) => async dispatch => {
  try {
    await axios.post('/api/users/register', userData)
    history.push('/login')
  } catch (error) {
    return dispatch(setErrorsAction(error))
  }
}

export const loginUser = userData => async dispatch => {
  try {
    const loginResponse = await axios.post('/api/users/login', userData)
    const { token } = loginResponse.data
    // Set token to localstorage
    localStorage.setItem('jwtToken', token)
    // Set token to Auth header
    setAuthToken(token)
    // Decode token to get user data
    const decoded = jwt_decode(token)
    // Set current user
    dispatch(setCurrentUser(decoded))
  } catch (error) {
    return dispatch(setErrorsAction(error))
  }
}

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken')
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to {}
  // Doing this will also set isAuthenticated to false
  dispatch(setCurrentUser({}))
}
