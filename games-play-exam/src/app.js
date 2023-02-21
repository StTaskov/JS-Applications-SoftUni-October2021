import * as api from './api/api.js'
import { page, render } from './lib.js'
import { logout } from './api/data.js'
import { homePage } from './views/home.js'
import { loginPage } from './views/login.js'
import { registerPage } from './views/register.js'
import { catalogPage } from './views/catalog.js'
import { createPage } from './views/create.js'
import { editPage } from './views/edit.js'
import { detailsPage } from './views/details.js'

import { getUserData } from './utils.js'

window.api = api


const root = document.querySelector('#main-content')
//Logout logic
document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext)
page('/', homePage)
page('/login', loginPage)
page('/register', registerPage)
page('/catalog', catalogPage)
page('/create', createPage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage)





//Update nav
updateNav()
page.start()


function decorateContext(ctx, next) {

    ctx.render = (content) => render(content, root)

    next()
}

function onLogout() {
    logout()
    //Update nav
    updateNav()
}



export function updateNav(){
    const userData = getUserData()

    if(userData){
        document.querySelector('#user').style.display = 'block'
        document.querySelector('#guest').style.display = 'none'
    }else{
        document.querySelector('#user').style.display = 'none'
        document.querySelector('#guest').style.display = 'block'
    }
}
