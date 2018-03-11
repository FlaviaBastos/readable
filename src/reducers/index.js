import { combineReducers } from 'redux'
import {
  CATEGORIES,
  LOAD_POSTS,
  LOAD_POST,
  ADD_POST,
  LOAD_COMMENTS,
  ADD_COMMENT,
  RELOAD_COMMENTS
} from '../actions'

function categories (state = {}, action) {
  switch (action.type) {
    case CATEGORIES:
      return {...state, categories: action.categories}
    default:
      return state
  }
}

function posts (state = {}, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    case LOAD_POST:
      return {
        ...state,
        posts: action.post
      }
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(action.post)
      }
    default:
      return state
  }
}


function commentsByPost (state = {}, action) {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        commentsByPost: action.comments
      }
    case RELOAD_COMMENTS:
      return state
    case ADD_COMMENT:
      return state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  categories,
  posts,
  commentsByPost
})

export default rootReducer
