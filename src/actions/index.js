import * as API from '../utils/api'
import {
  CATEGORIES,
  LOAD_POSTS,
  LOAD_SORTED,
  ADD_POST,
  LOAD_COMMENTS,
  ADD_COMMENT,
  RELOAD_COMMENTS,
  RELOAD_POST,
  RELOAD_POSTS,
  VOTED_POST,
  VOTED_SINGLE_POST,
  VOTED_COMMENT,
  DELETED_POST,
  DELETED_SINGLE_POST,
  DELETED_COMMENT
} from './types'

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
    API.addContent(content).then((data) => {
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
    API.addContent(content).then((data) => {
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
