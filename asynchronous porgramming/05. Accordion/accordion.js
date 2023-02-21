async function solution () {
	const output = document.getElementById('main')
	const titles = await fetch('http://localhost:3030/jsonstore/advanced/articles/list')
	const desTitles = await titles.json()

	desTitles.forEach(o => output.appendChild(view(o)))
}

function view({ _id, title }) {
	const main = createElement('div', 'accordion')
    const titleSpan = createElement('span', '', title)
	const headDiv = createElement('div', 'head')
	const button = createElement('button', 'button', 'More')
	const extraDiv = createElement('div', 'extra')
	extraDiv.style.display = 'none'
	const contentParagraph = createElement('p')
	button.id = _id

	headDiv.append(titleSpan, button)
	extraDiv.appendChild(contentParagraph)
	main.append(headDiv, extraDiv)

	button.addEventListener('click', async () => {
		if (extraDiv.style.display === 'none') {
			const data = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${_id}`)
			const desData = await data.json()
			button.textContent = 'Less'
			extraDiv.style.display = 'block'
			contentParagraph.textContent = desData.content
		} else {
			button.textContent = 'More'
			extraDiv.style.display = 'none'
		}
	})

	return main
}

function createElement (tag, className = '', content = '') {
	const element = document.createElement(tag)
	element.className = className
	element.textContent = content

	return element
}

document.addEventListener('DOMContentLoaded', solution)