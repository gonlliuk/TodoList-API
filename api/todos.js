const router = require('express').Router()

// define models
const User = require('../models/user')

// define middlewares
const error = require('../middleware/error')
const errorResponser = require('../middleware/errorResponser')
const requestCleaner = require('../middleware/requestCleaner')

// define constants
const {
    DB_MONGOOSE_ON_FIND,
    DB_MONGOOSE_ON_SAVE
} = require('../const/errors')

// @Get todos
router.get('/', (req, res) => {

	// find user by id of current user
	User.findOne({ _id: req.user._id }, (err, user) => {
		if (err) return errorResponser(res, error(DB_MONGOOSE_ON_FIND))

		res.json(user.todos)
	})
})

// @Put new todo
router.put('/', (req, res) => {

	// find user by id of current user
	User.findOne({ _id: req.user._id }, (err, user) => {
		if (err) return errorResponser(res, error(DB_MONGOOSE_ON_FIND))

		// add todo to user todos
		user.todos.unshift(req.body)

		// save user
		user.save((err, updatedUser) => {
			if (err) return errorResponser(res, error(DB_MONGOOSE_ON_SAVE))
				console.log(updatedUser)
			//send new user's todo record
			res.json(updatedUser.todos[0])
		})
	})
})

router.patch('/:uuid', (req, res) => {

	// clean request
	const data = requestCleaner(req.body, ['uuid', '_id', '__v'])

	// find user by id of current user
	User.findOne({ _id: req.user.id }, (err ,user) => {
		if (err) return errorResponser(res, error(DB_MONGOOSE_ON_FIND))

		// update todo record
		const index = user.todos.findIndex(task => task.uuid === req.params.uuid)

		if (index === -1) return errorResponser(res, error(DB_MONGOOSE_ON_FIND))

		user.todos[index] = Object.assign(user.todos[index], data)

		// save user
		user.save((err, updatedUser) => {
			if (err) return errorResponser(res, error(DB_MONGOOSE_ON_SAVE))

			res.json(updatedUser.todos[index])
		})
	})
})

router.delete('/:uuid', (req, res) => {

	// find user by id of current user
	User.findOne({ _id: req.user.id }, (err, user) => {
		if (err) return errorResponser(res, error(DB_MONGOOSE_ON_FIND))

		user.todos.splice(user.todos.findIndex(task => task.uuid === req.params.uuid), 1)

		// save user
		user.save((err) => {
			if (err) return errorResponser(res, error(DB_MONGOOSE_ON_SAVE))

			res.sendStatus(200)
		})
	})
})

module.exports = router