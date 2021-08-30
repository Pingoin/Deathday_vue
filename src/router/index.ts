import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  },
  {
    path: '/:id',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
