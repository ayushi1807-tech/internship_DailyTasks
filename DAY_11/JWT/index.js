const express = require("express")
const mongoose = require('mongoose')
const app = express()
const jwt = require('jsonwebtoken')
const User = require('./Model/UserModel')
app.use(express.json())


app.post('/login',
    async (req, res, next) => {
        let { email, password } = req.body;

        let existingUser;
        try {
            existingUser = await User.findOne({ email: email })
        } catch {
            const error = new Error("Error!! Something Went Wrong ")
            return next(error)
        }

        if (!existingUser || existingUser.password != password) {
            const error = new Error("Wrong Details Please Check it Once")
            return next(error)
        }

        let token;
        try {
            token = jwt.sign({
                userId: existingUser.id,
                email: existingUser.email
            },
                "secretkeyappearshere",
                { expiresIn: "1h" });
        } catch (err) {
            const error = new Error("Wrong Details Please Check it Once")
            return next(error)
        }
        res.status(200).json({
            success: true, data: {
                userId: existingUser.id,
                email: existingUser.email,
                token: token
            }
        })
    })

app.post('/SignUp',async(req,res,next)=>{
    const {name,email,password} = req.body;

    const newUser = User({name,email,password})

    try{
        await newUser.save();

    }catch(error){
        console.log("Error!! Something Went wrong ")
        return next(error)
    }

    let token;
    try{
        token = jwt.sign({
            userId:newUser.id,
            email:newUser.email
        },
               "secretkeyappearshere",
                { expiresIn: "1h" }
    )
    }catch (err){
        const error = new Error("Errorr!!!! Something Went Wrongggggggggg")
        return next(error)
    }
    res.status(201).json({success:true,data:{userId:newUser.id,email:newUser.email,token:token}})
})    



mongoose.connect('mongodb://localhost:27017/UserDB')
    .then(() => console.log("Connection Successfull!!!!!"))
    .catch((error) => console.log("Connection Failedd!!!!!"))

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`)
})