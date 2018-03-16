import {
  LOAD_POSTS,
  LOAD_SORTED,
  ADD_POST,
  RELOAD_POST,
  RELOAD_POSTS,
  VOTED_POST,
  VOTED_SINGLE_POST,
  DELETED_POST,
  DELETED_SINGLE_POST
} from '../actions/types'

export default function posts (state = {}, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    case LOAD_SORTED:
      return {
        ...state,
        posts: action.posts
      }
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(action.post)
      }
    case RELOAD_POST:
      return state
    case RELOAD_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    case VOTED_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.post.id) {
            return action.post
          } else {
            return post
          }
        })
      }
    case VOTED_SINGLE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.post.id) {
            return action.post
          } else {
            return post
          }
        })
      }
    case DELETED_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.post.id)
      }
    case DELETED_SINGLE_POST:
      return {
        ...state,
        posts: {}
      }
    default:
      return state
  }
}
