// define constants
const {
    REQUEST_NOT_FOUND
} = require('../const/errors')

// define middlewares
const error = require('../middleware/error')
const errorResponser = require('../middleware/errorResponser')

module.exports = (req, res) => {
    return errorResponser(res, error(REQUEST_NOT_FOUND))
}
