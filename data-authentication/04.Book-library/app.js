const currentForm = document.querySelector('form');
currentForm.addEventListener('submit', formSubmit);
 
const baseBooksUrl = 'http://localhost:3030/jsonstore/collections/books';


async function loadBooks(){
    const options = {method: 'get'};
    const result = await makeRequest(baseBooksUrl, options);
    const allRecords = Object.values(result);
    bookListElement.replaceChildren()
    allRecords.forEach(record => bookListElement.appendChild(createTableRow(record)));
}
 
loadBooks()
 
const bookListElement = document.querySelector('table tbody');
bookListElement.addEventListener('click', recordChange);
 
const loadButton = document.querySelector('#loadBooks');
loadButton.addEventListener('click', loadBooks);
 
 
function formSubmit(event){
    event.preventDefault();
    const inputFields = new FormData(event.currentTarget);
    if (isAllFieldsFilled(inputFields) == false){
        alert("Please fill all Inputs")
        event.currentTarget.reset()
        return
    }
    const title = inputFields.get('title');
    const author = inputFields.get('author');
    options = {
        method : 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            author,
            title
        })
    };
    event.currentTarget.reset()
    makeRequest(baseBooksUrl, options)
    
}

async function editBook(button){
    const recordId = button.parentElement.dataset.id;
    const url = `${baseBooksUrl}/${recordId}`;
    const getOptions = {method: 'get'}
    const currentRecord = await makeRequest(url , getOptions)
    const { title, author , _id} = currentRecord
    const editForm  = createEditForm(title, author)
    currentForm.replaceWith(editForm)
    editForm.addEventListener('submit',async (event) => {
        event.preventDefault();
        const inputFields = new FormData(event.currentTarget);
        if (isAllFieldsFilled(inputFields) == false){
            alert("Please fill all Inputs")
            event.currentTarget.reset()
            return
        }
        const newTitle = inputFields.get('title');
        const newAuthor = inputFields.get('author');
        currentRecord.author = newAuthor
        currentRecord.title = newTitle
        options = {
            method : 'put',
            body: JSON.stringify(currentRecord)
        };
        await makeRequest(url, options)
        editForm.replaceWith(currentForm)
        loadBooks()
    });
}   
async function recordChange(event){
    if (event.target.className == "edit"){
        editBook(event.target)
    }else if (event.target.className == "delete"){
        deleteBook(event.target)
    }
}

async function deleteBook(button){
    const recId = button.parentElement.dataset.id;
    const url = `${baseBooksUrl}/${recId}`;
    const options = {method: "delete"}
    await makeRequest(url, options)
    loadBooks()
}

async function makeRequest(url, options){
    try{
        const request = await fetch(url, options);
        if (request.ok == false){
            throw new Error('Bad request');
        }
        const data = await request.json();
        return data
    }catch(error){
        alert(error.message)
    }
}
function createTableRow(data){
    let {author, title, _id} = data;
    const newRow = document.createElement('tr');
 
    const titleTd = document.createElement('td');
    titleTd.textContent = title;
    const authorTd = document.createElement('td');
    authorTd.textContent = author;
 
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = "edit"
 
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = "delete"
 
    newRow.appendChild(authorTd);
    newRow.appendChild(titleTd);
    newRow.appendChild(editButton);
    newRow.appendChild(deleteButton);
    newRow.setAttribute('data-id', _id)
    return newRow;
}
function createEditForm(title, author){
    const newForm = document.createElement('form');
 
    const heading = document.createElement('h3');
    heading.textContent = "Edit FORM";
 
    const titleLabel = document.createElement('label');
    titleLabel.textContent = "TITLE"
 
    const titleInputField = document.createElement('input');
    titleInputField.setAttribute('type', 'text');
    titleInputField.setAttribute('name', 'title')
    titleInputField.value = title
 
    const authorLabel = document.createElement('label');
    authorLabel.textContent = "AUTHOR";
 
    const authorInputField = document.createElement('input');
    authorInputField.setAttribute('type', 'text');
    authorInputField.setAttribute('name', 'author');
    authorInputField.value = author
 
    const saveButton = document.createElement('button');
    saveButton.textContent = "Save";
 
    newForm.appendChild(heading)
    newForm.appendChild(titleLabel)
    newForm.appendChild(titleInputField)
    newForm.appendChild(authorLabel)
    newForm.appendChild(authorInputField)
    newForm.appendChild(saveButton)
 
 
    return newForm
}
function isAllFieldsFilled(inputs){
    if ([...inputs.entries()].some(record => record[1] == '')){
        return false
    }
    return true
}