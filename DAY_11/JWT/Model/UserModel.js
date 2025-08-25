const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:Number}
},{timestamps:true})

module.exports = mongoose.model('UserTable',UserSchema)