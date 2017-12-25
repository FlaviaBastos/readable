export const ADD_CONTENT = 'ADD_CONTENT'
export const DELETE_CONTENT = 'DELETE_CONTENT'
export const EDIT_CONTENT = 'EDIT_CONTENT'

export function addContent ({ uid, id, title, body }) {
  return {
    type: ADD_CONTENT,
    uid,
    id,
    title,
    body
  }
}

export function deleteContent ({ content }) {
  return {
    type: DELETE_CONTENT,
    content,
  }
}

export function editContent ({ content }) {
  return {
    type: EDIT_CONTENT,
    content,
  }
}
