const jwt = require('jsonwebtoken');

const { env } = process

const PRIVATE_KEY = env['JWT_PRIVATE_TOKEN']

const generateToken = (details) => {

    if(typeof details !== 'object'){
        throw Error('arguments must type object')
    }

    const token = jwt.sign(
        details, 
        PRIVATE_KEY,
    )

    return token

}

const verifyToken = (details) => {

    if(typeof details !== 'string'){
        throw Error('arguments must type string')
    }

    const verifiedToken = jwt.verify(details, PRIVATE_KEY)  

    return verifiedToken

}


module.exports = { generateToken, verifyToken }