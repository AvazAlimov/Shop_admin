import Auth from '../../services/Auth'
import { AXIOS } from '../../services/Api'

const state = {
    token: localStorage.getItem('token')
}

const getters = {
    getToken (state) {
        return state.token
    }
}

const actions = {
    login ({ commit }, user) {
        return new Promise((resolve, reject) => {
            Auth.login(user)
                .then(token => {
                    commit('success', token)
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

const mutations = {
    success (state, token) {
        state.token = token
        AXIOS.defaults.headers.common['Authorization'] = 'Bearer ' + token
        localStorage.setItem('token', token)
    },
    logout (state) {
        AXIOS.defaults.headers.common['Authorization'] = 'Bearer '
        localStorage.removeItem('token')
        state.token = null
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
