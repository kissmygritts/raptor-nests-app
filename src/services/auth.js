import axios from 'axios'
const baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000'

export const login = (user) => {
  return axios({
    url: '/login',
    baseURL,
    data: user,
    method: 'POST'
  })
}
