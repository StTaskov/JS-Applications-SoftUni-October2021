import { page, render } from './lib.js'
import { homePage } from './views/homePage.js'
import { memeCatalogPage } from './views/memeCatalog.js'
import { loginPage } from './views/loginPage.js'
import { registerPage } from './views/registerPage.js'
import { logout } from './api/api.js'
import { createPage } from './views/createPage.js'
import { detailsPage } from './views/detailsPage.js'
import { getUserData } from './utilities.js'




import * as api from './api/data.js'
import { editPage } from './views/editPage.js'
window.api = api

const root = document.querySelector('main')
document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext)
page('/', homePage)
page('/memes', memeCatalogPage)
page('/login', loginPage)
page('/register', registerPage)
page('/create', createPage)
page('/details/:id', detailsPage)
page('edit/:id', editPage)


updateNav()
page.start()

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateNav = updateNav()

    next()
}

function onLogout() {
    logout()
    updateNav()
}

export function updateNav() {
    const userData = getUserData()
    if (userData) {
        document.querySelector('.user').style.display = 'block'
        document.querySelector('.guest').style.display = 'none'
        document.querySelector('.user span').textContent = `Welcome, ${userData.email}`

    } else {
        document.querySelector('.guest').style.display = 'block'
        document.querySelector('.user').style.display = 'none'

    }
}