import Api from './Api'

export default {
    getAll () {
        return new Promise(resolve => {
            Api()
                .get('/collections')
                .then(response => resolve(response.data))
        })
    },

    get (id) {
        return new Promise(resolve => {
            Api()
                .get('/collections/' + id)
                .then(response => resolve(response.data))
        })
    },

    create (collection) {
        return new Promise((resolve, reject) => {
            Api()
                .post('/collections', collection, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
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

    update (id, collection) {
        return new Promise((resolve, reject) => {
            Api()
                .post('/collections/' + id, collection, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
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

    remove (id) {
        return new Promise((resolve, reject) => {
            Api()
                .delete('/collections/' + id)
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
