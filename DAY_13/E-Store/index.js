import express from "express"
import mongoose from "mongoose"
import router from "./Routes/routes.js"
import cookie from 'cookie-parser'
import  dotenv from "dotenv"
import cookieParser from "cookie-parser"

dotenv.config()
const app= express()
app.use(express.json())
app.use(cookieParser())

app.use('/store',router)

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("Connection Sucessfull"))
    .catch((err)=>console.log(err))

app.listen(3000,()=>{
    console.log(`server is running on http://localhost:3000`)
})