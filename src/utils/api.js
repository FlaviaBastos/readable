const API_ID = process.env.REACT_APP_API_ID
const url = ''

const headers = {
  'Accept': 'application/json',
  'Authorization': API_ID
}

// export function fetchRecipes (food = '') {
//   food = food.trim()
//
//   return fetch(`https://api.edamam.com/search?q=${food}&app_id=${API_ID}&app_key=${APP_KEY}`)
//     .then((res) => res.json())
//     .then(({ hits }) => hits.map(({ recipe }) => recipe))
// }

// export const get = (bookId) =>
//   fetch(`${api}/books/${bookId}`, { headers })
//     .then(res => res.json())
//     .then(data => data.book)
//
// export const getAll = () =>
//   fetch(`${api}/books`, { headers })
//     .then(res => res.json())
//     .then(data => data.books

export function fetchContent (data = '') {
  fetch(
      url,
    {
      headers: { 'Authorization': API_ID }
    }
  )
    .then()
    .then()
}

// fetch(
//     url,
//     {
//         headers: { 'Authorization': API_ID }
//     }
// )
