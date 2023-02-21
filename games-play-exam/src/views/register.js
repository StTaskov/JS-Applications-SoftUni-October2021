import { register } from '../api/data.js'
import { html } from '../lib.js'
import { updateNav } from '../app.js'


const registerTemplate = (onSubmit) => html
    `<section @submit=${onSubmit} id="register-page" class="content auth">
    <form id="register">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </div>
    </form>
</section>`




export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit))

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)

        const email = formData.get('email')
        const password = formData.get('password')
        const confirmPass = formData.get('confirm-password')

        if (email == '' || password == '' || confirmPass == '') {
            return alert('Please enter email and password!')
        }

        if (password != confirmPass){
            return alert('Password don\'t match!')
        }

        await register(email, password)
        //Update navigation
        updateNav()
        ctx.page.redirect('/')
    }

}