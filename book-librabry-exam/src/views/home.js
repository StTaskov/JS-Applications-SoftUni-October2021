import { getAllBooks } from '../api/data.js'
import { html } from '../lib.js'


const homeTeplate = (data) => html`<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
<!-- Display ul: with list-items for All books (If any) -->
${data.length == 0 
  ? html `<p class="no-books">No books in database!</p>` 
  : html `<ul>${data.map(d => bookCard(d))}</ul>` }

</section>`

const bookCard = (d) => html`<li class="otherBooks">
<h3>${d.title}</h3>
<p>Type: ${d.type}</p>
<p class="img"><img src="${d.imageUrl}"></p>
<a class="button" href="/details/${d._id}">Details</a>
</li>`

export async function homePage(ctx){
    const data = await getAllBooks()
    ctx.render(homeTeplate(data))
}