import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'
import Home from '../views/Home'
import Settings from '../views/Settings'
import Season from '../views/Season'
import Category from '../views/Category'
import Brand from '../views/Brand'
import Brands from '../views/Brands'
import Collection from '../views/Collection'
import Collections from '../views/Collections'
import Product from '../views/Product'
import Products from '../views/Products'

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
                },
                /* Brands */
                {
                    path: '/brands',
                    name: 'brands',
                    component: Brands
                },
                {
                    path: '/brand',
                    name: 'brand_create',
                    component: Brand
                },
                {
                    path: '/brand/:id',
                    name: 'brand_update',
                    component: Brand
                },
                /* Brands */
                {
                    path: '/collections',
                    name: 'collections',
                    component: Collections
                },
                {
                    path: '/collection',
                    name: 'collection_create',
                    component: Collection
                },
                {
                    path: '/collection/:id',
                    name: 'collection_update',
                    component: Collection
                },
                /* Producs */
                {
                    path: '/products',
                    name: 'products',
                    component: Products
                },
                {
                    path: '/product',
                    name: 'product_create',
                    component: Product
                },
                {
                    path: '/product/:id',
                    name: 'product_update',
                    component: Product
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
