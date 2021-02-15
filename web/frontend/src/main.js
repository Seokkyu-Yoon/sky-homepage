import Vue from 'vue'
import VueCookies from 'vue-cookies'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookies)

Vue.$cookies.config('30d')
Vue.directive('visible', function (el, binding = Boolean) {
  el.style.visibility = binding.value ? 'visible' : 'hidden'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
