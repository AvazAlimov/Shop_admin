import Api from './Api'

export default {
    getAll () {
        return new Promise(resolve => {
            Api()
                .get('/products')
                .then(response => resolve(response.data))
        })
    },

    get (id) {
        return new Promise(resolve => {
            Api()
                .get('/products/' + id)
                .then(response => resolve(response.data))
        })
    },

    create (product) {
        return new Promise((resolve, reject) => {
            Api()
                .post('/products', product, {
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

    update (id, product) {
        return new Promise((resolve, reject) => {
            Api()
                .post('/products/' + id, product, {
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
                .delete('/products/' + id)
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
