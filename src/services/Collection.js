import Api from './Api'

export default {
    getAll () {
        return new Promise(resolve => {
            Api()
                .get('/collections')
                .then(response => resolve(response.data))
        })
    }
}
