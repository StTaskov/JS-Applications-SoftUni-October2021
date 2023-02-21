import { html } from '../lib.js'
import { editAlbum, getAlbum } from '../api/data.js'

const editTemplate = (onSubmit, album) => html`
<section class="editPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" .value="${album.name}">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=".${album.imgUrl}">

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" .value="${album.price}">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value="${album.releaseDate}">

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" .value="${album.artist}">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" .value="${album.genre}">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10"
                    cols="10">${album.description}</textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>
`

export async function editPage(ctx){

    const album = await getAlbum(ctx.params.id)

    ctx.render(editTemplate(onSubmit, album))

    async function onSubmit(event){
        event.preventDefault()

        const formData = new FormData(event.target)

        const album = {
            name: formData.get('name'),
            imgUrl: formData.get('imgUrl'),
            price: formData.get('price'),
            releaseDate: formData.get('releaseDate'),
            artist: formData.get('artist'),
            genre: formData.get('genre'),
            description: formData.get('description'),
        }

        for (const prop in album) {
            if (album[prop] == ''){
                return alert('All fields are requered!')
            }
        }

        await editAlbum(ctx.params.id, album)
        ctx.page.redirect('/')

    }
}