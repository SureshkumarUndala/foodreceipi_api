const express = require("express")
const router = express.Router()
const UserModel = require("../models/userModel")
const PostModel = require('../models/postModel')
const middleware = require("../routes/middleware")



router.post("/createpost", middleware, async (req, res) => {



    try {
        console.log("req.user", req.user)
        let { title, author, image, ingredients, receipedirections } = req.body

        const Posts = await PostModel.create({
            ...req.body,
            userref: req.user.id
        })
        res.status(201).json({
            status: "post created successfully",
            posts: Posts
        })
    } catch (error) {
        console.log(error.message)
        res.send(error)
        console.log(error.message)
    }



})

router.get("/allposts", middleware, async (req, res) => {
    try {
        console.log(req.user)
        let exist = await UserModel.findById(req.user.id) //from middleware
        if (!exist) {
            return res.status(400).send('user not found')
        }
        let userref = req.user.id
        let allposts = await PostModel.find({userref:userref})
        res.json({
            status:"success",
            username:exist.email,
            allposts})
    } catch (err) {
        console.log(err);
        return res.status(500).send('server Error')
    }
})

module.exports = router