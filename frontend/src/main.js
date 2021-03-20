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
// import VCalendar from 'v-calendar';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import * as VueGoogleMaps from 'vue2-google-maps'


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDN8MGo4NHQixdVT3RtqobSH2E-KFKmytU',
    libraries: 'places',
  },
})
// Use v-calendar & v-date-picker components
// Vue.use(VCalendar, {
//   componentPrefix: 'vc'  // Use <vc-calendar /> instead of <v-calendar />
// });
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')


