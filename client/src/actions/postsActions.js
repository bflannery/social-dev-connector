import axios from 'axios'
import asyncWrapper from '../utils/asyncWrapper'
import {
  ADD_POST,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_LOADING,
  SET_POST,
  SET_POSTS,
  DELETE_POST
} from './types'

export const addPostAction = (post = {}) => ({
  type: ADD_POST,
  payload: post
})

export const deletePostAction = id => ({
  type: DELETE_POST,
  payload: id
})

export const setErrorsAction = error => ({
  type: SET_ERRORS,
  payload: error
})

export const setPostsAction = (posts = []) => ({
  type: SET_POSTS,
  payload: posts
})

export const setPostAction = (post = {}) => ({
  type: SET_POST,
  payload: post
})

export const setPostLoadingAction = () => ({
  type: POST_LOADING
})

export const clearErrorsAction = () => ({
  type: CLEAR_ERRORS
})

// Add New Post
export const addPost = postData => async dispatch => {
  dispatch(clearErrorsAction())
  const { error, response } = await asyncWrapper(
    axios.post('/api/posts', postData)
  )
  if (error) return dispatch(setErrorsAction(error.response.data))
  return dispatch(addPostAction(response.data))
}

// Get Posts
export const getPosts = () => async dispatch => {
  dispatch(setPostLoadingAction())
  const { error, response } = await asyncWrapper(axios.get('/api/posts'))
  if (!error) return dispatch(setPostsAction(response.data))
  return dispatch(setErrorsAction(error.response.data))
}

// Get Post
export const getPost = id => async dispatch => {
  dispatch(setPostLoadingAction())
  const { error, response } = await asyncWrapper(axios.get(`/api/posts/${id}`))
  if (!error) return dispatch(setPostAction(response.data))
  return dispatch(setErrorsAction(error.response.data))
}

// Delete Post
export const deletePost = id => async dispatch => {
  const { error } = await asyncWrapper(axios.delete(`/api/posts/${id}`))
  if (!error) return dispatch(deletePostAction(id))
  return dispatch(getPosts(error.response.data))
}

// Add Like
export const addLike = id => async dispatch => {
  const { error } = await asyncWrapper(axios.post(`/api/posts/like/${id}`))
  if (!error) return dispatch(getPosts())
  return dispatch(setErrorsAction(error.response.data))
}

// Remove Like
export const removeLike = id => async dispatch => {
  const { error } = await asyncWrapper(axios.post(`/api/posts/unlike/${id}`))
  if (!error) return dispatch(getPosts())
  return dispatch(setErrorsAction(error.response.data))
}

// Add New Comment
export const addComment = (postId, commentData) => async dispatch => {
  dispatch(clearErrorsAction())
  const { error, response } = await asyncWrapper(
    axios.post(`/api/posts/comments/${postId}`, commentData)
  )
  if (!error) return dispatch(setPostAction(response.data))
  return dispatch(setErrorsAction(error.response.data))
}

// Add New Comment
export const deleteComment = (postId, commentId) => async dispatch => {
  const { error, response } = await asyncWrapper(
    axios.delete(`/api/posts/comments/${postId}/${commentId}`)
  )
  if (!error) return dispatch(setPostAction(response.data))
  return dispatch(setErrorsAction(error.response.data))
}
