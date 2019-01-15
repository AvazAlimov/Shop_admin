import Api from './Api'

export default {
    getAll () {
        return new Promise(resolve => {
            Api()
                .get('/brands')
                .then(response => resolve(response.data))
        })
    },

    get (id) {
        return new Promise(resolve => {
            Api()
                .get('/brands/' + id)
                .then(response => resolve(response.data))
        })
    },

    create (brand) {
        return new Promise((resolve, reject) => {
            Api()
                .post('/brands', brand, {
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

    update (id, brand) {
        return new Promise((resolve, reject) => {
            Api()
                .post('/brands/' + id, brand, {
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
                .delete('/brands/' + id)
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
