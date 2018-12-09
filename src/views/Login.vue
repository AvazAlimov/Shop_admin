<template lang="pug">
  v-app.primary
    v-content
      v-container(fluid fill-height)
        v-layout(align-center justify-center)
          v-flex(xs12 sm6 md4 lg3)
            v-card.pa-3.white.elevation-10
              v-card-text
                .title Авторизация
                v-form(ref="form" v-model="valid")
                  v-text-field.mt-3(v-model="user.username"
                      label="логин"
                      :rules="validation"
                      @keyup="")
                  v-text-field(v-model="user.password"
                      label="пароль"
                      type="password"
                      :rules="validation"
                      @keyup="")
                  v-btn.mt-3(depressed color="primary" :loading="loading" block @click="login") войти в систему
    v-snackbar(:value="error" bottom)
        span(v-for="key in Object.keys(error)" v-if="error") {{ error[key] }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Login',
    data () {
        return {
            user: {
                username: '',
                password: ''
            },
            loading: false,
            error: false,
            valid: false,
            validation: [
                v => !!v || 'обязательное поле'
            ]
        }
    },
    computed: {
        ...mapGetters({
            token: 'auth/getToken'
        })
    },
    methods: {
        ...mapActions({
            _login: 'auth/login'
        }),
        login () {
            this.loading = true
            this._login(this.user).then(() => {
                this.$router.push('/')
            }).catch(error => {
                this.error = error
            }).finally(() => {
                this.loading = false
            })
        }
    },
    created () {
        if (this.token) {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
</style>
