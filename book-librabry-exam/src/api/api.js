import {setUserData, getUserData, clearUserData} from '../utils.js'

const hostName = 'http://localhost:3030'

async function request(url, options) {
    try {
        const response = await fetch(hostName + url, options)

        if (response.ok == false) {
            const error =  response.json()
            throw new Error(error.message)
        }

        if(response.status == '204'){
            return response
        }else{
            return response.json()
        }


    } catch (error) {
        alert(error.message)
        throw error
    }

}

function createOption(method, data){
    const obj = {
        method,
        headers:{}
    }

    if (data != undefined){
        obj.headers['content-type'] = 'application/json'
        obj.body = JSON.stringify(data)
    }

    const userData = getUserData()
    if(userData){
        obj.headers['X-Authorization'] = userData.token
    }

    return obj

}

export async function get(url){
    return request(url, createOption('get'))
}

export async function post(url, data){
    return request(url, createOption('post', data))
}

export async function put(url, data){
    return request(url, createOption('put', data))
}

export async function del(url, data){
    return request(url, createOption('delete', data))
}

export async function login(email, password){
    const result = await post('/users/login', { email, password } )

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
    const result =  await post('/users/register', { email, password } )

    const userData = {
        email: result.email,
        password: result.password,
        id: result._id,
        token: result.accessToken,
    }

    setUserData(userData)

    return result
}

export async function logout() {
    get('/users/logout')
    clearUserData()
}