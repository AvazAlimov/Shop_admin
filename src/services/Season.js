import Api from './Api'

export default {
    getAll () {
        return new Promise(resolve => {
            Api().get('/seasons').then(response => resolve(response.data))
        })
    }
}
