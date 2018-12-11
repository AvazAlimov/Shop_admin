import Api from './Api'

export default {
    getAll () {
        return new Promise(resolve => {
            Api()
                .get('/languages')
                .then(response => {
                    resolve(response.data)
                })
        })
    },

    create (language) {
        return new Promise((resolve, reject) => {
            Api()
                .post('/languages', language)
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
    },

    remove (code) {
        return new Promise((resolve, reject) => {
            Api()
                .delete('/languages/' + code)
                .then(() => resolve())
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
