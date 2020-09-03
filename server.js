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
			errorMessage: `Cannot find a food with an id of ${id}`
		})
	}

	response.status(200).json(food)
})

app.post('/food', (request, response) => {
	const requiredProperties = ['type', 'meal']
	requiredProperties.forEach(property => {
		if (!request.body[property]) {
			return response.status(422).json({
				errorMessage: `Cannot POST: no property of ${property} was found in request`
			})
		}
	})

	const { type, meal } = request.body
	const id = Date.now()

	app.locals.food.push({ id, type, meal })
	response.status(201).json({ id, type, meal })
})

app.patch('/food/:id', (request, response) => {
	const requiredProperties = ['type', 'meal']
	requiredProperties.forEach(property => {
		if (!request.body[property]) {
			return response.status(422).json({
				errorMessage: `Cannot POST: no property of ${property} was found in request`
			})
		}
	})

	const { type, meal } = request.body
	const { id } = request.params
	const food = app.locals.food.find(food => food.id === id)
	food.type = type
	food.meal = meal

	response.status(201).json({ type, meal })
})

app.delete('/food/:id', (request, response) => {
	const { id } = request.params
	app.locals.food = app.locals.food.filter(food => food.id !== id)

	response.sendStatus(204)
})

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`)
})