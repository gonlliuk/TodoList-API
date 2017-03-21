const crypto = require('crypto-js')
const router = require('express').Router()

// define db models
const User = require('../models/user')

// define middlewares
const error = require('../middleware/error')
const errorResponser = require('../middleware/errorResponser')
const requestValidator = require('../middleware/requestValidator')

// define constants
const {
	DB_MONGOOSE_ON_FIND,
    DB_MONGOOSE_ON_SAVE,
    REQUEST_NOT_FOUND,
    REQUEST_RECORD_EXIST
} = require('../const/errors')

// @Get check email request
router.get('/check/:email', (req, res) => {

	//validate user email request
	const validation = requestValidator(req.params, ['email'])
	if (validation) return errorResponser(res, validation)

	// find user by email
	User.findOne({ email: req.params.email })
	.select('email name')
	.exec((err, user) => {

		// handle mongoose error
		if (err) return errorResponser(res, error(DB_MONGOOSE_ON_FIND))

		// handle empty user error
		if (!user) return errorResponser(res, error(REQUEST_NOT_FOUND))

		res.json(user)
	})
})

router.post('/in', (req, res) => {

	// validate user email and password request
	const validation = requestValidator(req.body, ['email, password'])
	if (validation) return errorResponser(res, validation)

	User.findOne({ email: req.body.email }, (err, user) => {

		// handle mongoose error
		if (err) return errorResponser(res, error(DB_MONGOOSE_ON_FIND))

		// handle empty user error
		if (!user) return errorResponser(res, error(REQUEST_NOT_FOUND))

		user.auth(req.body.password, req.ip, req.useragent, (err, session) => {
			if (err) return errorResponser(res ,err)

			res.json(session)
		})
	})
})

router.post('/up', (req, res) => {

	//validate user email request
	const validation = requestValidator(req.body, ['email', 'password'])
	if (validation) return errorResponser(res, validation)

	// check for email already available first
    User.find({ email: req.body.email }, (err, users) => {

    	// handle mongoose error
		if (err) return errorResponser(res, error(DB_MONGOOSE_ON_FIND))

		//handle many users error
		if (users.length > 0) return errorResponser(res, error(REQUEST_RECORD_EXIST))

		// create user
		User.create({
	        email: req.body.email,
	        password: req.body.password,
	    }, (err, user) => {

	    	// create new session
			session = {
				ip: req.ip,
				token: crypto.lib.WordArray.random(256 / 8).toString(),
				os: req.useragent.os,
				browser: req.useragent.browser,
				platform: req.useragent.platform
			}

			user.sessions.push(session)

			user.save(err => {
				if (err)
	                return errorResponser(res, error(DB_MONGOOgSE_ON_SAVE))

	            res.json(session)
			})
	    })
    })
})

module.exports = router

