function solve () {

	let infoField = document.getElementById('info');
	let departFiled = document.getElementById('depart');
	let arriveField = document.getElementById('arrive');
	
	let nextBusStop;
	let nextBusStopName = 'depot';


	async function getBusStop(name){
		try {
			const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${name}`)

			return await response.json()
		} catch (error) {
			infoField.innerHTML = 'Error'
			arriveField.disabled = true
			departFiled.disabled = true
		}
	};

	async function depart () {
		departFiled.disabled = true
		arriveField.disabled = false
		nextBusStop = await getBusStop(nextBusStopName)
		infoField.innerHTML = `Next stop ${nextBusStop.name}`
	};

	function arrive () {
		departFiled.disabled = false
		arriveField.disabled = true

		infoField.innerHTML = `Arriving at ${nextBusStop.name}`
		nextStopName = nextBusStop.next
	};

	return {
		depart,
		arrive
	};
};

let result = solve();