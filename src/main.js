import Vue from 'vue'
import './plugins/axios'
import './plugins/iview.js'
import App from './App.vue'
import router from './plugins/router.js'
import store from './plugins/store.js'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
