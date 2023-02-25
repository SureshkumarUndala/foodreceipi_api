const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
         type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    ingredients:{
        type:Array,
        required:true
    },
    receipedirections:{
        type:Array,
        required:true

    }
})


const Posts = mongoose.model("Post", postSchema)
module.exports = Posts