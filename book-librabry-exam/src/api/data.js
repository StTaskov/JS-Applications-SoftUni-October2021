import * as api from './api.js'

export const login = api.login
export const register = api.register
export const logout = api.logout


export async function getAllBooks() {
    const allBooks = await api.get('/data/books?sortBy=_createdOn%20desc')
    return allBooks
}

export async function createBook(book) {
    await api.post('/data/books', book)
}


export async function getBookBiId(id) {
    return await api.get(`/data/books/${id}`)

}

export async function editBook(id, book) {
    return await api.put(`/data/books/${id}`, book)
}

export async function deleteBook(id) {
    await api.del(`/data/books/${id}`)
}

export async function getUserBooks(id) {
    return await api.get(`/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`)
}