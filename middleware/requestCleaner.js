const requestCleaner = (data, params) => {

    // fill prevent props
    params.concat(['createdAt', 'updatedAt', 'uuid'])

    // take all props and delete it in data
    for (let props of params) {
        delete data[props]
    }

    return data
}

module.exports = requestCleaner
