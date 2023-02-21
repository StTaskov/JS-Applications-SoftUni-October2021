import {cats} from './catSeeder.js';
import {html, render} from './node_modules/lit-html/lit-html.js'


const template = (object) => {
    return html`
        <li>
            <img src="./images/${object.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button class="showBtn" @click=${rotate}>Show status code</button>
                <div class="status" style="display: none" id="${object.id}">
                    <h4>Status Code: ${object.statusCode}</h4>
                    <p>${object.statusMessage}</p>
                </div>
            </div>
        </li>
        `
}

function rotate(e){
    const button = e.currentTarget
    const div = e.currentTarget.parentNode.querySelector('.status')
    div.style.display = 'block'
    button.textContent = 'Hide status code'
}


function solve() {
    const allCats = document.getElementById('allCats')
    const placeHolder = allCats.appendChild(document.createElement('ul'))
    const result = cats.map(cat => template(cat))
    render(result, placeHolder)
}

solve();
