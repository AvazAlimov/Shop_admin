import Api from './Api'

export default {
    login (user) {
        return new Promise((resolve, reject) => {
            Api()
                .post('/login', user)
                .then(response => {
                    resolve(response.data.token)
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response.data)
                    } else if (error.request) {
                        reject(new Error('No response was received'))
                    } else {
                        reject(new Error('Error in request'))
                    }
                })
        })
    },

    details () {
        return new Promise((resolve, reject) => {
            Api()
                .post('/user')
                .then(response => resolve(response.data))
                .catch(error => {
                    if (error.response) {
                        reject(error.response.data)
                    } else if (error.request) {
                        reject(new Error('No response was received'))
                    } else {
                        reject(new Error('Error in request'))
                    }
                })
        })
    }
}
