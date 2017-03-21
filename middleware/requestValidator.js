
// define middlewares
const error = require('./error')

// define constants
const {
    VALIDATE_PASSWORD_REQUIRED,
    VALIDATE_PASSWORD_SHORT,
    VALIDATE_PASSWORD_INVALID,
    VALIDATE_EMAIL_REQUIRED,
    VALIDATE_EMAIL_INVALID
} = require('../const/errors')

// define email regexp
const regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/

// define password length
const passwordLength = 8

const RequestValidator = (request, properties) => {

    // check properties array in request
    for (let property of properties) {
        switch(property) {

            // validate email property
            case 'email': {
                if (!request[property])
                    return error(VALIDATE_EMAIL_REQUIRED)
                
                if (typeof request[property] !== 'string')
                    return error(VALIDATE_EMAIL_INVALID)

                if (!regexEmail.test(request[property]))
                    return error(VALIDATE_EMAIL_INVALID)

                break
            }

            // validate password property
            case 'password': {
                if (!request[property]) 
                	return error(VALIDATE_PASSWORD_REQUIRED)

                if (typeof request[property] !== 'string')
                    return error(VALIDATE_PASSWORD_INVALID)
                
                if (request[property].length < passwordLength)
                    return error(VALIDATE_PASSWORD_SHORT)
                
                break
            }

            // break if properties is not present
            default: {
                break
            }
        }
    }

    return null
}

module.exports = RequestValidator
