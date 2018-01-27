import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY,
  REQUEST_CONTENT,
  RECEIVE_CONTENT
} from '../actions'

function selectedCategory (state = 'redux', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

function posts (
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

function contentByCategory (state = {}, action) {
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

const rootReducer = combineReducers({
  contentByCategory,
  selectedCategory
})

export default rootReducer
