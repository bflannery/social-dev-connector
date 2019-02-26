import axios from 'axios'
import { SET_ERRORS } from './types'

export const setErrorsAction = error => ({
  type: SET_ERRORS,
  payload: error.response.data
})

export const registerUser = (userData, history) => async dispatch => {
  try {
    await axios.post('/api/users/register', userData)
    history.push('/login')
  } catch (error) {
    return dispatch(setErrorsAction(error))
  }
}
