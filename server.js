const express = require('express')
const app = express()
app.use(express.json())

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Express Exercise - Food Edition'
app.locals.food = [
	{ id: 1, type: 'pizza', meal: ['breakfast', 'lunch', 'dinner'] },
	{ id: 2, type: 'pasta', meal: ['lunch', 'dinner'] },
	{ id: 3, type: 'cereal', meal: ['breakfast'] }
]

app.get('/', (request, response) => {
	response.send('Welcome to my first Express Server')
})