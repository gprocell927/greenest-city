const express = require('express')
const md5 = require('md5')
const app = express()
const http = require('http')
const cors = require('express-cors')
const api_key = require('./config.env')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*') //adds header for site we wish to allow to connect
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next() // passes to next layer of middleware
})

app.set('port', process.env.PORT || 3000)
app.locals.title = "The Greenest City in the World"
app.locals.locations = { beloit: 'my hometown'}
app.locals.myKey = api_key.API_KEY

//Get main HTML page
app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

//Give key access to front end
app.get('/key', (request, response) => {
  response.send({ myKey: app.locals.myKey })
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

if (!module.parent){
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
