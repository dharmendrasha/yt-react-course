const crypto = require('crypto')


const md5 = (token) => {
    return crypto.createHash('md5').update(token).digest('hex');
}

module.exports = { md5 }