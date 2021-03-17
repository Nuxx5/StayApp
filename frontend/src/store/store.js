import Vue from 'vue'
import Vuex from 'vuex'

import { userStore } from './user.store.js'
// import { orderStore } from './order.store.js'
// import { stayStore } from './stay.store.js'
// import { tripStore } from './trip.store.js'
// import { socketStore } from './socket.store.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  modules: {
    userStore,
    // orderStore,
    // stayStore,
    // tripStore,
    // socketStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
