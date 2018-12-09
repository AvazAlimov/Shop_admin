import Api from './Api'

export default {
    getAll () {
        return new Promise(resolve => {
            Api()
                .get('/brands')
                .then(response => resolve(response.data))
        })
    }
}
