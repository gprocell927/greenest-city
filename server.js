const express = require('express')
const md5 = require('md5')
const app = express()
const api_key = require('./config.env') // refer to as api_key.API_KEY
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)
app.locals.title = "The Greenest City in the World"
app.locals.locations = { beloit: 'my hometown'}

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

app.get('/api/locations/:id', (request, response) => {
  const { id } = request.params
  const message = app.locals.locations[id]

  if (!message) { return response.sendStatus(404) }

  response.json({ id, message })
})

app.post('/api/locations', (request, response) => {
  const { message } = request.body
  const id = md5(message)

  if (!message) {
    return response.status(422).send({
      error: 'No message property provided'
    })
  }

  app.locals.locations[id] = message

  response.status(201).json({ id, message })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
