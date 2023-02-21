import * as api  from './api.js'

export const login = api.login
export const register = api.register
export const logout =  api.logout


export async function getLatestGames(){
    const games = await api.get('/data/games?sortBy=_createdOn%20desc&distinct=category')
    return games
}

export async function getAllGames(){
    const games = await api.get('/data/games?sortBy=_createdOn%20desc')
    return games
}

export async function createGame(game){
    await api.post('/data/games', game)
}

export async function editGame(id, game){
    await api.put(`/data/games/${id}`, game)
}

export async function getGame(id){
    return await api.get(`/data/games/${id}`)
}

export async function deleteGame(id){
    await api.del(`/data/games/${id}`)
}