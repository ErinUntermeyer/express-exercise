const express = require('express')
const app = express()
app.use(express.json())

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Express Exercise - Food Edition'
app.locals.food = [
	{ id: '1', type: 'pizza', meal: ['breakfast', 'lunch', 'dinner'] },
	{ id: '2', type: 'pasta', meal: ['lunch', 'dinner'] },
	{ id: '3', type: 'cereal', meal: ['breakfast'] }
]

app.get('/', (request, response) => {
	response.send('Welcome to my first Express Server - Food Edition')
})

app.get('/food', (request, response) => {
	response.status(200).json(app.locals.food)
})

app.get('/food/:id', (request, response) => {
	const { id } = request.params
	const food = app.locals.food.find(food => food.id === id)
	if (!food) {
		response.status(404).json({
			errorMessage: `Could not find a food with an id of ${id}`
		})
	}

	response.status(200).json(food)
})

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`)
})