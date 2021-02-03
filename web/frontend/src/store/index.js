import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    signin (state, user = {}) {
      state.user = user
    },
    signout (state) {
      state.user = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
