import axios from 'axios'

export const AXIOS = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

export default () => {
    return AXIOS
}
