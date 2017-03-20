const ErrorResponser = (res, error) => {
    return res.status(error.status).send(error.message)
}

module.exports = ErrorResponser
