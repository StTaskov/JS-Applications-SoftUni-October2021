import * as api from './api.js'

export const login = api.login
export const register = api.register
export const logout = api.logout

export async function getAllAlbums(){
    const albums =  await api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name')
    return albums
}   

export async function createAlbum(album){
    await api.post('/data/albums', album)
}

export async function getAlbum(id){
    return await api.get(`/data/albums/${id}`)
}

export async function editAlbum(id, album){
    await api.put(`/data/albums/${id}`, album)
}

export async function deleteAlbum(id){
    await api.del(`/data/albums/${id}`)
}

