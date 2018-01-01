const API_ID = process.env.REACT_APP_API_ID
const url = 'http://localhost:3001'

const headers = {
  'Accept': 'application/json',
  'Authorization': API_ID
}

export const getAll = () =>
  fetch(`${url}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getCats = () =>
  fetch(`${url}/categories`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getForCat = (category) =>
  fetch(`${url}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPost = (postId) =>
  fetch(`${url}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getComments = (postId) =>
  fetch(`${url}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getSingleComment = (commentId) =>
  fetch(`${url}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addPost = (params) =>
fetch(`${url}/posts`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.strigify({ params })
}).then(res => res.json())
  .then(data => data)
