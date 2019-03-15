import {
  ADD_POST,
  POST_LOADING,
  SET_POSTS,
  SET_POST,
  DELETE_POST
} from '../actions/types'

const initialState = {
  posts: [],
  post: {},
  loading: false
}

const postsReducer = (state = initialState, action = {}) => {
  const { payload, type } = action
  switch (type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      }
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts]
      }
    case SET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case SET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }
    default:
      return state
  }
}

export default postsReducer
