import { $authHost, $host } from "./index";

export const register = async (email, password) => {
    const response = await $host.post('register')
    return response
}

export const login = async (email, password, token) => {
    const {response} = await $host.post('login',  {email, password, token})
    return response
}

export const logout = async () => {
    const response = await $host.post('logout')
    return response
}

export const check = async () => {
    const response = await $host.get('api/auth')
    return response
}

export const getUser = async () => {
    const response = await $host.get('api/auth/user')
    return response
}
