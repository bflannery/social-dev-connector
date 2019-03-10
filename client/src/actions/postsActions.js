import axios from 'axios'
import asyncWrapper from '../utils/asyncWrapper'
import { ADD_POST, SET_ERRORS, POST_LOADING, SET_POSTS } from './types'

export const addPostAction = (post = {}) => ({
  type: ADD_POST,
  payload: post
})

export const setPostsAction = (posts = []) => ({
  type: SET_POSTS,
  payload: posts
})

export const setErrorsAction = error => ({
  type: SET_ERRORS,
  payload: error
})

export const setPostLoading = () => ({
  type: POST_LOADING
})

// Add New Post
export const addPost = postData => async dispatch => {
  const { error, response } = await asyncWrapper(
    axios.post('/api/posts', postData)
  )
  if (!error) return dispatch(addPostAction(response.data))
  return dispatch(setErrorsAction(error.response.data))
}

// Get Posts
export const getPosts = () => async dispatch => {
  dispatch(setPostLoading())
  const { error, response } = await asyncWrapper(axios.get('/api/posts'))
  if (!error) return dispatch(setPostsAction(response.data))
  return dispatch(setErrorsAction(error.response.data))
}
