import * as API from '../utils/api'

export const REQUEST_CONTENT = ' REQUEST_CONTENT'
export const RECEIVE_CONTENT = 'RECEIVE_CONTENT'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const ADD_CONTENT = 'ADD_CONTENT'
export const DELETE_CONTENT = 'DELETE_CONTENT'
export const EDIT_CONTENT = 'EDIT_CONTENT'

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export function requestContent(category) {
  return {
    type: REQUEST_CONTENT,
    category
  }
}

export function receiveContent(category, data) {
  return {
    type: RECEIVE_CONTENT,
    category,
    posts: data
  }
}

export function fetchContent(category) {
  return function (dispatch) {
    dispatch(requestContent(category))
    console.log('GOT HERE')
    API.getAll().then((data) => {
      console.log('DATA IS: ', data)
      dispatch(receiveContent(category, data))
    })
  }
}

export function goFetchContent(category) {
  return (dispatch, getState) => {
    return dispatch(fetchContent(category))
  }
}
