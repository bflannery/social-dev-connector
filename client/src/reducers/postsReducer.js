import { ADD_POST, POST_LOADING, SET_POSTS } from '../actions/types'

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
        posts: [...state.posts, payload]
      }
    case SET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    default:
      return state
  }
}

export default postsReducer
