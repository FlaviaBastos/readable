import * as API from '../utils/api'

export const CATEGORIES = 'CATEGORIES'
export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_SORTED = 'LOAD_SORTED'
export const ADD_POST = 'ADD_POST'
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const RELOAD_COMMENTS = 'RELOAD_COMMENTS'
export const RELOAD_POSTS = 'RELOAD_POSTS'
export const RELOAD_POST = 'RELOAD_POST'
export const VOTED_POST = 'VOTED_POST'
export const VOTED_SINGLE_POST = 'VOTED_SINGLE_POST'
export const VOTED_COMMENT = 'VOTED_COMMENT'
export const DELETED_POST = 'DELETED_POST'
export const DELETED_SINGLE_POST = 'DELETED_SINGLE_POST'
export const DELETED_COMMENT = 'DELETED_COMMENT'

export function loadCategories (categories) {
  return {
    type: CATEGORIES,
    categories
  }
}

export function loadPosts (posts) {
  return {
    type: LOAD_POSTS,
    posts
  }
}

export function loadSorted (posts) {
  return {
    type: LOAD_SORTED,
    posts
  }
}

export function addPost (post) {
  return {
    type: ADD_POST,
    post
  }
}

export function loadComments (comments) {
  return {
    type: LOAD_COMMENTS,
    comments
  }
}

export function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function reloadComments (comments) {
  return {
    type: RELOAD_COMMENTS,
    comments
  }
}

export function reloadPost (post) {
  return {
    type: RELOAD_POST,
    post
  }
}

export function reloadPosts (posts) {
  return {
    type: RELOAD_POSTS,
    posts
  }
}

export function votedPost (post) {
  return {
    type: VOTED_POST,
    post
  }
}

export function votedSinglePost (post) {
  return {
    type: VOTED_SINGLE_POST,
    post
  }
}

export function votedComment (comment) {
  return {
    type: VOTED_COMMENT,
    comment
  }
}

export function deletedPost (post) {
  return {
    type: DELETED_POST,
    post
  }
}

export function deletedSinglePost (post) {
  return {
    type: DELETED_SINGLE_POST,
    post
  }
}

export function deletedComment (comment) {
  return {
    type: DELETED_COMMENT,
    comment
  }
}

export function fetchCategories () {
  return function (dispatch) {
    API.getCats().then((data) => {
      dispatch(loadCategories(data.categories))
    })
  }
}

export function fetchPosts () {
  return function (dispatch) {
    API.getAll().then((data) => {
      dispatch(loadPosts(data))
    })
  }
}

export function writePost (content) {
  return function (dispatch) {
    API.addPost(content).then((data) => {
      dispatch(addPost(data))
    })
  }
}

export function fetchComments (id) {
  return function (dispatch) {
    API.getComments(id).then((data) => {
      dispatch(loadComments(data))
    })
  }
}

export function writeComment (content) {
  return function (dispatch) {
    API.addPost(content).then((data) => {
      dispatch(addComment(data))
    })
  }
}

export function editComment (content) {
  return function (dispatch) {
    API.editContent(content).then((data) => {
      dispatch(reloadComments(data))
    })
  }
}

export function editPost (content) {
  return function (dispatch) {
    API.editContent(content).then((data) => {
      dispatch(reloadPost(data))
    })
  }
}

export function changeVote (content) {
  return function (dispatch) {
    API.manageVotes(content).then((data) => {
      dispatch(votedPost(data))
    })
  }
}

export function changePostVote (content) {
  return function (dispatch) {
    API.manageVotes(content).then((data) => {
      dispatch(votedSinglePost(data))
    })
  }
}

export function changeCommentVote (content) {
  return function (dispatch) {
    API.manageVotes(content).then((data) => {
      dispatch(votedComment(data))
    })
  }
}

export function removePost (content) {
  return function (dispatch) {
    API.deletePost(content).then((data) => {
      dispatch(deletedPost(data))
    })
  }
}

export function removeSinglePost (content) {
  return function (dispatch) {
    API.deletePost(content)
    API.getAll().then((data) => {
      dispatch(reloadPosts(data))
    })
  }
}

export function removeComment (content) {
  return function (dispatch) {
    API.deletePost(content).then((data) => {
      dispatch(deletedComment(data))
    })
  }
}
