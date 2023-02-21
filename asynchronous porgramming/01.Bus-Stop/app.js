async function getInfo() {
    let busId = document.querySelector('#stopId').value
    let stopName = document.querySelector('#result #stopName')
    let ulBuses = document.querySelector('#result #buses')

    let url = `http://localhost:3030/jsonstore/bus/businfo/${busId}`

    try{
        const response = await fetch(url)
        if (response.ok == false){
            throw new Error
        }
        const data = await response.json()
        callBack(data)
        
    }catch(e){
        stopName.textContent = ''
        ulBuses.innerHTML = ''
        stopName.textContent = 'Error'
    }
    function callBack(data){
        stopName.textContent = ''
        ulBuses.innerHTML = ''
        stopName.textContent = data.name
        for (const busId in data.buses) {
            const liElement = document.createElement('li')
            liElement.textContent = `Bus ${busId} arrives in ${data.buses[busId]} minutes`
            ulBuses.appendChild(liElement)
        }
    }

}