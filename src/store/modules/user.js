import { login } from '@/services/auth.js'
import { decodeToken } from '@/utils/decodeToken.js'
import axios from 'axios'

const state = {
  token: getSavedState('token') || ''
}

const getters = {
  currentUser: (state) => {
    if (!state.token) {
      console.log('NO TOKEN')
      return null
    }

    const decoded = decodeToken(state.token)
    return decoded
  },

  loggedIn: (state) => {
    return !!state.token
  },

  isVerified: (state, getters) => {
    return getters.currentUser?.isVerified
  }
}

const actions = {
  async loginUser ({ commit }, user) {
    const response = await login(user)
    const { token } = response.data

    if (response.data) {
      commit('SET_TOKEN', { token })
      // commit('SET_USER_DATE', { token })
    }

    return response
  },

  logout ({ commit }) {
    commit('CLEAR_USER_DATA')
  }
}

const mutations = {
  SET_TOKEN (state, { token }) {
    state.token = token
    saveState('token', token)
    /* eslint-disable-next-line dot-notation */
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },

  CLEAR_USER_DATA () {
    clearSavedState('token')
    location.reload()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

// Private helpers
// See: vue enterprise boilerplate
function saveState (key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

function getSavedState (key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function clearSavedState (key) {
  window.localStorage.removeItem(key)
}
