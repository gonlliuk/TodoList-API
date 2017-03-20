const moment = require('moment')

// define middlewares
const mongoose = require('../middleware/mongoose')

// define types
const SchemaTypes = mongoose.Schema.Types

// define Session Schema
const sessionSchema = new mongoose.Schema({
	createdAt: Date,
	updatedAt: Date,
	ip: String,
	token: String,
	os: String,
	browser: String,
	platform: String,
	current: false
})

sessionSchema.pre('save', function(next) {
	if (this.isNew) this.createdAt = moment().format()

	this.updatedAt = moment().format()
	next()
})

module.exports = sessionSchema