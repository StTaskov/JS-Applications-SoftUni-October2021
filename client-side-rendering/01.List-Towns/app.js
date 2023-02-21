import {html, render} from './node_modules/lit-html/lit-html.js';

const template = (data) => {
    return html`
    <ul>
        ${data.map(el => html`<li>${el}</li>`)}
    </ul>
    `
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const towns = document.querySelector('#towns').value.split(', ')
    const result = template(towns)
    const placeHolder = document.querySelector('#root')

    render(result, placeHolder)
})


