import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Storage from '../views/Storage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/storage',
    name: 'Storage',
    component: Storage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
