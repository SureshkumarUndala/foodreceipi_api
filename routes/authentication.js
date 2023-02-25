const express = require("express")
const router = express.Router()
const UserModel = require("../models/userModel")
const PostModel = require('../models/postModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const SecretKey ="sgnj354748#$%^&*eneekem"



router.post("/login", async (req, res) => {
    const user = await UserModel.findOne({
        email: req.body.email
    })

    if(!user){
        return res.json({status:"error", error:"error in login"})

    }
  
    const ispasswordValid = await bcrypt.compare(req.body.password,user.password)
    console.log(ispasswordValid)
    if(ispasswordValid){
        const token = jwt.sign({email:user.email},SecretKey)
        console.log(token)
        return res.json({
            status:"OK",
            token:token
        })

    }else{
        return res.json({status:"error",user:"falseUser"})
    }

})

router.post("/register", async (req, res) => {
    const {username, email, password, confirmPssword} = req.body
    if(!username || !email || !password  || !confirmPssword){
        return res.status(400).json({error:"one or more mandatory fields are empty"})
    }
    //avoid duplicate users
    let Userexists = await UserModel.findOne({email:email})
    if(Userexists){
        return res.status(500).json({error:"User with this email already exits"})
    }
    //hashing the password and store the user data

  
    bcrypt.hash(password, 10, async(err,hashpassword)=>{
        if(err){
            return res.json({
                status:"failed",
                error:err.message
            })
        }
        const user = await UserModel.create({username,email,password:hashpassword})
        console.log(password)
        return res.status(201).json({status:"User Registered Succeefully",user})
     
    })



})



module.exports = router

