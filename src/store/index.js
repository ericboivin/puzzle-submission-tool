import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  state: {
    loggedIn: false,
    completed: false
  },
  mutations: {
    logIn: (state) => {
      state.loggedIn = true
    },
    finished: (state, payload) => {
      state.completed = payload
    }
  }
})
