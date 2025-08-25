const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    name: {type:String , required:true},
    modules:[{type:mongoose.Schema.Types.ObjectId,ref:"Module"}]
})

module.exports = mongoose.model("Role",RoleSchema)