import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'
import Home from '../views/Home'
import Settings from '../views/Settings'
import Season from '../views/Season'

Vue.use(VueRouter)

export default new VueRouter({
    base: '/',
    routes: [
        {
            path: '/',
            component: Dashboard,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: Settings
                },
                {
                    path: '/season',
                    name: 'season',
                    component: Season
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})
