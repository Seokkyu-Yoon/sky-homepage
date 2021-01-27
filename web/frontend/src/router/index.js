import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Board from '@/views/Board.vue'
import Photo from '@/views/Photo.vue'
import Video from '@/views/Video.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/board',
    name: 'Board',
    component: Board
  },
  {
    path: '/photo',
    name: 'Photo',
    component: Photo
  },
  {
    path: '/Video',
    name: 'Video',
    component: Video
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
