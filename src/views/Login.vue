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
                  v-text-field.mt-3(v-model="user.email"
                      label="логин"
                      :rules="validation"
                      @keyup="")
                  v-text-field(v-model="user.password"
                      label="пароль"
                      type="password"
                      :rules="validation"
                      @keyup="")
                  v-btn.mt-3(depressed color="primary" :loading="loading" block @click="") войти в систему
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        login: '',
        password: ''
      },
      loading: false,
      error: null,
      valid: false,
      validation: [
        v => !!v || 'обязательное поле'
      ]
    }
  }
}
</script>

<style scoped>
</style>
