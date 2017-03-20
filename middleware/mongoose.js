const mongoose = require('mongoose')
const config = require('../config')

// set mongoose promises to global
mongoose.Promise = global.Promise

// define server
const server = config.get('mongoose:server')

// define mongoDB connection
mongoose.connect(server + config.get('mongoose:db'))

// define Double type
require('mongoose-double')(mongoose)

module.exports = mongoose
