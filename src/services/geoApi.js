import axios from 'axios'

const baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000'

export const getNestsGeometry = async ({ token }) => {
  return axios({
    baseURL,
    url: '/geobuf/nests',
    method: 'GET',
    responseType: 'arraybuffer',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
