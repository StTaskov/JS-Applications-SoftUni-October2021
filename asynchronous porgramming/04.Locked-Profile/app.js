async function lockedProfile() {

    // 1 Take data
    const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles')
    const data = await response.json()
    const main = document.querySelector('main')
	main.innerHTML = ''

     // 2 Strat loop the data and create new porfile cards 
	Object.values(data).forEach((x, i) => main.appendChild(profileView(x, i+1)))
  
}

function profileView ({ username, email, age }, id) {
	const main = document.createElement('div')
	const button = document.createElement('button')
	button.innerText = 'Show more'

	main.className = 'profile'
	main.innerHTML = `<img src="./iconProfile2.png" class="userIcon">
<label>Lock</label>
<input type="radio" name="user${id}Locked" value="lock" checked="">
<label>Unlock</label>
<input type="radio" name="user${id}Locked" value="unlock"><br>
<hr>
<label>Username</label>
<input type="text" name="user${id}Username" value=${username} disabled="" readonly="">
<div id="user${id}HiddenFields">
<hr>
<label>Email:</label>
<input type="email" name="user${id}Email" value=${email} disabled="" readonly="">
<label>Age:</label>
<input type="email" name="user${id}Age" value=${age} disabled="" readonly="">
</div>`

button.addEventListener('click', () => {
		const isChecked = main.querySelector('input[type=radio]:checked')
		if (isChecked && isChecked.value === 'unlock') {
			if (button.innerText === 'Show more') {
				main.querySelector(`#user${id}HiddenFields`).style.display = 'block'
				button.innerText = 'Hide it'
			} else {
				main.querySelector(`#user${id}HiddenFields`).style.display = 'none'
				button.innerText = 'Show more'
			}
		}
	})
	main.appendChild(button)

	return main
}