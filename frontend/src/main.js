import Vue from 'vue'
import app from './app.vue'
import {router} from './router'
import {store} from './store/store'
import './assets/styles/main.scss'
// import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components
// Vue.use(VCalendar, {
//   componentPrefix: 'vc'  // Use <vc-calendar /> instead of <v-calendar />
// });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')


