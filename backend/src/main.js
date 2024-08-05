const mongoose = require('mongoose')
const express = require("express");
const { taskModel } = require('./schema/Task.schema')
const cors = require('cors');
const AuthRouter = require('./routes/auth');
const { verifyToken } = require('./crypt/jwt.util');

const { env } = process

const jwtVerify =  async (req, res, next) => {
    try{
        const headers = req.headers
    const jwt = headers['token']

    const verify = verifyToken(jwt)

    req.jwt = verify

    next()
    return
    }catch(e){
        console.error(e)
        res.status(401).send("Not AUuthorized")
        return
    }
    
}

const app = express()
app.use(cors())




app.use(express.json())

app.use(express.urlencoded())




app.use('/auth', AuthRouter)


app.use(jwtVerify)

//create
app.post(
    '/create', 
    async (req, res) => {
        const { body } = req
        const data = await taskModel.create({name: body.task})
        res.send({message: 'data saved', data})
    })
    
    //get all
    app.get(
        
        '/',
        
        async (req/* incoming */, res /* outgoing */) => {
        
        
        
        const { query } = req
        
        
        
    const { q } = query

    const toFind = q ? {name: q} : {}
    
    const data = await taskModel.find(toFind)
    
    res.send({message: 'all records found', data})
})

// get/:id
app.get('/:id', async ( req, res) => {
    
    const { params } = req
    
    const { id } = params
    
    const data = await taskModel.findById(id)
    
    if(!data){
        res.status(404).send({message: "task not found"})
        return
    }
    
    // const data = await taskModel.findOne({id})
    res.send({message: "records found", data})
})


//update
app.put("/:id", async (req, res) => {
    const { params } = req
    const { id } = params
    const { body } = req
    
    if(!body.task || typeof body.task !== 'string'){
        res.send({message: "task is not a type of string or not available"}).status(422)
        return
    }

    const data = await taskModel.findById(id)
    
    if(!data){
        res.status(404).send({message: "task not found"})
        return
    }
    
    data.set('name', body.task)
    await data.save()
    res.send({message: "task is updated", data})
})


//delete
app.delete('/:id', async(req, res) => {
    const { params } = req
    const { id } = params
    
    const data = await taskModel.findByIdAndDelete(id)
    
    
    if(!data){
        res.status(404).send({message: "task not found"})
        return
    }
    res.send({message: "data has been deleted successfully"})
})


app.get('*', async(req, res) => {
    res.status(404).send("oops you are redirected to wrong path please check with admin")
})

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    app.listen(3000, "0.0.0.0", () => {
        console.log("application is running ", `http://localhost:3000`)
    })
})

