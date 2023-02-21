import { getUserData, setUserData, clearUserData } from '../utilities.js'


const hostName = 'http://localhost:3030'

async function request(url, option) {

    try {
        const response = await fetch(hostName + url, option)

        if (response.ok == false) {
            const error = response.json();
            throw new Error(error.message);
        }

        try{
            const data = await response.json()
            return data
        }catch(e){
            return response
        }

    } catch (e) {
        alert(e.message)
        throw e;
    }

}

function createOptions(method, data) {
    const obj = {
        method,
        headers: {}
    }

    if (data != undefined) {
        obj.headers['content-type'] = 'application/json'
        obj.body = JSON.stringify(data)
    }

    const userData = getUserData()
    if (userData) {
        obj.headers['X-Authorization'] = userData.token;
    }

    return obj
}

export async function get(url) {

    return request(url, createOptions('get'))
}

export async function post(url, data) {

    const options = createOptions('post', data)
    return request(url, options)
}

export async function put(url, data) {

    const options = createOptions('put', data)
    return request(url, options)
}

export async function del(url) {
    const options = createOptions('delete')
    request(url, options)
}

export async function login(email, password) {
    const result = await post('/users/login', { email, password })

    const userData = {
        id: result._id,
        token: result.accessToken,
        email: result.email,
        username: result.username,
        gender: result.gender
    }

    setUserData(userData)

    return result
}

export async function register(username, email, password, gender) {
    const result = await post('/users/register', { username, email, password, gender })

    const userData = {
        id: result._id,
        token: result.accessToken,
        email: result.email,
        username: result.username,
        gender: result.gender
    }

    setUserData(userData)


}


export async function logout() {
    get('/users/logout')
    clearUserData()
}
