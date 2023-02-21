function attachEvents() {
    // 1 We need to make function with get request and load all person and phones
    const loadButton = document.querySelector('#btnLoad')
    loadButton.addEventListener('click', getRequst);
    
    // 3 We need to make function post with we will create new person and phone 
    const createBtutton = document.querySelector('#btnCreate')
    createBtutton.addEventListener('click', postData);
}

// 1 We need to make function with get request and load all person and phones
async function getRequst(){
    const url = 'http://localhost:3030/jsonstore/phonebook'

    const response = await fetch(url)
    const data = await response.json()

    create(data)

}

function create(data){
    ulElement = document.querySelector('#phonebook')
    
    Object.entries(data).forEach((value) => {
        let currentLiElement = document.createElement('li')
        let currentButton = document.createElement('button')

        // 2 We need to make function delete wich we will atach to button on every person
        currentButton.textContent = 'Delete' 
        currentButton.addEventListener('click', del.bind(null, value[0]))
        currentLiElement.textContent = `${value[1].person}: ${value[1].phone}`

        currentLiElement.appendChild(currentButton)
        ulElement.appendChild(currentLiElement)
    })
}

 // 2 We need to make function delete wich we will atach to button on every person
async function del(key, e){
    e.target.parentNode.remove();

    const url = 'http://localhost:3030/jsonstore/phonebook/' + key 
    
    const options = {
        method: 'delete'
    }

    const response =  await fetch(url, options)

    const data = response.json()
    console.log(data);

}

// 3 We need to make function post with we will create new person and phone 
async function postData(){
    const url = 'http://localhost:3030/jsonstore/phonebook'
    const person = document.querySelector('#person')
    const phone = document.querySelector('#phone')
    const ulElement = document.querySelector('#phonebook')

    if (person.value == '' || phone.value == '') return 

    const options = {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            person: person.value,
            phone: phone.value,
        })
    }

    const response = await fetch(url, options)
    const data = response.json()
    console.log(data);

    ulElement.innerHTML = ''
    getRequst()
    person.value = ''
    phone.value = ''
}


attachEvents();