import { getUserBooks } from '../api/data.js'
import { html } from '../lib.js'
import { getUserData } from '../utils.js'


const myBooksTemplate = (data) => html`
<section id="my-books-page" class="my-books">
<h1>My Books</h1>
    ${data.length != 0
    ? html`<ul class="my-books-list">${data.map(d => bookCard(d))}</ul>`
    : html`<p class="no-books">No books in database!</p>`}
      `



const bookCard = (d) => html`<li class="otherBooks">
<h3>${d.title}</h3>
<p>Type: ${d.type}</p>
<p class="img"><img src="${d.imageUrl}"></p>
<a class="button" href="/details/${d._id}">Details</a>
</li>`

export async function myBooksPage(ctx) {
  const userData = getUserData()
  const data = await getUserBooks(userData.id)
  ctx.render(myBooksTemplate(data))
}