import axios from 'axios'

const baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000'
const setAuth = (token) => ({ Authorization: `Bearer ${token}` })

export const login = () => {}

export const submitNest = (nest, token) => {
  return axios({
    baseURL,
    url: '/nests',
    method: 'POST',
    data: nest,
    headers: {
      ...setAuth(token)
    }
  })
}
