import axios from 'axios'
import { toGeojson } from '@/utils/parse-geobuf.js'

const baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000'

const state = {
  nestGeojson: null,
  lastRequested: null
}

const getters = {
  findNest: (state) => (id) => {
    return state.nestGeojson.features?.find(nest => nest.properties.id === id)
  }
}

const actions = {
  async getNestsGeometry ({ commit, rootState }) {
    commit('SET_LAST_REQUESTED')
    const token = rootState.user.token
    const response = await axios({
      baseURL,
      url: '/geobuf/nests',
      method: 'GET',
      responseType: 'arraybuffer',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const geojson = toGeojson(response.data)
    commit('SET_NEST_GEOJSON', { geojson })
  }
}

const mutations = {
  SET_NEST_GEOJSON (state, { geojson }) {
    state.nestGeojson = geojson
  },

  SET_LAST_REQUESTED (state) {
    state.lastRequested = new Date().toLocaleString()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
