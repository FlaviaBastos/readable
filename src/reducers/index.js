import { combineReducers } from 'redux'
import {
  CATEGORIES,
  LOAD_POSTS,
  ADD_POST
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
      return {...state, posts: action.posts}
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(action.post)
      }
    default:
      return state
  }
}


// function commentsByPost (
//   state = {
//     isFetching: false,
//     comments: []
//   },
//   action
// ) {
//   switch (action.type) {
//     case REQUEST_COMMENTS:
//       return Object.assign({}, {
//         isFetching: true
//       })
//     case RECEIVE_COMMENTS:
//       return Object.assign({}, {
//         isFetching: false,
//         comments: action.comments
//       })
//     default:
//       return state
//   }
// }

const rootReducer = combineReducers({
  categories,
  posts
})

export default rootReducer
