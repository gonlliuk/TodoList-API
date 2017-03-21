const async = require('async')
const crypt = require('crypto-js')
const router = require('express').Router()

// define models
const User = require('../models/user')

// define middlewares
const error = require('../middleware/error')
const errorResponser = require('../middleware/errorResponser')
const requestCleaner = require('../middleware/requestCleaner')
const requestValidator = require('../middleware/requestValidator')

// define constants
const {
    PERMISSION_NOT_ROOT_USER,
    DB_MONGOOSE_ON_FIND_AND_UPDATE,
    DB_MONGOOSE_ON_CREATE,
    DB_MONGOOSE_ON_FIND,
    DB_MONGOOSE_ON_SAVE
} = require('../const/errors')

// [Permitted]: @Get user by uuid
router.get('/:uuid', (req, res) => {

    // find user by uuid and team
    User.findOne({ uuid: req.params.uuid })
        .select('-hash -__v -sessions.token')
        .exec((err, user) => {
            if (err)
                return errorResponser(res, error(DB_MONGOOSE_ON_FIND))

            res.json(user)
        })
})

// [Permitted]: @Patch user by uuid
router.patch('/:uuid', (req, res) => {

    // clean req.body
    const data = requestCleaner(req.body, ['hash', '_id', '__v', 'sessions', 'plan'])

    // find user by uuid, team and update it
    User.findOneAndUpdate({ uuid: req.params.uuid }, data)
	    .exec((err, user) => {
	        if (err)
	            return errorResponser(res, error(DB_MONGOOSE_ON_FIND_AND_UPDATE))

	        res.status(200).json(user)
	    })
})

module.exports = router
