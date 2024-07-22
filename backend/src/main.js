const mongoose = require('mongoose')
const express = require("express");
const { taskModel } = require('./schema/Task.schema')


const app = express()
app.use(express.json())
app.use(express.urlencoded())


//create
app.post('/create', async (req, res) => {
    const { body } = req
    const data = await taskModel.create({name: body.task})
    res.send({message: 'data saved', data})
})



//update

//get 

//delete

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    app.listen(3000, "0.0.0.0", () => {
        console.log("application is running ", `http://localhost:3000`)
    })
})

