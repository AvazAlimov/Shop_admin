import VueRouter from 'vue-router'
import Vue from 'vue'
import Dashboard from '../views/Dashboard'
import Login from '../views/Login'

Vue.use(VueRouter)

export default new VueRouter({
  base: '/',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
