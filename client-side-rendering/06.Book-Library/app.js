import { html, render } from './node_modules/lit-html/lit-html.js';

const onSubmit = {
    'add-form': onCreateSubmit,
    'edit-form': onEditSubmit
};

const ctx = {
    list: [],
    async load() {
        ctx.list = await api.getAllBooks();
        update();
    },
    onEdit(id) {
        const book = ctx.list.find(b => b._id == id);
        update(book);
    },
    async onDelete(id) {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await api.deleteBook(id);
        }
    }
};

document.body.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSubmit[event.target.id](formData, event.target);
});

start()
async function start() {
    update();
}

function update(bookToEdit) {
    const result = layoutTemplate(ctx, bookToEdit);
    render(result, document.body);
}

async function onCreateSubmit(formData, form) {
    const book = {
        'title': formData.get('title'),
        'author': formData.get('author')
    }

    await api.createBook(book);
    form.reset();
}

async function onEditSubmit(formData, form) {
    const book = {
        'title': formData.get('title'),
        'author': formData.get('author')
    }
    const id = formData.get('_id');
    api.editBook(id, book);
    form.reset();
    update();
}


const host = 'http://localhost:3030/jsonstore/collections/books'

export async function getAllBooks() {

    const response = await fetch(host);
    const data = await response.json();

    return Object.entries(data).map(([k, v]) => Object.assign(v, { _id: k }));
}

export async function getBookById(id) {

    const response = await fetch(host + '/' + id);
    const data = await response.json();

    return data;
}

export async function createBook(book) {

    const response = await fetch(host, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(book)
    });

}

export async function editBook(id, book) {
    const response = await fetch(host + '/' + id, {
        method: 'put',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(book)
    });

}

export async function deleteBook(id) {
    await fetch(host + '/' + id, {
        method: 'delete',
    });
}


const list = [{ 'author': 'aaaa', 'title': 'bbbb' }]

const rowTemplate = (book) => html`
<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td data-id=${book._id}>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
    </td>
</tr>`;

const tableTemplate = (ctx) => html`
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody @click=${e=> onbtnClick(e, ctx)}>
            ${ctx.list.map(rowTemplate)}
        </tbody>
    </table>`;

const createFormTemplate = () => html`
<form id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>
`;

const editFormTemplate = (book) => html`
<form id="edit-form">
    <input type="hidden" name="_id" .value=${book._id}>
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." .value=${book.title}>
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." .value=${book.author}>
    <input type="submit" value="Save">
</form>`;
//.value е свойство. не е атрибут

const layoutTemplate = (ctx, bookToEdit) => html`
    <button @click=${ctx.load} id="loadBooks">LOAD ALL BOOKS</button>
    ${tableTemplate(ctx)}
    ${bookToEdit ? editFormTemplate(bookToEdit) : createFormTemplate()}`;


function onbtnClick(event, ctx) {
    if (event.target.classList.contains('editBtn')) {
        const id = event.target.parentNode.dataset.id;
        ctx.onEdit(id);
    } else if (event.target.classList.contains('deleteBtn')) {
        const id = event.target.parentNode.dataset.id;
        ctx.onDelete(id)
    }
}

export {
    layoutTemplate
}