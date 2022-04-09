import { $authHost, $host } from "./index";

export const register = async (name, email, password, password_confirmation, token) => {
    const response = await $host.post('register', {name, email, password, password_confirmation, token})
    return response
}

export const login = async (email, password, remember, token) => {
    const response = await $host.post('login',  {email, password, remember, token})
    return response
}

export const forgot = async (email, token) => {
    const response = await $host.post('email',  {email, token})
    return response
}

export const reset = async (email, password, remember, token) => {
    const response = await $host.post('reset',  {email, password, remember, token})
    return response
}

export const logout = async (token) => {
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
