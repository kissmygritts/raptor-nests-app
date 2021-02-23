import axios from 'axios'

const baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000'
const setAuth = (token) => ({ Authorization: `Bearer ${token}` })

// auth requests
export const login = () => {}

// nest GET requests
export const getNestById = (id, token) => {
  return axios({
    baseURL,
    url: `/nests/${id}`,
    method: 'GET',
    params: { id },
    headers: { ...setAuth(token) }
  })
}

// nest POST requests
export const submitNest = (nest, token) => {
  return axios({
    baseURL,
    url: '/nests',
    method: 'POST',
    data: nest,
    headers: { ...setAuth(token) }
  })
}
