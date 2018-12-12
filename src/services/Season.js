import Api from './Api'

export default {
    getAll () {
        return new Promise(resolve => {
            Api()
                .get('/seasons')
                .then(response => resolve(response.data))
        })
    },

    create (season) {
        return new Promise((resolve, reject) => {
            Api()
                .post('/seasons', season, {
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
                .delete('/seasons/' + id)
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
