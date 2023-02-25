const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const PostModel = require('../models/postModel')
const { body, validationResult, Result } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = "sgnj354748#$%^&*eneekem"


router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;

        const userExist = await User.findOne({ email: email })
        if (!userExist) {
            return res.status(400).json({
                status: 'Failed',
                message: 'User Already Exists'
            })
        }
        const comparing = await bcrypt.compare(password, userExist.password)
        console.log(comparing);
        if (!comparing) {
            return res.status(400).send("Invalid password credentials")
        }
        let payload = {
            user: {
                id: userExist.id
            }

        }
        jwt.sign(payload, secret, { expiresIn: 60 * 60 }, (err, token) => {
            if (err) throw err
            return res.json({
                status: "Success",
                message: "User signed In successfully",
                token
            })
        })

    } catch (error) {
        return res.status(500).json({
            status: "Error catched",
            error: error.message
        })
    }
})




router.post('/register',
    body('email').isEmail()
    , async (req, res) => {
        try {
            console.log(req.body);
            const errors = validationResult(req)
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array()
                })
            }
            const { email, password } = req.body
            let user_exist = await User.findOne({ email: email })
            if (user_exist) {
                return res.status(400).json({
                    status: 'registration Failed',
                    message: 'Email is Already Existed',


                })
            }
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    })
                }
                if (hash) {
                    let newUser = await User.create({
                        email,
                        password: hash
                    })
                }
                return res.status(201).json({
                    status: "Success",
                    message: "User registered successfully"
                })
            })
        } catch (error) {
            return res.status(500).json({
                error: e.message
            })
        }
    }
)










module.exports = router


module.exports = router

