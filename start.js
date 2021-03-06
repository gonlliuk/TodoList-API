const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const useragent = require('express-useragent')
const path = require('path')
const http = require('http')

// define environment
const debug = process.env.NODE_ENV !== 'production'

// define config provider
const config = require('./config')

// define port
const port = config.get('port')

// define express app
const app = express()

// set application port
app.set('port', port)

// enable logger middleware
app.use(logger('dev'))

// enable body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// enable useragent middleware
app.use(useragent.express())

// enable api middleware
require('./api').call(app)

// define http server
const server = http.createServer(app)
server.listen(port)
