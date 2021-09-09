import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/user/:id?',
    alias:'/',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  },
  {
    path: '/edit/:id?',
    component: () => import(/* webpackChunkName: "user" */ '../views/EditUser.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
