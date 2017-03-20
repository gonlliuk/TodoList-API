const async = require('async')
const redis = require('redis')
const crypto = require('crypto-js')

const client = redis.createClient()

// Handle Redis connection fail
client.on('error', (err) => {
	console.lof(`Error ${err}`)
})

const methods = {
	get(promise, callback) {
		async.waterfall([
			(callback) => {
				client.get(promise, callback)
			},

			(key, callback) => {
				if (key) return callback(null, key)

				key = crypto.lib.WordArray.random(256 / 8).toString()
				
				client.set(promise, key, (err) => {
					callback(err, key)
				})
			}
		], callback)
	}
}

module.exports = methods
