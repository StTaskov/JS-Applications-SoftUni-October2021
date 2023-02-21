async function requestData(uri) {
	const data = await fetch(`http://localhost:3030/jsonstore/forecaster/${uri}`)
	if (! data.ok) throw new Error()	
	const deserialized = data.json()
	if (! deserialized) throw new Error()

	return deserialized
}

function getCode(arrayOfObjects, name){
	const location = arrayOfObjects.find(x => x.name === name)

	if (location === undefined) {
		throw new Error()
	}
	
	return location.code
}

const symbols = {
	Sunny: '&#x2600;',
	'Partly sunny': '&#x26C5;',
	Overcast: '&#x2601;',
	Rain: '&#x2614;',
	Degrees: '&#176;',
}

function curretDayTemplate ({ condition, high, low }) {
	const wrapper = document.createElement('span')
	wrapper.className = 'upcoming'

	wrapper.innerHTML = `<span class="symbol">${
		symbols[condition]}</span><span class="forecast-data">${
		high}&#176;/${low}&#176;</span><span class="forecast-data">${condition}</span>`

	return wrapper
}

function tomorrowTemplate ({ forecast, name }) {
	const wrapper = document.createElement('div')
	wrapper.className = 'forecasts'

	wrapper.innerHTML = `<span class="condition symbol">${
		symbols[forecast.condition]}</span><span class="condition"><span class="forecast-data">${
		name}</span><span class="forecast-data">${
		forecast.high}&#176;/${forecast.low}&#176;</span><span class="forecast-data">${
		forecast.condition}</span></span>`

	return wrapper
}


async function displayWeather (location) {

	let oneDay = document.getElementById('current');
	let threeDay = document.getElementById('upcoming');
	let forecastElement = document.getElementById('forecast');


	forecastElement.style.display = 'block';
	oneDay.innerHTML = `<div class="label">Current conditions</div>`
	threeDay.innerHTML = `<div class="label">Three-day forecast</div>` 


	try {
		const initialInfo = await requestData('locations')
		const code = getCode(initialInfo, location)
		const oneDayInfo = await requestData(`today/${code}`)
		const threeDayInfo = await requestData(`upcoming/${code}`)

		oneDay.appendChild(tomorrowTemplate(oneDayInfo))

		Object.values(threeDayInfo.forecast)
			.forEach(x => threeDay.appendChild(curretDayTemplate(x)))

	} catch (e) {
		oneDay.appendChild(document.createTextNode('Error'))
	}
}

function attachEvents () {
	const inputField = document.getElementById('location');
	const submitBtn = document.getElementById('submit');
	
    submitBtn.addEventListener('click', () => displayWeather(inputField.value))
}

attachEvents()