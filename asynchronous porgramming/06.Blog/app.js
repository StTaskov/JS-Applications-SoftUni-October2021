const cache = { posts: null, comments: null }
const url = 'http://localhost:3030/jsonstore/blog/'


async function displayPosts () {
	await loadData('posts')
	const selectElement = document.getElementById(`posts`)
	selectElement.innerHTML = ''

	Object.values(cache.posts).forEach(x => selectElement.appendChild(Options(x)))
}

async function displayPost () {
	await loadData('comments')
	const html = {
		postTitle: document.getElementById(`post-title`),
		postBody: document.getElementById(`post-body`),
		postComments: document.getElementById(`post-comments`),
		selectElement: document.getElementById(`posts`)
	}
    
	const selected = html.selectElement.options[html.selectElement.selectedIndex]
	const comments = Object.values(cache.comments).filter(x => x.postId === selected.id)

	clearOutput(html.postTitle, html.postBody, html.postComments)

	html.postTitle.textContent = selected.value
	html.postBody.textContent = cache.posts[selected.id].body
	html.postComments.innerHTML = comments.map(x => `<li id=${x.id}>${x.text}</li>`).join('')
}

function Options ({ id, title }) {
	const element = document.createElement('option')
	element.textContent = title
	element.id = id

	return element
}

const clearOutput = (...arr) => arr.forEach(el => el.innerHTML = '')


async function getData (uri) {
	const data = await fetch(`${url}${uri}`)

	return await data.json()
}

async function loadData (type) {
	if (cache[type] === null) {
		const data = await getData(type)
		console.log(data)
		cache[type] = data
	}
}


function attachEvents () {
	document.addEventListener('click', e => {
		if (e.target.tagName === 'BUTTON') {
			const btns = {
				'btnViewPost': displayPost,
				'btnLoadPosts': displayPosts,
			}

			btns[e.target.id]()
		}
	})
}

attachEvents()