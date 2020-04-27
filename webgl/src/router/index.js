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
  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import(/* webpackChunkName: "about" */ '../components/test2.vue')
  },
  {
    path: '/test3',
    name: 'test3',
    component: () => import(/* webpackChunkName: "about" */ '../components/test3.vue')
  },
  {
    path: '/test4',
    name: 'test4',
    component: () => import(/* webpackChunkName: "about" */ '../components/test4.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
