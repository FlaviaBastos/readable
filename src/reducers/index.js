import { combineReducers } from 'redux'
import categories from './CategoriesReducer'
import posts from './PostsReducer'
import commentsByPost from './CommentsReducer'

const rootReducer = combineReducers({
  categories,
  posts,
  commentsByPost
})

export default rootReducer
