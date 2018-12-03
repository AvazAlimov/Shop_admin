import VueRouter from 'vue-router'
import Vue from 'vue'
import Dashboard from '../views/Dashboard'

Vue.use(VueRouter)

export default new VueRouter({
  base: '/',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})
