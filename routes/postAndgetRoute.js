const express = require("express")
const router = express.Router()
const UserModel = require("../models/userModel")
const PostModel = require('../models/postModel')



router.post("/createpost",async(req,res)=>{
    const  {title,author,image,ingredients,receipedirections} = req.body
    try{
        const Posts = await PostModel.create(req.body)
        res.status(201).json({
            status:"post created successfully",
            posts: Posts
        })
    }
    catch(err){
        res.status(500).json({
            status:"Failed",
            error: err.message
        })

    }
   

})

router.get("/allposts", async(req,res)=>{
    const allposts = await PostModel.find()
    res.status(200).json({
        status:"success",
        allposts

    })
})

module.exports = router