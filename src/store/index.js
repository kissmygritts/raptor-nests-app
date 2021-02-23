import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import nests from './modules/nests.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    nests
  },
  strict: process.env.NODE_ENV === 'development'
})
