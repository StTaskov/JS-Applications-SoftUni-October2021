import { html } from '../lib.js'
import { getAllAlbums } from '../api/data.js'
import { getUserData } from '../utils.js'

const catalogTemplate = (songs, userData) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${songs.length == 0
    ? html`<p>No Albums in Catalog!</p>`
    : songs.map(song => albumTemplate(song, userData))}
</section>
`

const albumTemplate = (song, userData) => html`
<div class="card-box">
    <img src=".${song.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${song.name}</p>
            <p class="artist">Artist: ${song.artist}</p>
            <p class="genre">Genre: ${song.genre}</p>
            <p class="price">Price: ${song.price}</p>
            <p class="date">Release Date: ${song.releaseDate}1</p>
        </div>
        ${userData
        ? html`<div class="btn-group">
            <a href="/details/${song._id}" id="details">Details</a>
            </div>`
        : null}
        
    </div>
</div>
`

export async function catalogPage(ctx) {

    const songs = await getAllAlbums()
    const userData = getUserData()

    ctx.render(catalogTemplate(songs, userData))

}