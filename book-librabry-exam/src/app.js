import { logout } from './api/api.js'
import * as api from './api/data.js'
import { page, render } from './lib.js'
import { getUserData } from './utils.js'
import { createPage } from './views/create.js'
import { detailsPage } from './views/details.js'
import { homePage } from './views/home.js'
import { loginPage } from './views/login.js'
import { registerPage } from './views/register.js'
import { editPage} from './views/edit.js'
import { myBooksPage } from './views/myBooks.js'

window.api = api

const root = document.getElementById('site-content')
const logoutBtn = document.getElementById('logoutBtn')
logoutBtn.addEventListener('click', onLogout)

page(decorateContext)
page('/', homePage)
page('/login', loginPage)
page('/register', registerPage)
page('/create', createPage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage)
page('/myBooks', myBooksPage)


updateNav()
page.start()

function decorateContext(ctx, next) {

    ctx.render = (content) => render(content, root)

    next()
}

function onLogout() {
    logout()
    updateNav()
    page.redirect('/')
}

export function updateNav() {
    const userData = getUserData()
    if (userData) {
        document.querySelector('#user').style.display = 'block'
        document.querySelector('#guest').style.display = 'none'
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`

    } else {
        document.querySelector('#guest').style.display = 'block'
        document.querySelector('#user').style.display = 'none'

    }
}