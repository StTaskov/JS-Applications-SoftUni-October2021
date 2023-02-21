import { getAlbum, deleteAlbum } from '../api/data.js'
import { html } from '../lib.js'
import { getUserData } from '../utils.js'

const detailsTemplate = (isOwner, album, userData, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=".${album.imgUrl}}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price:${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>

            <!-- Only for registered user and creator of the album-->
            ${userData && isOwner
            ? html`<div class="actionBtn">
                        <a href="/edit/${album._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="/catalog" class="remove">Delete</a>
                    </div>`
            : null}
            
        </div>
    </div>
</section>`

export async function detailsPage(ctx){

    const userData = getUserData()
    const album = await getAlbum(ctx.params.id)
    let isOwner;

    if(userData){
        isOwner = userData.id == album._ownerId
    }else{
        isOwner = false
    }

    ctx.render(detailsTemplate(isOwner, album, userData, onDelete))

    async function onDelete(){
        const choice = confirm('Are you sure u want to delete current book!')
        if (choice){
            await deleteAlbum(ctx.params.id)
        }
    }
}