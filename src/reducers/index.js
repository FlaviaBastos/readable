import { combineReducers } from 'redux'
import {
  CATEGORIES,
  LOAD_POSTS,
  LOAD_SORTED,
  LOAD_POST,
  ADD_POST,
  LOAD_COMMENTS,
  ADD_COMMENT,
  RELOAD_COMMENTS,
  RELOAD_POST,
  VOTED_POST,
  VOTED_SINGLE_POST,
  VOTED_COMMENT,
  DELETED_POST,
  DELETED_SINGLE_POST,
  DELETED_COMMENT
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
    case LOAD_SORTED:
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
    case RELOAD_POST:
      return state
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
        posts: action.post
      }
    case DELETED_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.post.id)
      }
    case DELETED_SINGLE_POST:
      console.log('ACT: ', action)
      return {
        ...state,
        posts: {}
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
    case VOTED_COMMENT:
      return {
        ...state,
        commentsByPost: state.commentsByPost.map(comment => {
          if (comment.id === action.comment.id) {
            return action.comment
          } else {
            return comment
          }
        })
      }
    case DELETED_COMMENT:
      return {
        ...state,
        commentsByPost: state.commentsByPost.filter(comment => comment.id !== action.comment.id)
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
