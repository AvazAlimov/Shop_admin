import Api from './Api'

export default {
    getAll () {
        return new Promise(resolve => {
            Api()
                .get('/products')
                .then(response => resolve(response.data))
        })
    }
}
