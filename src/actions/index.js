import * as API from '../utils/api'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const REQUEST_CONTENT = 'REQUEST_CONTENT'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_CONTENT = 'RECEIVE_CONTENT'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

export function selectCategory (category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export function requestContent (category) {
  return {
    type: REQUEST_CONTENT,
    category
  }
}

export function requestComments () {
  return {
    type: REQUEST_COMMENTS
  }
}

export function receiveContent (category, data) {
  return {
    type: RECEIVE_CONTENT,
    category,
    posts: data
  }
}

export function receiveComments (data) {
  return {
    type: RECEIVE_COMMENTS,
    comments: data
  }
}

export function fetchContent (category) {
  return function (dispatch) {
    dispatch(requestContent(category))
    API.getAll().then((data) => {
      dispatch(receiveContent(category, data))
    })
  }
}

export function goFetchContent (category) {
  return (dispatch, getState) => {
    return dispatch(fetchContent(category))
  }
}

export function changeVote (content) {
  return function (dispatch) {
    API.manageVotes(content).then((data) => {
      console.log('API MANAGE: ', data)
      dispatch(receiveContent(data.category, data))
      // need to reload page here
    })
  }
}

export function writePost (content) {
  return function (dispatch) {
    API.addPost(content).then((data) => {
      dispatch(receiveContent(data.category, data))
    })
  }
}

export function removePost (id) {
  return function (dispatch) {
    API.deletePost(id).then((data) => {
      console.log('API DELETE: ', data)
      // need to reload page here
      // it seems that no dispatch required (?!?!) but why?
    })
  }
}

export function fetchComments (id) {
  return function (dispatch) {
    dispatch(requestComments())
    API.getComments(id).then((data) => {
      dispatch(receiveComments(data))
    })
  }
}
