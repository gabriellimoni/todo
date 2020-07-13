import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    todos: [],
    editing_todo: null,
    mode: 'create',
  },
  mutations,
  actions,
  modules: {
  }
})
