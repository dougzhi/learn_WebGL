import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test1',
    name: 'test1',
    component: () => import(/* webpackChunkName: "about" */ '../components/test1.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
