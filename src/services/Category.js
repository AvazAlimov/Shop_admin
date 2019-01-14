import Api from './Api'

export default {
    getAll () {
        return new Promise(resolve => {
            Api()
                .get('/categories')
                .then(response => resolve(response.data))
        })
    },

    get (id) {
        return new Promise(resolve => {
            Api()
                .get('/categories/' + id)
                .then(response => resolve(response.data))
        })
    },

    create (category) {
        return new Promise((resolve, reject) => {
            Api()
                .post('/categories', category, {
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

    update (id, category) {
        return new Promise((resolve, reject) => {
            Api()
                .post('/categories/' + id, category, {
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
                .delete('/categories/' + id)
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
