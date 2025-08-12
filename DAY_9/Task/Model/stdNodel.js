const mongoose = require('mongoose')

const stdSchme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
        min: 1
    },
    course:{
        type:String,
        enum:['CSE','CS',"IT","AI/ML","DATA_SCIENCE",'CE'],
        default:"unknown"
    }
},{timestamps:true})

const student = mongoose.model('Std_table',stdSchme)
module.exports = student