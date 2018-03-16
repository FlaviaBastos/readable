import { CATEGORIES } from '../actions/types'

export default function categories (state = {}, action) {
  switch (action.type) {
    case CATEGORIES:
      return {...state, categories: action.categories}
    default:
      return state
  }
}
