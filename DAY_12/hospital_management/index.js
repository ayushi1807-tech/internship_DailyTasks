const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const User = require("./Models/User")
const Role = require("./Models/Role")
const Module = require("./Models/Module")
const route = require('./Routes/routes')

dotenv.config()
const app = express()
app.use(express.json())

app.use('/Hospital',route)

mongoose.connect(process.env.MONGO_URI)
        .then(()=> console.log("Yeyyy!!! Connnection Successfully"))
        .catch((err)=>console.error(err))

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})