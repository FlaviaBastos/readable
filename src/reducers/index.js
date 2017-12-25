import {
  ADD_CONTENT,
  DELETE_CONTENT,
  EDIT_CONTENT,
} from '../actions'

const uid = Date.now().toString();

const initialContentState = {
  [uid]: {
    id: uid,
    timestamp: Date.now(),
    title: '',
    body: null,
    author: null,
    category: null,
    voteScore: 1,
    deleted: false,
    commentCount: 0
  }
}

function manageContent (state = initialContentState, action) {
  const { uid, id, title, body } = action

  switch (action.type) {
    case ADD_CONTENT:
      return {
        ...state,
        [uid]: {
          ...state[uid],
          id: id,
          title: title,
          body: body
        }
      }
    case DELETE_CONTENT:
      return {}
    case EDIT_CONTENT:
      return {}
    default:
      return state
  }
}

export default manageContent
