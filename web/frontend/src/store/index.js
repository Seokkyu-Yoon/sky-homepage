import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    signIn (state, user = {}) {
      state.user = user
    },
    signOut (state) {
      state.user = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
