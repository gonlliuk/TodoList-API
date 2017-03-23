// define db models
const User = require('../models/user')

// define middlewares
const config = require('../config')
const error = require('../middleware/error')
const errorResponser = require('../middleware/errorResponser')

// define constants
const {
    DB_MONGOOSE_ON_FIND,
    REQUEST_TOKEN_REQUIRED,
    REQUEST_TOKEN_WRONG
} = require('../const/errors')

// define resoler
const Resolver = (req, res, next) => {
	// check if token is present
	const token = req.headers[config.get('session:header')]
	if (!token)
		return errorResponser(res, error(REQUEST_TOKEN_REQUIRED))

	User.findOne({ 'sessions.token': token })
		.select('-hash -__v')
		.exec((err, user) => {
			if (err)
				return errorResponser(res, error(DB_MONGOOSE_ON_FIND))

			if (!user)
				return errorResponser(res, error(REQUEST_TOKEN_WRONG))

			const current = user.sessions.findIndex(session => session.token === token)
			user.sessions[current].current = true
				
			// move session to first
			user.sessions.splice(0, 0, user.sessions.splice(current, 1)[0])
			
			req.user = user
			next()
		})
}

module.exports = Resolver
