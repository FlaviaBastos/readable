import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY,
  REQUEST_CONTENT,
  RECEIVE_CONTENT,
  ADD_VOTE,
  REMOVE_VOTE,
  ADD_CONTENT,
  DELETE_CONTENT,
  EDIT_CONTENT,
} from '../actions'

function selectedCategory(state = 'redux', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

function posts(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_CONTENT:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_CONTENT:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts
      })
    default:
      return state
  }
}

function contentByCategory(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CONTENT:
    case REQUEST_CONTENT:
      return Object.assign({}, state, {
        [action.category]: posts(state[action.category], action)
      })
    default:
      return state
  }
}

// function manageContent(state = {}, action) {
//   switch (action.type) {
//     case ADD_CONTENT:
//       return Object.assign({}, state, {
//         [action.category]: posts(state[action.category], action)
//       })
//     case DELETE_CONTENT:
//       return
//     default:
//       return state
//   }
// }

function manageVotes (state = {}, action) {
  switch (action.type) {
    case ADD_VOTE:
      return state
    case REMOVE_VOTE:
      return
    default:
      return state
  }
}

const rootReducer = combineReducers({
  contentByCategory,
  selectedCategory,
  // manageContent,
  manageVotes
})

export default rootReducer
