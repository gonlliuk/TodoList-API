const crypto = require('crypto-js')
const moment = require('moment')
const uuid = require('shortid')

// define suggested schemas
const sessionSchema = require('../schemas/session')

// define middlewares
const config = require('../config');
const error = require('../middleware/error')
const mongoose = require('../middleware/mongoose')

// define contsants
const {
    REQUEST_PASSWORD_REQUIRED,
    REQUEST_PASSWORD_WRONG,
    DB_MONGOOSE_ON_SAVE
} = require('../const/errors')

// define types
const SchemaTypes = mongoose.Schema.Types

// define User Schema
const userSchema = new mongoose.Schema({
	createdAt: Date,
	updatedAt: Date,
	name: String,
	birthday: Date,
	email: {
		type: String,
		required: true,
		unique: true
	},
	hash: {
		type: String,
		required: true
	},
	sessions: [sessionSchema]
})

userSchema.virtual('password').set(function(value) {
	this.hash = crypto.SHA512(value).toString()
})

userSchema.virtual('_isSigned').get(function(value) {
	return !!this.hash
})

userSchema.pre('save', function(next) {
	if (this.isNew) {
		this.createdAt = moment().format()
		this.uuid = uuid.generate().toUpperCase()
	}

	this.updatedAt = moment().format()
	next()
})

userSchema.methods.auth = function(password, ip, useragent, callback) {

	// if password not present, return forbidden
	if (!password) return callback(error(REQUEST_PASSWORD_REQUIRED))

	// get last active session
	let session this.sessions.filter(session => {
		return session.ip === ip && session.source === useragent.source
	}).pop()

	// if session exist, remove it for ovveride
	if (!!session) this.sessions.id(session.id).remove()

	// check password hash
	if (crypto.SHA512(password).toString() !== this.hash)
		return callback(error(REQUEST_PASSWORD_WRONG))

	// create new session
	session = {
		ip: ip,
		token: crypto.lib.WordArray.random(256 / 8).toString(),
		os: useragent.os,
		browser: useragent.browser,
		platform: useragent.platform
	}

	this.sessions.unshift(session)

	this.save(err => {
		if (err) return callback(error(DB_MONGOOSE_ON_SAVE))

		callback(null, session)
	})
}

module.exports = mongoose.model('user', userSchema)
