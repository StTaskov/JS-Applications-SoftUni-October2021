import { getAllAlbums } from '../api/data.js'
import { html } from '../lib.js'

const searchTemplate = (onSubmit, matched) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSubmit} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="search-result">
    <!--If have matches-->
    ${matched.lenght == 0
    ? html `<p class="no-result">No result.</p>`
    : matched.map(match => albumTemplate(match))}
    </div>

</section>`

const albumTemplate = (album) => html`
        <div class="card-box">
            <img src=".${album.imgUrl}">
            <div>
                <div class="text-center">
                    <p class="name">Name: ${album.name}</p>
                    <p class="artist">Artist: ${album.artist}e</p>
                    <p class="genre">Genre: ${album.genre}</p>
                    <p class="price">Price:${album.price}</p>
                    <p class="date">Release Date: ${album.releaseDate}</p>
                </div>
                <div class="btn-group">
                    <a href="/details/${album._id}" id="details">Details</a>
                </div>
            </div>
        </div>
            `

export async function searchPage(ctx){
    const allAbums = await getAllAlbums()
    const matched = []

    ctx.render(searchTemplate(onSubmit, matched))


    function onSubmit(){
        const searchedText = document.querySelector('#search-input')

        if(searchedText.value == ''){
            return alert('Please enter name!')
        }

        allAbums.forEach(album => {
            if(album['name'].includes(searchedText.value)){
            matched.push(album)
            }
        });


    }


}