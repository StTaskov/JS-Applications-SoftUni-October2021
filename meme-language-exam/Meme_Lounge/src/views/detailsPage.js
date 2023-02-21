import { getMemeData } from '../api/data.js'
import { html } from '../lib.js'
import { getUserData } from '../utilities.js'

const detailsTemplate = (meme, userData) => html
    `<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
               ${meme.description}
            </p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${meme._ownerId == userData
            ?   html `<a class="button warning" href="/edit">Edit</a>
                      <button class="button danger">Delete</button>`
            :  null}
            
        </div>
    </div>
</section>`


export async function detailsPage(ctx) {

    const meme = await getMemeData(ctx.params.id)
    const userData = getUserData()
    let userId = ''
    try{
     userId = userData.id
    }catch(e){
     userId = undefined
    }

    ctx.render(detailsTemplate(meme, userId))
}