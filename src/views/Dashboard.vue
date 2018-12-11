<template lang="pug">
v-app
    v-navigation-drawer(
        v-model="menu" app fixed
        :clipped="$vuetify.breakpoint.lgAndUp"
    )
        v-list
            v-list-tile(to="/")
                v-list-tile-action
                    v-icon home
                v-list-tile-title Главная
            v-list-tile(to="/brands")
                v-list-tile-action
                    v-icon star
                v-list-tile-title Бренды
            v-list-tile(to="/collections")
                v-list-tile-action
                    v-icon collections
                v-list-tile-title Коллекции
            v-list-tile(to="/products")
                v-list-tile-action
                    v-icon redeem
                v-list-tile-title Товары
            v-list-tile(to="/settings")
                v-list-tile-action
                    v-icon settings
                v-list-tile-title Настройки сайта
            v-divider
            v-list-tile(@click="logout")
                v-list-tile-action
                    v-icon forward
                v-list-tile-title Выйти

    v-toolbar(color="primary" app dark fixed :clipped-left="$vuetify.breakpoint.lgAndUp")
                v-toolbar-side-icon(@click.stop="menu=!menu")
                v-toolbar-title Панель администратора

    v-content
            v-container(grid-list-md fluid)
                router-view
</template>

<script>
import { AXIOS } from '../services/Api'
import Auth from '../services/Auth'
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'Dashboard',
    data () {
        return {
            menu: false
        }
    },
    computed: {
        ...mapGetters({
            token: 'auth/getToken'
        })
    },
    methods: {
        ...mapMutations({
            _logout: 'auth/logout'
        }),
        logout () {
            this._logout()
            this.$router.push('/login')
        }
    },
    created () {
        if (!this.token) {
            this.$router.push('/login')
        } else {
            AXIOS.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
            AXIOS.interceptors.response.use(undefined, error => {
                if (error.response && error.response.status === 401) {
                    this.logout()
                }
            })
            Auth.details()
        }
    }
}
</script>

<style scoped>
</style>
