import axios from 'axios'
import Vue from 'vue'

const ajaxOptions = {
    baseURL: 'http://localhost:3000',
    // headers
    timeout: 60000,
    withCredentials: true
}
const formClient = axios.create({
    ...ajaxOptions,
    headers: {
        'Content-type': 'application/x-www-form-urlencoded'
    },
})
const jsonClient = axios.create({
    ...ajaxOptions,
    headers: {
        'Content-type': 'application/json'
    },
})

export const request = {
    install(Vue,option) {
        Vue.prototype.formRequest = formClient;
        Vue.prototype.jsonRequest = jsonClient;
    }
}

Vue.use(request)