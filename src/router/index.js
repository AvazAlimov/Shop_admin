import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'
import Home from '../views/Home'
import Settings from '../views/Settings'
import Season from '../views/Season'
import Category from '../views/Category'

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
                /* Season */
                {
                    path: '/season',
                    name: 'season_create',
                    component: Season
                },
                {
                    path: '/season/:id',
                    name: 'season_update',
                    component: Season
                },
                /* Category */
                {
                    path: '/category',
                    name: 'category_create',
                    component: Category
                },
                {
                    path: '/category/:id',
                    name: 'category_update',
                    component: Category
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
