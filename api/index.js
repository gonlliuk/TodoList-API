// define unresolved routes
const notFound = require('./404.js')

// define auth resolver
const resolver = require('./resolver')

// define api routers
const sign = require('./sign')
const users = require('./users')
const todos = require('./todos')

module.exports = function() {

	// define open api
	this.use('/sign', sign)

	// define auth resolver routes
	this.use('*', resolver)

	// define self based routes
	this.use('/users', users)
	this.use('/todos', todos)

	// define unresolved routes
	this.use('*', notFound)
}