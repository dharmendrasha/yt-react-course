const mongoose = require('mongoose')

const task = new mongoose.Schema({
    name: String
})

const taskModel = mongoose.model('task', task)

module.exports = {taskModel}