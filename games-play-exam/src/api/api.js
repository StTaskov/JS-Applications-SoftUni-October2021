import { getUserData, setUserData, clearUserData } from "../utils.js"

const hostName = 'http://localhost:3030'

async function request(url, options) {

    try {
        const addres = hostName + url
        const response = await fetch(addres, options)

        if (response.ok == false) {
            const error = response.json()
            throw new Error(error.message)
        }

        if (response.status == '204') {
            return response
        } else {
            return response.json()
        }
    } catch (e) {
        alert(e.message)
        throw e
    }

}

function createOptions(method, data) {
    const options = {
        method,
        headers: {}
    }

    if (data != undefined) {
        options.headers['content-type'] = 'application/json'
        options.body = JSON.stringify(data)
    }

    const userData = getUserData()

    if (userData) {
        options.headers['X-Authorization'] = userData.token
    }

    return options
}


export async function get(url) {
    return request(url, createOptions('get'))
}

export async function post(url, data) {
    return request(url, createOptions('post', data))
}

export async function put(url, data) {
    return request(url, createOptions('put', data))
}

export async function del(url, data) {
    return request(url, createOptions('delete', data))
}

export async function login(email, password) {
    const result = await post('/users/login', { email, password })

    const userData = {
        email: result.email,
        password: result.password,
        id: result._id,
        token: result.accessToken,
    }

    setUserData(userData)
    return result
}

export async function register(email, password){

const result = await post('/users/register', { email, password })

    const userData = {
        email: result.email,
        password: result.password,
        id: result._id,
        token: result.accessToken,
    }

    setUserData(userData)
    return result
}

export async function logout(){
    await get('/users/logout')
    clearUserData()
}