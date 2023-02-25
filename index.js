const express = require('express')
const app = express()
const Authentication = require("./routes/authentication")
const PostAndGetRoute = require("./routes/postAndgetRoute")
const bodyParser = require("body-parser")
const cors = require('cors')

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  }
  app.use(cors(corsOptions))



const mongoose = require("mongoose")
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



mongoose.connect("mongodb+srv://suresh:ivQvrCsLoZEDeeLN@cluster0.s4bg01a.mongodb.net/?retryWrites=true&w=majority")
.then(()=>console.log("Db connected"))

app.use(Authentication)
app.use(PostAndGetRoute)
app.use(express.json())

app.listen(8080,()=>console.log("server started at 8080"))

