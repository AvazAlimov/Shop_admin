import Vue from 'vue'
import App from './src/App'
import router from './src/router'
import store from './src/store'
import Vuetify from 'vuetify'
import './src/components'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
