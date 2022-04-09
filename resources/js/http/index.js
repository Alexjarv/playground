import axios from "axios";

const $host = axios.create({
    baseURL: process.env.APP_URL
})

const $authHost = axios.create({
    baseURL: process.env.APP_URL
})

const $cryptoHost = axios.create({
    baseURL: 'https://api.nomics.com/v1'
})

const authInterceptor = config => {
    config.headers.authorization = ''
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
    $cryptoHost
}
