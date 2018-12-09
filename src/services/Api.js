import axios from 'axios'

export const AXIOS = axios.create({
    baseURL: 'http://nasiba.me/api/'
})

export default () => {
    return AXIOS
}
