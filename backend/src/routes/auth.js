const express = require('express')
const { z, ZodError } = require('zod')
const { userModel } = require('../schema/User.schema')
const { md5 } = require('../utils')
const { generateToken } = require('../crypt/jwt.util')
const router = express.Router()

const zRegistration = z.object({
    email: z.string().email(),
    password: z.string()
})

router.post('/registration', async (req, res) => {
    let resp

    try{
        const { body } = req
        const data = await zRegistration.parseAsync(body)

        const findOne = await userModel.findOne({email: data.email})

        if(findOne){
            res.send('user exists with this email')
            return
        }


        const hasPassword = md5(data.password)

        await userModel.create({email: data.email, password: hasPassword})


        resp = "user has been created successfully"

    }catch(e){

        if(e instanceof ZodError){
            resp = e.errors
        }
    } finally {
        if(!resp){
            res.send("something went wrong")
            return
        }

        res.send(resp)
        return
    }

})


router.post('/login', async (req, res) => {
    let resp

    try{
        const { body } = req
        const data = await zRegistration.parseAsync(body)

        const findOne = await userModel.findOne({email: data.email})

        if(!findOne){
            res.status(401).send('user does not exist with this email')
            return
        }


        const hasPassword = md5(data.password)

        const comparePass = findOne.password === hasPassword

        if(!comparePass){
            res.status(401).send('user does not exist with this email')
            return
        }


        const token = generateToken({id: findOne._id, email: findOne.email })

        resp = {
            token 
        }

    }catch(e){

        if(e instanceof ZodError){
            resp = e.errors
        }
    } finally {
        if(!resp){
            res.send("something went wrong")
            return
        }

        res.send(resp)
        return
    }
})


module.exports = router