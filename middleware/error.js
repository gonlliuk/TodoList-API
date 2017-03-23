const ErrorHandler = (status) => {
    switch(status) {
        
        // http errors
        case 'REQUEST_PASSWORD_REQUIRED': {
            return {
                status: 403,
                message: 'Password required.'
            }
        }

        case 'REQUEST_PASSWORD_WRONG': {
            return {
                status: 403,
                message: 'Wrong password.'
            }
        }

        // request errors
        case 'REQUEST_TOKEN_REQUIRED': {
            return {
                status: 401,
                message: 'Authorization token required.'
            }
        }

        case 'REQUEST_TOKEN_WRONG': {
            return {
                status: 401,
                message: 'Authorization token is wrong.'
            }
        }

        case 'REQUEST_BASE64_WRONG': {
            return {
                status: 400,
                message: 'Wrong base64 format.'
            }
        }

        case 'REQUEST_RECORD_EXIST': {
            return {
                status: 409,
                message: 'Entry already exist.' 
            }
        }

        case 'REQUEST_NOT_FOUND': {
            return {
                status: 404,
                message: 'Not found.' 
            }
        }

        // fs errors
        case 'FS_ACCESS_W': {
            return {
                status: 500,
                message: 'Can not write file'
            }
        }

        case 'FS_ACCESS_R': {
            return {
                status: 500,
                message: 'Can not read file.'
            }
        }

        // database errors
        case 'DB_MONGOOSE_ON_FIND': {
            return {
                status: 500,
                message: 'Can not get database record.'
            }
        }

        case 'DB_MONGOOSE_ON_SAVE': {
            return {
                status: 500,
                message: 'Can not update database record.' 
            }
        }

        case 'DB_MONGOOSE_ON_FIND_AND_UPDATE': {
            return {
                status: 500,
                message: 'Can not find and update database record.' 
            }
        }

        case 'DB_MONGOOSE_ON_CREATE': {
            return {
                status: 500,
                message: 'Can not create database record.' 
            }
        }

        // validation errors
        case 'VALIDATE_PASSWORD_REQUIRED': {
            return {
                status: 400,
                message: 'Pssword is required.' 
            }
        }

        case 'VALIDATE_PASSWORD_SHORT': {
            return {
                status: 400,
                message: 'Password too short.' 
            }
        }

        case 'VALIDATE_PASSWORD_INVALID': {
            return {
                status: 400,
                message: 'Password is invalid.' 
            }
        }

        case 'VALIDATE_EMAIL_REQUIRED': {
            return {
                status: 400,
                message: 'Email is required.' 
            }
        }

        case 'VALIDATE_EMAIL_INVALID': {
            return {
                status: 400,
                message: 'Email is invalid.' 
            }
        }

        case 'VALIDATE_NAME_REQUIRED': {
            return {
                status: 400,
                message: 'Name is required.' 
            }
        }
    }
}

module.exports = ErrorHandler
