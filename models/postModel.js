const mongoose = require("mongoose")
const Schema  = mongoose.Schema

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
        type:String,
        required:true
    },
    receipedirections:{
        type:String,
        required:true

    },
    userref: [{type: Schema.Types.ObjectId, ref: 'User'}]

})


const Posts = mongoose.model("Post", postSchema)
module.exports = Posts