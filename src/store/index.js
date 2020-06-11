import Vue from 'vue'
import Vuex from 'vuex'
import { localGet } from '@/utils/mylocal'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: localGet('heimatt') || {}
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    }
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
