import * as API from '../utils/api'

export const CATEGORIES = 'CATEGORIES'
export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_POST = 'LOAD_POST'
export const ADD_POST = 'ADD_POST'
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const RELOAD_COMMENTS = 'RELOAD_COMMENTS'
export const RELOAD_POST = 'RELOAD_POST'
export const VOTED_POST = 'VOTED_POST'

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

export function loadPost (post) {
  return {
    type: LOAD_POST,
    post
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

export function votedPost (post) {
  return {
    type: VOTED_POST,
    post
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

export function fetchPost (id) {
  return function (dispatch) {
    API.getPost(id).then((data) => {
      dispatch(loadPost(data))
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
