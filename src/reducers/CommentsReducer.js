import {
  LOAD_COMMENTS,
  VOTED_COMMENT,
  DELETED_COMMENT,
  RELOAD_COMMENTS,
  ADD_COMMENT
} from '../actions/types'

export default function commentsByPost (state = {}, action) {
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
