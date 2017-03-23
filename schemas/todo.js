const moment = require('moment')
const uuid = require('shortid')

// define middlewares
const mongoose = require('../middleware/mongoose')

// define types
const SchemaTypes = mongoose.SchemaTypes

// define Todo schema
const todoSchema = new mongoose.Schema({
	createdAt: Date,
	updatedAt: Date,
	title: String,
	uuid: {
		type: String,
		unique: true
	},
	time: {
		type: Date,
		default: moment().format()
	},
	done: {
		type: Boolean,
		default: false
	}
})

todoSchema.pre('save', function(next) {
	if (this.isNew) {
		this.createdAt = moment().format()
		this.uuid = uuid.generate().toUpperCase()
	}

	this.updatedAt = moment().format()
	next()
})

module.exports = todoSchema
