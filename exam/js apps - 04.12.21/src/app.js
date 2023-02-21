import * as api from './api/data.js'
import { clearUserData, getUserData } from './utils.js'
import { render, page } from './lib.js'
import { homePage } from './views/home.js'
import { loginPage } from './views/login.js'
import { registerPage } from './views/register.js'
import { catalogPage } from './views/catalog.js'
import { createPage } from './views/create.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js'
import { searchPage } from './views/search.js'

window.api = api

const main = document.querySelector('#main-content')
document.querySelector('#logoutBtn').addEventListener('click', onLogout)

page(decorateContext)
page('/', homePage)
page('/login', loginPage)
page('/register', registerPage)
page('/catalog', catalogPage)
page('/create', createPage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage)
page('/search', searchPage)


updateNavigation()
page.start()


function decorateContext(ctx, next) {

    ctx.render = (content) => render(content, main)

    next()
}

async function onLogout() {
    api.logout()
    updateNavigation()
    clearUserData()
}

export function updateNavigation() {
    const userData = getUserData()

    if (userData) {
        //We have user
        document.querySelector('#createAlbum').style.display = 'block'
        document.querySelector('#logoutBtn').style.display = 'block'

        document.querySelector('#login').style.display = 'none'
        document.querySelector('#register').style.display = 'none'


    } else {
        //We dont have one
        document.querySelector('#createAlbum').style.display = 'none'
        document.querySelector('#logoutBtn').style.display = 'none'

        document.querySelector('#login').style.display = 'block'
        document.querySelector('#register').style.display = 'block'
    }
}