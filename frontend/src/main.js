import Vue from 'vue'
import app from './app.vue'
import {router} from './router'
import {store} from './store/store'
import './assets/styles/main.scss'
import VCalendar from 'v-calendar';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc'  // Use <vc-calendar /> instead of <v-calendar />
});
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')


