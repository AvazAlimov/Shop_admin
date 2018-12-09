<template lang="pug">
  v-app
</template>

<script>
import { AXIOS } from '../services/Api'
import Auth from '../services/Auth'
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters({
            token: 'auth/getToken'
        })
    },
    methods: {
        ...mapMutations({
            _logout: 'auth/logout'
        })
    },
    created () {
        if (!this.token) {
            this.$router.push('/login')
        } else {
            AXIOS.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
            AXIOS.interceptors.response.use(undefined, error => {
                if (error.response.status) {
                    this._logout()
                }
            })
            Auth.details()
        }
    }
}
</script>

<style scoped>
</style>
