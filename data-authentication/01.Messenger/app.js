function attachEvents() {
   const sumbitButton = document.querySelector('#submit')
   const refreshButton = document.querySelector('#refresh')
   
   sumbitButton.addEventListener('click', postData)
   refreshButton.addEventListener('click', getData)
     
}

async function postData(){
    const url = `http://localhost:3030/jsonstore/messenger`

    let author = document.querySelector('input[name="author"]')
    let content = document.querySelector('input[name="content"]')

    let data = {
        author: author.value,
        content: content.value,
    }


    const options = {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    }

    try{    
        const response = await fetch(url, options)
        if ( response.ok == false){
            throw new Error
        }
        const info = await response.json()
        console.log(info);
    }catch(e){

    }

    author.value = ''
    content.value = ''
}

async function getData(){
    const textAreaField = document.querySelector('#messages')
    const url = 'http://localhost:3030/jsonstore/messenger'

    const response = await fetch(url)
    let data = await response.json()
     
    textAreaField.innerHTML = Object.values(data).map(x => `${x.author}: ${x.content}`).join('\n')


}

attachEvents();