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

// nest POST/PUT requests
export const submitNest = (nest, token) => {
  return axios({
    baseURL,
    url: '/nests',
    method: 'POST',
    data: nest,
    headers: { ...setAuth(token) }
  })
}

export const updateNestDetails = (nest, token) => {
  const { id, ...props } = nest

  return axios({
    baseURL,
    url: `/nests/${id}`,
    method: 'PUT',
    data: props,
    headers: { ...setAuth(token) }
  })
}

// nest visit POST request
export const submitNestVisit = (visit, token) => {
  const nestId = visit.nest_id

  return axios({
    baseURL,
    url: `/nests/${nestId}/visits`,
    method: 'POST',
    data: visit,
    headers: { ...setAuth(token) }
  })
}
